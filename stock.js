(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };
var sv = $x("shopView");
if (typeof db === "undefined" || !sv) { return; }

var st = document.createElement("style");
st.textContent = [
".rkrow{display:flex;gap:10px;align-items:flex-start}",
".rkrow input[type=checkbox]{width:22px;height:22px;flex:none;margin:2px 0 0;padding:0}",
".rkq{display:flex;align-items:center;gap:8px;margin-top:8px;font-size:14px}",
".rkq input{width:80px;padding:8px}",
".rktot{font-size:18px;font-weight:800;margin:14px 0 4px}",
".rkbtns{display:flex;gap:8px}.rkbtns button{margin:0;flex:1}"
].join("\n");
document.head.appendChild(st);

var SX = {
fr: {
mxRestock:"À racheter", mxAdvice:"Prix pour écouler", cardTitle:"Stock : décisions",
rkTitle:"Liste à racheter",
rkHelp:"Dukyo propose de quoi couvrir 30 jours de ventes, arrondi en boîtes entières. Change les chiffres ou décoche ce que tu ne veux pas.",
rkNone:"Rien à racheter pour le moment. 👍",
out:"Épuisé", soon:"Bientôt fini", noSale:"Aucune vente en 30 jours",
rkInfo:"Reste {a} · vendu {s} en 30 jours", rkDays:"(≈ {d} jours de stock)",
boxes:"Boîtes", eqPcs:"= {p} pièces", est:"Coût estimé : ", total:"Coût total estimé : ",
wa:"Envoyer sur WhatsApp", copy:"Copier la liste", copied:"Copié ✓", nothing:"Coche au moins un produit.",
orderHead:"Bonjour, je voudrais commander :", orderTail:"Merci. Boutique {n}.", boxesOf:"{b} boîte(s) de {p} pièces", pcs:"{p} pièces",
adTitle:"Prix conseillé pour écouler",
adHelp:"Pour les produits qui expirent dans 30 jours ou moins : Dukyo compare ton stock à tes ventes des 30 derniers jours et te dit combien de pièces risquent de rester. Il ne change aucun prix tout seul : pour vendre à ce prix, écris-le dans le champ prix de l’onglet Ventes.",
adNone:"Aucun produit à risque. 👍", risk:"À risque", expiresIn:"Expire dans {d} jour(s)",
normal:"Prix normal", advised:"Prix conseillé", disc:"−{x} %", atCost:"au prix d’achat : tu récupères ton argent",
gain:"Gain par pièce : ", left:"Reste {q} pièces"
},
sw: {
mxRestock:"Za kununua tena", mxAdvice:"Bei ya kuuza haraka", cardTitle:"Stock : maamuzi",
rkTitle:"Orodha ya kununua tena",
rkHelp:"Dukyo inapendekeza kiasi cha kutosha siku 30 za ventes, kwa boîtes nzima. Badilisha nombres au toa kalama kwa usichotaka.",
rkNone:"Hakuna cha kununua tena sasa. 👍",
out:"Imeisha", soon:"Inakaribia kuisha", noSale:"Hakuna vente kwa siku 30",
rkInfo:"Imebaki {a} · imeuzwa {s} kwa siku 30", rkDays:"(≈ siku {d} za stock)",
boxes:"Boîtes", eqPcs:"= pièces {p}", est:"Gharama inayokadiriwa : ", total:"Gharama yote inayokadiriwa : ",
wa:"Tuma kwa WhatsApp", copy:"Copier orodha", copied:"Imecopié ✓", nothing:"Weka kalama kwenye angalau produit moja.",
orderHead:"Habari, ningependa kuagiza :", orderTail:"Asante. Boutique {n}.", boxesOf:"Boîtes {b} za pièces {p}", pcs:"Pièces {p}",
adTitle:"Bei inayoshauriwa kuuza haraka",
adHelp:"Kwa produits zinazoisha ndani ya siku 30 au chini : Dukyo inalinganisha stock yako na ventes za siku 30 zilizopita na inakuambia pièces ngapi zinaweza kubaki. Haibadilishi bei yoyote yenyewe : kuuza kwa bei hii, iandike kwenye sehemu ya bei ya Ventes.",
adNone:"Hakuna produit iliyo hatarini. 👍", risk:"Hatarini", expiresIn:"Inaisha baada ya siku {d}",
normal:"Bei ya kawaida", advised:"Bei inayoshauriwa", disc:"−{x} %", atCost:"kwa bei ya kununua : unarudisha pesa yako",
gain:"Faida kwa pièce : ", left:"Zimebaki pièces {q}"
}
};
function S(k, v) {
  var s = (SX[L] && SX[L][k]) || SX.fr[k] || k;
  if (v) { for (var i in v) { s = s.split("{" + i + "}").join(v[i]); } }
  return s;
}
function norm(s) { return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim(); }
function money(n) { n = Math.round(Number(n) * 100) / 100; return n.toLocaleString("fr-FR", { maximumFractionDigits: 2 }) + " FC"; }
function fmt(d) { return d ? String(d).slice(0, 10).split("-").reverse().join("/") : "-"; }
function dleft(d) {
  if (!d) { return null; }
  var b = new Date(); b.setHours(0, 0, 0, 0);
  return Math.round((new Date(d + "T00:00:00") - b) / 864e5);
}

