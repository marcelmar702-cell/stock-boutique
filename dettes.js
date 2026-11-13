(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };
var sv = $x("shopView");
if (typeof db === "undefined" || !sv) { return; }

var st = document.createElement("style");
st.textContent = [
"#dpro .grp h4{cursor:pointer}",
".dtag{display:inline-block;margin-left:6px;padding:1px 7px;border-radius:8px;background:rgba(214,32,32,.16);color:var(--error);font-size:12px;font-weight:700}",
".dline{padding:10px 0;border-top:1px solid var(--border);margin-top:8px;font-size:14px}",
".dline .pr{display:flex;gap:8px;align-items:center;margin-top:8px}",
".dline .pr input{flex:1;min-width:0}",
".dline .pr button{margin:0;white-space:nowrap}",
".dpay{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:13px;color:var(--muted);margin-top:4px}"
].join("\n");
document.head.appendChild(st);

Object.assign(T.fr, {
dOwed:"À recevoir", dClients:"clients qui doivent", dAddTitle:"Ajouter une dette",
dName:"Nom du client", dAmount:"Montant dû (FC)", dDue:"Date promise de paiement (facultatif)", dNote:"Note (facultatif)",
dAdd:"Ajouter la dette", dList:"Clients qui doivent", dNone:"Aucune dette. Tout est payé. 👍",
dLate:"En retard", dRemain:"Reste", dOf:"sur", dDueOn:"Promis pour le",
dPayBox:"Montant reçu (FC)", dPay:"Encaisser", dAll:"Tout", dUndo:"Annuler", dDel:"Supprimer la dette",
dPaidTitle:"Dettes payées", dBad:"Écris un nom et un montant valide.",
dConfDel:"Supprimer cette dette et ses paiements ?", dConfUndo:"Annuler ce paiement ?"
});
Object.assign(T.sw, {
dOwed:"Za kupokea", dClients:"clients wanaodaiwa", dAddTitle:"Ongeza dette",
dName:"Jina ya client", dAmount:"Kiasi anachodaiwa (FC)", dDue:"Date aliyoahidi kulipa (si lazima)", dNote:"Note (si lazima)",
dAdd:"Ongeza dette", dList:"Clients wanaodaiwa", dNone:"Hakuna dette. Zote zimelipwa. 👍",
dLate:"Amechelewa", dRemain:"Imebaki", dOf:"kati ya", dDueOn:"Aliahidi tarehe",
dPayBox:"Kiasi kilichopokelewa (FC)", dPay:"Pokea", dAll:"Yote", dUndo:"Ghairi", dDel:"Futa dette",
dPaidTitle:"Dettes zilizolipwa", dBad:"Andika jina na kiasi sahihi.",
dConfDel:"Kufuta dette hii na paiements zake ?", dConfUndo:"Kughairi paiement hii ?"
});
function D(k) { return (T[L] && T[L][k]) || T.fr[k] || k; }
function norm(s) { return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim(); }
function money(n) { n = Math.round(Number(n) * 100) / 100; return n.toLocaleString("fr-FR", { maximumFractionDigits: 2 }) + " FC"; }
function fmt(d) { return d ? String(d).slice(0, 10).split("-").reverse().join("/") : "-"; }
function dleft(d) {
  var b = new Date(); b.setHours(0, 0, 0, 0);
  return Math.round((new Date(d + "T00:00:00") - b) / 864e5);
}

