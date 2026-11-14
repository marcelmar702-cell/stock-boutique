(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };
var sv = $x("shopView");
if (typeof db === "undefined" || !sv) { return; }

var RX = {
fr: { cloTitle:"Fin de journée",
  cloHelp:"Quand tu fermes la boutique, touche « Fini pour aujourd’hui » : tu reçois le rapport sur ton téléphone et le tableau des ventes ici.",
  cloBtn:"Fini pour aujourd’hui", cloYest:"Rapport d’hier", cloWarn:"📊 Tu n’as pas encore reçu le rapport d’hier.",
  rpTitle:"Rapport du {d}", rpSales:"Ventes", rpProfit:"Bénéfice", rpCount:"Nombre de ventes", rpDebts:"Dettes à recevoir",
  thProd:"Produit", thQty:"Qté", thAmt:"Montant", thGain:"Bénéfice", rpTotal:"Total",
  rpNone:"Aucune vente ce jour-là.", rpSent:"📱 Le résumé est envoyé sur ton téléphone." },
sw: { cloTitle:"Mwisho wa siku",
  cloHelp:"Ukifunga boutique, bonyeza « Nimemaliza leo » : unapokea rapport kwenye simu yako na tableau ya ventes hapa.",
  cloBtn:"Nimemaliza leo", cloYest:"Rapport ya jana", cloWarn:"📊 Bado hujapokea rapport ya jana.",
  rpTitle:"Rapport ya {d}", rpSales:"Ventes", rpProfit:"Faida", rpCount:"Idadi ya ventes", rpDebts:"Dettes za kupokea",
  thProd:"Produit", thQty:"Idadi", thAmt:"Kiasi", thGain:"Faida", rpTotal:"Jumla",
  rpNone:"Hakuna vente siku hiyo.", rpSent:"📱 Muhtasari umetumwa kwenye simu yako." }
};
function R(k, v) {
  var s = (RX[L] && RX[L][k]) || RX.fr[k] || k;
  if (v) { for (var i in v) { s = s.replace("{" + i + "}", v[i]); } }
  return s;
}
function lub(d) { return d.toLocaleDateString("en-CA", { timeZone: "Africa/Lubumbashi" }); }
function range(day) {
  var a = new Date(day + "T00:00:00+02:00");
  return [a.toISOString(), new Date(a.getTime() + 864e5).toISOString()];
}
function money(n) { n = Math.round(Number(n) * 100) / 100; return n.toLocaleString("fr-FR", { maximumFractionDigits: 2 }) + " FC"; }
function norm(s) { return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim(); }

document.body.insertAdjacentHTML("beforeend",
  '<div id="rpt" class="sheet hidden"><div class="sheetin"><div class="sheetbar"><button id="rptBack" class="small" type="button">←</button><b id="rptTitle"></b></div><div id="rptBody"></div></div></div>');
$x("rptBack").addEventListener("click", function () { $x("rpt").classList.add("hidden"); });

async function report(day, err, sent) {
  $x("rptTitle").textContent = R("rpTitle", { d: day.split("-").reverse().slice(0, 2).join("/") });
  $x("rptBody").innerHTML = '<p class="hint">…</p>';
  $x("rpt").classList.remove("hidden");
  $x("rpt").scrollTop = 0;
  var rg = range(day);
  var r = await db.from("sales").select("*").eq("shop_id", shopId).gte("created_at", rg[0]).lt("created_at", rg[1]).order("created_at");
  var d = await db.from("debts").select("amount").eq("shop_id", shopId).eq("paid", false);
  var rows = r.data || [], owed = 0, m = {}, ks = [], tot = 0, gain = 0, qty = 0;
  (d.data || []).forEach(function (x) { owed += Number(x.amount); });
  rows.forEach(function (s) {
    var k = norm(s.product_name);
    if (!m[k]) { m[k] = { name: s.product_name, q: 0, a: 0, g: 0 }; ks.push(k); }
    var g = Number(s.amount) - Number(s.cost || 0);
    m[k].q += Number(s.qty || 1); m[k].a += Number(s.amount); m[k].g += g;
    tot += Number(s.amount); gain += g; qty += Number(s.qty || 1);
  });
  ks.sort(function (a, b) { return m[b].g - m[a].g; });
  var h = "";
  if (err) { h += '<p class="rouge" style="font-size:14px">' + esc(err) + "</p>"; }
  else if (sent) { h += '<p class="hint"><b>' + R("rpSent") + "</b></p>"; }
  h += '<div class="stats"><div class="stat"><strong>' + money(tot) + "</strong><span>" + R("rpSales") + '</span></div><div class="stat"><strong>' + money(gain) + "</strong><span>" + R("rpProfit") +
    '</span></div><div class="stat"><strong>' + rows.length + "</strong><span>" + R("rpCount") + '</span></div><div class="stat"><strong>' + money(owed) + "</strong><span>" + R("rpDebts") + "</span></div></div>";
  if (!rows.length) { h += '<p class="hint" style="margin-top:14px">' + R("rpNone") + "</p>"; }
  else {
    h += '<div class="tblw"><table class="tbl"><tr><th>' + R("thProd") + "</th><th>" + R("thQty") + "</th><th>" + R("thAmt") + "</th><th>" + R("thGain") + "</th></tr>";
    ks.forEach(function (k) { h += "<tr><td>" + esc(m[k].name) + "</td><td>" + m[k].q + "</td><td>" + money(m[k].a) + "</td><td>" + money(m[k].g) + "</td></tr>"; });
    h += "<tr><th>" + R("rpTotal") + "</th><th>" + qty + "</th><th>" + money(tot) + "</th><th>" + money(gain) + "</th></tr></table></div>";
  }
  $x("rptBody").innerHTML = h;
}

var busy = false;
async function insertClo() {
  if (busy || $x("clo") || sv.classList.contains("hidden")) { return; }
  if (!sv.querySelector(".stats") || !sv.querySelector(".sirene, .okmsg:not(#notifBanner)")) { return; }
  if (typeof shopId === "undefined" || !shopId) { return; }
  busy = true;
  var y = lub(new Date(Date.now() - 864e5)), rg = range(y), warn = false;
  try {
    var c = await db.from("day_closings").select("day").eq("day", y).limit(1);
    var s = await db.from("sales").select("id", { count: "exact", head: true }).eq("shop_id", shopId).gte("created_at", rg[0]).lt("created_at", rg[1]);
    warn = !(c.data && c.data.length) && (s.count || 0) > 0;
  } catch (e) {}
  busy = false;
  var st = sv.querySelector(".stats");
  if (!st || $x("clo")) { return; }
  st.insertAdjacentHTML("afterend",
    '<div id="clo" class="grp"><h4><span>' + R("cloTitle") + '</span></h4><p class="hint">' + R("cloHelp") + "</p>" +
    (warn ? '<div class="alrt o">' + R("cloWarn") + "</div>" : "") +
    '<button class="main" type="button" data-rp="today">' + R("cloBtn") + "</button>" +
    '<button class="link" type="button" data-rp="yest">' + R("cloYest") + "</button></div>");
}
new MutationObserver(insertClo).observe(sv, { childList: true, subtree: true });
insertClo();

document.addEventListener("click", async function (e) {
  var b = e.target.closest("[data-rp]");
  if (!b) { return; }
  var day = b.dataset.rp === "today" ? lub(new Date()) : lub(new Date(Date.now() - 864e5));
  msg("");
  var r = await db.rpc("close_day", { p_day: day });
  await report(day, r.error ? r.error.message : "", !r.error);
  var w = $x("clo");
  if (w) { w.remove(); }
  insertClo();
});
})();