/* ---------- Calculs ---------- */
function summarize(P, SL) {
  var m = {}, ks = [], sold = {};
  P.forEach(function (l) {
    var k = norm(l.name);
    if (!m[k]) { m[k] = { key: k, name: l.name, avail: 0, last: "", ppb: 1, buy: 0, sell: 0, lots: [] }; ks.push(k); }
    var g = m[k], d = dleft(l.expiry_date);
    g.lots.push(l);
    if (l.quantity > 0 && (d === null || d >= 0)) { g.avail += l.quantity; }
    if (String(l.created_at) > g.last) { g.last = String(l.created_at); g.ppb = l.pieces_per_box || 1; g.buy = Number(l.buy_price); g.sell = Number(l.sell_price); }
  });
  SL.forEach(function (s) { var k = norm(s.product_name); sold[k] = (sold[k] || 0) + Number(s.qty || 1); });
  return ks.map(function (k) { var g = m[k]; g.sold = sold[k] || 0; g.rate = g.sold / 30; return g; });
}
function restock(gs) {
  var out = [];
  gs.forEach(function (g) {
    var low = g.avail === 0 || g.avail <= 5 || (g.rate > 0 && g.avail / g.rate < 7);
    if (!low) { return; }
    var need = Math.max(g.sold - g.avail, 0);
    if (need === 0) { need = g.ppb; }
    var boxes = Math.ceil(need / g.ppb);
    out.push({ g: g, boxes: boxes, days: g.rate > 0 ? Math.floor(g.avail / g.rate) : null, idle: g.sold === 0 && g.avail === 0 });
  });
  out.sort(function (a, b) { return ((a.g.avail === 0 ? 0 : 1) - (b.g.avail === 0 ? 0 : 1)) || (b.g.sold - a.g.sold); });
  return out;
}
function advice(gs) {
  var out = [];
  gs.forEach(function (g) {
    g.lots.forEach(function (l) {
      var d = dleft(l.expiry_date);
      if (!(l.quantity > 0) || d === null || d < 0 || d > 30) { return; }
      var cum = 0;
      g.lots.forEach(function (x) {
        var dx = dleft(x.expiry_date);
        if (x.quantity > 0 && dx !== null && dx >= 0 && dx <= d) { cum += x.quantity; }
      });
      var risk = Math.min(l.quantity, Math.max(0, Math.ceil(cum - g.rate * d)));
      if (risk <= 0) { return; }
      var disc = d > 14 ? 10 : d > 7 ? 20 : d > 3 ? 30 : 40;
      var raw = g.sell * (1 - disc / 100);
      var rounded = g.sell >= 500 ? Math.round(raw / 50) * 50 : Math.round(raw * 100) / 100;
      var buy = Number(l.buy_price), sug = Math.max(rounded, buy);
      out.push({ g: g, l: l, d: d, risk: risk, disc: disc, sug: sug, atCost: sug <= buy, margin: sug - buy });
    });
  });
  out.sort(function (a, b) { return a.d - b.d; });
  return out;
}