var DEBTS = [], PAYS = [], opened = {}, showPaid = false, loading = false, err = "";
async function load() {
  var a = await db.from("debts").select("*").eq("shop_id", shopId).order("created_at");
  if (a.error) { err = a.error.message; DEBTS = []; PAYS = []; return; }
  err = ""; DEBTS = a.data || [];
  var b = await db.from("debt_payments").select("*").eq("shop_id", shopId).order("created_at");
  PAYS = b.error ? [] : (b.data || []);
}
function clients() {
  var m = {}, ks = [];
  DEBTS.forEach(function (d) {
    var k = norm(d.customer_name);
    if (!m[k]) { m[k] = { key: k, name: d.customer_name, open: [], bal: 0, late: false }; ks.push(k); }
    var c = m[k];
    if (!d.paid) {
      c.open.push(d); c.bal += Number(d.amount);
      if (d.due_date && dleft(d.due_date) < 0) { c.late = true; }
    }
  });
  return ks.map(function (k) { return m[k]; }).filter(function (c) { return c.open.length; })
    .sort(function (a, b) { return b.bal - a.bal; });
}
function shell() {
  return '<div id="dpro"><div id="dtop"></div><h3>' + D("dAddTitle") + "</h3>" +
    '<label class="lb" for="dpN">' + D("dName") + '</label><input id="dpN" list="dpL" autocomplete="off"><datalist id="dpL"></datalist>' +
    '<label class="lb" for="dpA">' + D("dAmount") + '</label><input id="dpA" type="number" inputmode="decimal">' +
    '<label class="lb" for="dpD">' + D("dDue") + '</label><input id="dpD" type="date">' +
    '<label class="lb" for="dpNote">' + D("dNote") + '</label><input id="dpNote">' +
    '<button class="main" type="button" data-d="add">' + D("dAdd") + '</button><div id="dlist"></div></div>';
}
function debtHtml(d) {
  var init = Number(d.initial_amount || d.amount), late = d.due_date && dleft(d.due_date) < 0;
  var h = '<div class="dline"><div>' + fmt(d.created_at) + " · <b>" + D("dRemain") + " " + money(d.amount) + "</b> " + D("dOf") + " " + money(init) + "</div>";
  if (d.due_date) {
    h += '<div class="' + (late ? "rouge" : "hint") + '" style="margin:2px 0">' + D("dDueOn") + " " + fmt(d.due_date) + (late ? " (" + D("dLate") + ")" : "") + "</div>";
  }
  if (d.note) { h += '<div class="hint" style="margin:2px 0">' + esc(d.note) + "</div>"; }
  PAYS.filter(function (p) { return p.debt_id === d.id; }).forEach(function (p) {
    h += '<div class="dpay"><span>' + fmt(p.created_at) + " · " + money(p.amount) + '</span><button class="small" type="button" data-d="undo" data-id="' + p.id + '">' + D("dUndo") + "</button></div>";
  });
  h += '<div class="pr"><input id="pay_' + d.id + '" type="number" inputmode="decimal" placeholder="' + esc(D("dPayBox")) + '">' +
    '<button class="small" type="button" data-d="all" data-id="' + d.id + '" data-m="' + d.amount + '">' + D("dAll") + "</button>" +
    '<button class="small" type="button" data-d="pay" data-id="' + d.id + '">' + D("dPay") + "</button></div>" +
    '<button class="link" type="button" data-d="del" data-id="' + d.id + '" style="margin-top:8px">' + D("dDel") + "</button></div>";
  return h;
}
function paint() {
  if (!$x("dpro")) { return; }
  if (err) { $x("dlist").innerHTML = '<p class="hint">' + esc(err) + "</p>"; return; }
  var cs = clients(), total = 0;
  cs.forEach(function (c) { total += c.bal; });
  $x("dtop").innerHTML = '<h3>' + D("dOwed") + '</h3><div class="stats"><div class="stat"><strong>' + money(total) + "</strong><span>" + D("dOwed") +
    '</span></div><div class="stat"><strong>' + cs.length + "</strong><span>" + D("dClients") + "</span></div></div>";
  var names = {};
  DEBTS.forEach(function (d) { names[norm(d.customer_name)] = d.customer_name; });
  $x("dpL").innerHTML = Object.keys(names).map(function (k) { return '<option value="' + esc(names[k]) + '">'; }).join("");
  var l = "<h3>" + D("dList") + "</h3>";
  if (!cs.length) { l += '<p class="hint">' + D("dNone") + "</p>"; }
  cs.forEach(function (c) {
    l += '<div class="grp"><h4 data-d="tog" data-k="' + esc(c.key) + '"><span>' + esc(c.name) +
      (c.late ? '<span class="dtag">' + D("dLate") + "</span>" : "") + "</span><span>" + money(c.bal) + "</span></h4>";
    if (opened[c.key]) { c.open.forEach(function (d) { l += debtHtml(d); }); }
    l += "</div>";
  });
  var paid = DEBTS.filter(function (d) { return d.paid; }).reverse();
  if (paid.length) {
    l += '<button class="link" type="button" data-d="togpaid">' + D("dPaidTitle") + " (" + paid.length + ")</button>";
    if (showPaid) {
      paid.slice(0, 30).forEach(function (d) {
        l += '<div class="ligne"><span class="vert">' + esc(d.customer_name) + " : " + money(d.initial_amount || d.amount) +
          '</span><button class="small" type="button" data-d="del" data-id="' + d.id + '">' + D("dDel") + "</button></div>";
      });
    }
  }
  $x("dlist").innerHTML = l;
}