/* ---------- Données ---------- */
async function load() {
  var p = await db.from("products").select("*").eq("shop_id", shopId);
  var from = new Date(Date.now() - 30 * 864e5).toISOString(), rows = [];
  for (var i = 0; i < 10; i++) {
    var r = await db.from("sales").select("product_name,qty").eq("shop_id", shopId).gte("created_at", from).range(i * 1000, i * 1000 + 999);
    if (r.error) { break; }
    rows = rows.concat(r.data || []);
    if (!r.data || r.data.length < 1000) { break; }
  }
  return summarize(p.data || [], rows);
}

/* ---------- Page plein écran ---------- */
document.body.insertAdjacentHTML("beforeend",
  '<div id="stk" class="sheet hidden"><div class="sheetin"><div class="sheetbar"><button id="stkBack" class="small" type="button">←</button><b id="stkTitle"></b></div><div id="stkBody"></div></div></div>');
$x("stkBack").addEventListener("click", function () { $x("stk").classList.add("hidden"); });
function openSheet(title, html) {
  $x("stkTitle").textContent = title;
  $x("stkBody").innerHTML = html;
  $x("stk").classList.remove("hidden");
  $x("stk").scrollTop = 0;
}

var RK = [];
async function pageRestock() {
  openSheet(S("rkTitle"), '<p class="hint">…</p>');
  RK = restock(await load());
  if (!RK.length) { $x("stkBody").innerHTML = '<p class="hint">' + S("rkNone") + "</p>"; return; }
  var h = '<p class="hint">' + S("rkHelp") + "</p>";
  RK.forEach(function (x, i) {
    var g = x.g;
    h += '<div class="grp"><label class="rkrow"><input type="checkbox" data-sk="chk" data-i="' + i + '"' + (x.idle ? "" : " checked") + "><span><b>" + esc(g.name) + "</b> " +
      (g.avail === 0 ? '<span class="rouge">' + S("out") + "</span>" : '<span class="orange">' + S("soon") + "</span>") + "<br><small>" +
      (g.sold === 0 ? S("noSale") : S("rkInfo", { a: g.avail, s: g.sold }) + (x.days !== null ? " " + S("rkDays", { d: x.days }) : "")) + "</small></span></label>" +
      '<div class="rkq"><span>' + S("boxes") + '</span><input type="number" inputmode="numeric" min="0" id="rkb' + i + '" value="' + x.boxes + '" data-sk="box" data-i="' + i + '"><small id="rkp' + i + '"></small></div>' +
      '<small class="hint" id="rkc' + i + '"></small></div>';
  });
  h += '<div class="rktot" id="rkt"></div><div class="rkbtns"><button class="main" type="button" data-sk="wa">' + S("wa") + '</button><button class="link" type="button" data-sk="copy">' + S("copy") + "</button></div>" +
    '<div class="nres" id="rkRes"></div>';
  $x("stkBody").innerHTML = h;
  recalc();
}
function rows() {
  var out = [];
  RK.forEach(function (x, i) {
    var on = $x("rkb" + i) && document.querySelector('[data-sk="chk"][data-i="' + i + '"]').checked;
    var b = parseInt($x("rkb" + i).value, 10) || 0;
    out.push({ x: x, i: i, on: on, b: b, p: b * x.g.ppb, cost: b * x.g.ppb * x.g.buy });
  });
  return out;
}
function recalc() {
  var tot = 0;
  rows().forEach(function (r) {
    $x("rkp" + r.i).textContent = S("eqPcs", { p: r.p });
    $x("rkc" + r.i).textContent = S("est") + money(r.cost);
    if (r.on) { tot += Math.round(r.cost * 100); }
  });
  $x("rkt").textContent = S("total") + money(tot / 100);
}
function orderText() {
  var lines = [], shop = $x("titre") ? $x("titre").textContent : "";
  rows().forEach(function (r) {
    if (!r.on || r.b < 1) { return; }
    lines.push("- " + r.x.g.name + " : " + (r.x.g.ppb > 1 ? S("boxesOf", { b: r.b, p: r.x.g.ppb }) : S("pcs", { p: r.p })));
  });
  if (!lines.length) { return ""; }
  return S("orderHead") + "\n" + lines.join("\n") + "\n" + S("orderTail", { n: shop });
}