var fixing = false;
async function fixHome() {
  if (fixing || typeof shopId === "undefined" || !shopId) { return; }
  var target = null;
  sv.querySelectorAll(".stat").forEach(function (s) {
    var sp = s.querySelector("span");
    if (sp && sp.textContent === T[L].stDebts && !s.dataset.fx) { target = s; }
  });
  if (!target) { return; }
  fixing = true; target.dataset.fx = "1";
  var r = await db.from("debts").select("amount").eq("shop_id", shopId).eq("paid", false);
  fixing = false;
  if (r.error || !r.data || !target.isConnected) { return; }
  var t = 0;
  r.data.forEach(function (d) { t += Number(d.amount); });
  target.querySelector("strong").textContent = money(t);
}
async function ensure() {
  var onDet = !!document.querySelector('#shopBar button.on[data-v="det"]');
  if (!onDet) { fixHome(); return; }
  if ($x("dpro") || loading || sv.classList.contains("hidden")) { return; }
  loading = true;
  sv.innerHTML = shell();
  await load();
  loading = false;
  paint();
}
new MutationObserver(ensure).observe(sv, { childList: true, subtree: true });
ensure();

document.addEventListener("click", async function (e) {
  var b = e.target.closest("[data-d]");
  if (!b || !$x("dpro")) { return; }
  var a = b.dataset.d, id = b.dataset.id;
  msg("");
  if (a === "tog") { opened[b.dataset.k] = !opened[b.dataset.k]; paint(); }
  else if (a === "togpaid") { showPaid = !showPaid; paint(); }
  else if (a === "all") { var i = $x("pay_" + id); if (i) { i.value = b.dataset.m; } }
  else if (a === "add") {
    var n = $x("dpN").value.trim(), am = parseFloat($x("dpA").value);
    if (!n || !(am > 0)) { return msg(D("dBad")); }
    var k = norm(n), ex = DEBTS.filter(function (d) { return norm(d.customer_name) === k; })[0];
    if (ex) { n = ex.customer_name; }
    var r = await db.from("debts").insert({ shop_id: shopId, customer_name: n, amount: am, due_date: $x("dpD").value || null, note: $x("dpNote").value.trim() || null });
    if (r.error) { return msg(r.error.message); }
    ["dpN", "dpA", "dpD", "dpNote"].forEach(function (x) { $x(x).value = ""; });
    opened[k] = true; await load(); paint();
  }
  else if (a === "pay") {
    var v = parseFloat($x("pay_" + id).value);
    if (!(v > 0)) { return msg(D("dBad")); }
    var r2 = await db.rpc("pay_debt", { p_debt: id, p_amount: v });
    if (r2.error) { return msg(r2.error.message); }
    await load(); paint();
  }
  else if (a === "undo") {
    if (!confirm(D("dConfUndo"))) { return; }
    var r3 = await db.rpc("undo_payment", { p_id: id });
    if (r3.error) { return msg(r3.error.message); }
    await load(); paint();
  }
  else if (a === "del") {
    if (!confirm(D("dConfDel"))) { return; }
    var r4 = await db.from("debts").delete().eq("id", id);
    if (r4.error) { return msg(r4.error.message); }
    await load(); paint();
  }
});
})();