async function pageAdvice() {
  openSheet(S("adTitle"), '<p class="hint">…</p>');
  var list = advice(await load());
  if (!list.length) { $x("stkBody").innerHTML = '<p class="hint">' + S("adHelp") + '</p><p class="hint"><b>' + S("adNone") + "</b></p>"; return; }
  var h = '<p class="hint">' + S("adHelp") + "</p>";
  list.forEach(function (a) {
    h += '<div class="grp"><h4><span>' + esc(a.g.name) + "</span><span class=\"" + (a.d <= 7 ? "rouge" : "orange") + '">' + S("expiresIn", { d: a.d }) + "</span></h4>" +
      '<div class="hint">' + fmt(a.l.expiry_date) + " · " + S("left", { q: a.l.quantity }) + " · <b>" + S("risk") + " : " + a.risk + "</b></div>" +
      '<div class="frow"><span>' + S("normal") + "</span><span>" + money(a.g.sell) + "</span></div>" +
      '<div class="frow t"><span>' + S("advised") + " (" + S("disc", { x: a.disc }) + ')</span><span class="vert">' + money(a.sug) + "</span></div>" +
      '<div class="hint">' + (a.atCost ? S("atCost") : S("gain") + money(a.margin)) + "</div></div>";
  });
  $x("stkBody").innerHTML = h;
}

/* ---------- Carte sur l'accueil ---------- */
function ensure() {
  if (sv.classList.contains("hidden") || $x("rk")) { return; }
  var stats = sv.querySelector(".stats");
  if (!stats || !sv.querySelector(".sirene, .okmsg:not(#notifBanner)")) { return; }
  stats.insertAdjacentHTML("afterend",
    '<div id="rk" class="grp"><h4><span>' + S("cardTitle") + '</span></h4><button class="link" type="button" data-sk="restock">🛒 ' + S("mxRestock") +
    '</button><button class="link" type="button" data-sk="advice">🏷️ ' + S("mxAdvice") + "</button></div>");
}
new MutationObserver(ensure).observe(sv, { childList: true, subtree: true });
ensure();

/* ---------- Menu profil ---------- */
var pm = $x("pmenu");
if (pm) {
  new MutationObserver(function () {
    if (pm.classList.contains("hidden") || pm.querySelector("[data-xs]") || pm.dataset.mode !== "shop") { return; }
    var out = pm.querySelector("button.out");
    if (out) {
      out.insertAdjacentHTML("beforebegin",
        '<button type="button" data-xs="restock">' + S("mxRestock") + '</button><button type="button" data-xs="advice">' + S("mxAdvice") + "</button>");
    }
  }).observe(pm, { childList: true });
  pm.addEventListener("click", function (e) {
    var b = e.target.closest("[data-xs]");
    if (!b) { return; }
    pm.classList.add("hidden");
    if (b.dataset.xs === "restock") { pageRestock(); } else { pageAdvice(); }
  });
}

/* ---------- Clics ---------- */
document.addEventListener("input", function (e) { if (e.target.dataset && e.target.dataset.sk === "box") { recalc(); } });
document.addEventListener("change", function (e) { if (e.target.dataset && e.target.dataset.sk === "chk") { recalc(); } });
document.addEventListener("click", async function (e) {
  var b = e.target.closest("button[data-sk]");
  if (!b) { return; }
  var a = b.dataset.sk;
  if (a === "restock") { pageRestock(); }
  else if (a === "advice") { pageAdvice(); }
  else if (a === "wa" || a === "copy") {
    var t = orderText(), res = $x("rkRes");
    if (!t) { res.style.color = "var(--error)"; res.textContent = S("nothing"); return; }
    if (a === "wa") { window.open("https://wa.me/?text=" + encodeURIComponent(t), "_blank"); }
    else {
      try { await navigator.clipboard.writeText(t); b.textContent = S("copied"); setTimeout(function () { b.textContent = S("copy"); }, 1500); } catch (x) {}
    }
  }
});
})();
