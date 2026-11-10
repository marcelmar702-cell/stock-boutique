(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };

var st = document.createElement("style");
st.textContent = [
".tabs,#pProd,#pDet,#pVen{display:none!important}",
"#app>button.link{display:none!important}",
"body.hasbar2{padding-bottom:0!important}",
"body.hasbar2 .card{padding-bottom:104px}",
".hint{font-size:13px;color:var(--muted);margin:6px 0;line-height:1.45}",
".stat:last-child:nth-child(odd){grid-column:span 2}",
".grp{margin-top:12px;padding:12px;background:var(--field);border:1px solid var(--border);border-radius:14px;animation:fadeUp .4s ease both}",
".grp h4{margin:0;display:flex;justify-content:space-between;gap:8px;font-size:16px;word-break:break-word}",
".lot{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 0;border-top:1px solid var(--border);font-size:14px;margin-top:8px}",
".lot small{color:var(--muted)}",
".sirene{display:flex;gap:14px;align-items:center;padding:14px;margin-top:12px;border-radius:14px;background:var(--field);border:2px solid #ff2a2a;animation:bordR 1.2s ease-in-out infinite}",
".lamp{flex:none;width:46px;height:46px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffb3b3,#ff1a1a 55%,#8f0000);animation:lampR 1.2s ease-in-out infinite}",
"@keyframes lampR{0%,100%{box-shadow:0 0 22px 8px rgba(255,26,26,.7);filter:brightness(1.15)}50%{box-shadow:0 0 3px 1px rgba(255,26,26,.12);filter:brightness(.5)}}",
"@keyframes bordR{0%,100%{border-color:#ff2a2a}50%{border-color:rgba(255,42,42,.2)}}",
"button.danger{background:linear-gradient(135deg,#d62020,#ff5a1f)!important;box-shadow:0 6px 18px rgba(214,32,32,.3)!important}",
".okmsg{margin-top:12px;padding:12px;border-radius:12px;background:var(--field);border-left:5px solid var(--ok);font-size:14px}",
".lowmsg{margin-top:10px;padding:10px;border-radius:12px;background:var(--field);border-left:5px solid var(--warn);font-size:14px}",
".tblw{overflow-x:auto;margin-top:10px}",
"table.tbl{width:100%;border-collapse:collapse;font-size:14px;background:var(--field)}",
".tbl th,.tbl td{border:1px solid var(--border);padding:8px;text-align:left;vertical-align:top}",
".tbl th{background:rgba(31,94,255,.14);font-size:13px}",
".tbl tr.exp td{background:rgba(214,32,32,.18);color:var(--error);font-weight:700}",
".tbl label{display:flex;align-items:center;gap:8px}",
".tbl input[type=checkbox]{width:22px;height:22px;padding:0;margin:0;flex:none}",
".evt{display:flex;gap:6px;margin:10px 0}.evt .tab{font-size:13px}",
".leg{display:flex;gap:14px;font-size:12px;color:var(--muted);margin:6px 0}",
".leg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;vertical-align:middle}",
".evsvg{width:100%;height:auto;display:block}",
".evrow{display:flex;justify-content:space-between;gap:8px;padding:8px 0;border-top:1px solid var(--border);font-size:14px}"
].join("\n");
document.head.appendChild(st);

Object.assign(T.fr, {
bHome:"Accueil", bProd:"Produits", bVen:"Ventes", bDet:"Dettes", bStat:"Stats",
mHome:"Accueil", mProd:"Produits", mVen:"Ventes", mDet:"Dettes", mStat:"Statistiques", mAbo:"Abonnement",
stProd:"Produits", stValue:"Valeur du stock", stSales:"Ventes d’aujourd’hui", stProfit:"Bénéfice d’aujourd’hui", stDebts:"Dettes à recevoir",
alertTitle:"🚨 {n} produit(s) prêt(s) à expirer", alertSub:"Dont {k} déjà expiré(s). Agis vite.",
seeProducts:"Voir ces produits", hide:"Masquer",
thProd:"Produit", thQty:"Quantité", thDays:"Jours restants",
boxes:"{b} boîte(s) de {p} pièces", pcs:"pièces", daysN:"{n} jours", todayWord:"Aujourd’hui", expiredSince:"Expiré depuis {n} jour(s)",
dismissHelp:"Coche la case devant un produit quand il est fini ou retiré : il disparaît de l’alerte.",
confDismiss:"Retirer ce produit de l’alerte ? (Seulement s’il est fini ou retiré.)",
allGood:"✅ Aucune alerte. Tout va bien.", lowMsg:"📉 {n} produit(s) presque fini(s) (5 pièces ou moins)",
recTitle:"Ajouter du stock",
recHelp:"Écris ce que tu as acheté. Si le produit existe déjà, écris le même nom : Dukyo l’ajoute au même produit, avec sa nouvelle date d’expiration.",
fName:"Nom du produit", fBoxes:"Nombre de boîtes (ou cartons) achetés",
fPieces:"Nombre de pièces dans une boîte (écris 1 si tu achètes à la pièce)",
fBoxPrice:"Prix d’achat d’une boîte entière (FC)", fSell:"Prix de vente d’une pièce (FC)",
fDate:"Date d’expiration (laisse vide si le produit n’expire pas)", addStock:"Ajouter au stock",
sumTxt:"{p} pièces au total · achat : {c} la pièce · bénéfice : {m} par pièce ({r} % du prix de vente)",
sumLoss:"⚠️ Tu vends moins cher que ton achat.", confLoss:"Le prix de vente est plus bas que le prix d’achat. Ajouter quand même ?",
search:"Chercher un produit", sellAt:"Prix de vente : ", perPiece:"la pièce", costPiece:"Achat : ",
confDelLot:"Supprimer ce lot de stock ?",
sProd:"Produit vendu", sQty:"Quantité vendue (pièces)", sPrice:"Prix de vente d’une pièce (FC). Change-le pour faire une remise.",
sellBtn:"Vendre", sTotal:"Total : ", todayTitle:"Ventes d’aujourd’hui", cancelSale:"Annuler",
confCancel:"Annuler cette vente ? Le stock revient.",
noStock:"Stock insuffisant (les produits expirés ne se vendent pas).", chooseP:"Choisis un produit.", badQty:"Écris une quantité et un prix valides.",
noSellable:"Aucun produit à vendre. Ajoute du stock d’abord.",
fClient:"Nom du client", fAmount:"Montant dû (FC)", addDebt:"Ajouter la dette", debtTotal:"À recevoir : ",
dPaid:"Payé", confDelDebt:"Supprimer cette dette ?", needName:"Écris le nom du produit.", badNum:"Vérifie les nombres.",
evo:"Évolution", eDay:"Jours", eWeek:"Semaines", eMonth:"Mois", eSales:"Ventes", eProfit:"Bénéfice", eMargin:"Marge",
eNowDay:"Aujourd’hui", eNowWeek:"Cette semaine", eNowMonth:"Ce mois-ci", eVs:"Comparé à la période d’avant",
eTop:"Produits qui rapportent le plus (30 jours)", eNone:"Pas encore de ventes. Le graphique apparaît après ta première vente.", eList:"Détail"
});
Object.assign(T.sw, {
bHome:"Accueil", bProd:"Produits", bVen:"Ventes", bDet:"Dettes", bStat:"Stats",
mHome:"Accueil", mProd:"Produits", mVen:"Ventes", mDet:"Dettes", mStat:"Statistiques", mAbo:"Abonnement",
stProd:"Produits", stValue:"Valeur ya stock", stSales:"Ventes ya leo", stProfit:"Faida ya leo", stDebts:"Dettes za kupokea",
alertTitle:"🚨 Produits {n} zinakaribia kuisha", alertSub:"{k} zimeisha tayari. Fanya haraka.",
seeProducts:"Ona produits hizi", hide:"Ficha",
thProd:"Produit", thQty:"Idadi", thDays:"Siku zimebaki",
boxes:"Boîtes {b} za pièces {p}", pcs:"pièces", daysN:"Siku {n}", todayWord:"Leo", expiredSince:"Imeisha tangu siku {n}",
dismissHelp:"Weka kalama mbele ya produit ikiisha au ikiondolewa : inatoka kwenye alerte.",
confDismiss:"Kuondoa produit hii kwenye alerte ? (Kama imeisha au imeondolewa tu.)",
allGood:"✅ Hakuna alerte. Kila kitu kiko sawa.", lowMsg:"📉 Produits {n} karibu kuisha (pièces 5 au chini)",
recTitle:"Ongeza stock",
recHelp:"Andika ulichonunua. Kama produit ipo tayari, andika jina ile ile : Dukyo inaiongeza kwenye produit ile ile, na date mpya ya expiration.",
fName:"Jina ya produit", fBoxes:"Idadi ya boîtes (au cartons) ulizonunua",
fPieces:"Idadi ya pièces kwenye boîte moja (andika 1 kama unanunua pièce moja moja)",
fBoxPrice:"Bei ya kununua boîte moja nzima (FC)", fSell:"Bei ya kuuza pièce moja (FC)",
fDate:"Date ya expiration (acha wazi kama produit haiishi)", addStock:"Ongeza kwenye stock",
sumTxt:"{p} pièces zote · kununua : {c} pièce moja · faida : {m} kwa pièce ({r} % ya bei ya kuuza)",
sumLoss:"⚠️ Unauza bei ndogo kuliko ya kununua.", confLoss:"Bei ya kuuza ni ndogo kuliko ya kununua. Kuongeza hata hivyo ?",
search:"Tafuta produit", sellAt:"Bei ya kuuza : ", perPiece:"pièce moja", costPiece:"Kununua : ",
confDelLot:"Kufuta lot hii ya stock ?",
sProd:"Produit iliyouzwa", sQty:"Idadi iliyouzwa (pièces)", sPrice:"Bei ya kuuza pièce moja (FC). Ibadilishe kwa remise.",
sellBtn:"Uza", sTotal:"Jumla : ", todayTitle:"Ventes ya leo", cancelSale:"Ghairi",
confCancel:"Kughairi vente hii ? Stock inarudi.",
noStock:"Stock haitoshi (produits zilizoisha hazinauzwa).", chooseP:"Chagua produit.", badQty:"Andika idadi na bei sahihi.",
noSellable:"Hakuna produit ya kuuza. Ongeza stock kwanza.",
fClient:"Jina ya client", fAmount:"Kiasi anachodaiwa (FC)", addDebt:"Ongeza dette", debtTotal:"Za kupokea : ",
dPaid:"Amelipa", confDelDebt:"Kufuta dette hii ?", needName:"Andika jina ya produit.", badNum:"Angalia ma nombre.",
evo:"Maendeleo", eDay:"Siku", eWeek:"Semaines", eMonth:"Mois", eSales:"Ventes", eProfit:"Faida", eMargin:"Marge",
eNowDay:"Leo", eNowWeek:"Semaine hii", eNowMonth:"Mois huu", eVs:"Ukilinganisha na période ya kabla",
eTop:"Produits zinazoleta faida zaidi (siku 30)", eNone:"Hakuna ventes bado. Graphique inaonekana baada ya vente ya kwanza.", eList:"Maelezo"
});

function X(k, v) {
  var s = (T[L] && T[L][k]) || T.fr[k] || k;
  if (v) { for (var i in v) { s = s.replace("{" + i + "}", v[i]); } }
  return s;
}
function norm(s) { return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim(); }
function money(n) { n = Math.round(Number(n) * 100) / 100; return n.toLocaleString("fr-FR", { maximumFractionDigits: 2 }) + " FC"; }
function fmt(d) { return d ? d.split("-").reverse().join("/") : "-"; }
function dleft(d) {
  if (!d) { return null; }
  var b = new Date(); b.setHours(0, 0, 0, 0);
  return Math.round((new Date(d + "T00:00:00") - b) / 864e5);
}
function stat(n, k) { return '<div class="stat"><strong>' + n + "</strong><span>" + X(k) + "</span></div>"; }

var anchor = $x("aboBanner") || document.querySelector("#app .entete");
anchor.insertAdjacentHTML("afterend", '<div id="shopView"></div>');
document.body.insertAdjacentHTML("beforeend", '<nav id="shopBar" class="bnav hidden"></nav>');

var P = [], D = [], SL = [], V = "home", showExp = false, mode = localStorage.getItem("evoMode") || "day", srows = [];
var BAR = [
  ["home", "bHome", '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>'],
  ["prod", "bProd", '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>'],
  ["ven", "bVen", '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 4h3l2.5 11h10l2-8H7"/>'],
  ["det", "bDet", '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>'],
  ["stat", "bStat", '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>']
];

async function load() {
  var a = await db.from("products").select("*").eq("shop_id", shopId);
  P = a.data || [];
  var b = await db.from("debts").select("*").eq("shop_id", shopId).order("created_at", { ascending: false });
  D = b.data || [];
  var t0 = new Date(); t0.setHours(0, 0, 0, 0);
  var c = await db.from("sales").select("*").eq("shop_id", shopId).gte("created_at", t0.toISOString()).order("created_at", { ascending: false });
  SL = c.data || [];
}
async function reload() { await load(); render(); }

/* Un produit = un nom. Chaque arrivage avec sa date = un lot du même produit. */
function groups() {
  var m = {}, ks = [];
  P.forEach(function (l) {
    var k = norm(l.name);
    if (!m[k]) { m[k] = { key: k, name: l.name, lots: [], qty: 0, price: 0, last: "" }; ks.push(k); }
    var g = m[k];
    g.lots.push(l); g.qty += l.quantity;
    if (String(l.created_at) > g.last) { g.last = String(l.created_at); g.price = Number(l.sell_price); }
  });
  ks.sort();
  return ks.map(function (k) {
    var g = m[k];
    g.lots.sort(function (a, b) { return (a.expiry_date || "9999") < (b.expiry_date || "9999") ? -1 : 1; });
    return g;
  });
}
/* Vente : le lot qui expire en premier part en premier, un lot expiré ne se vend pas. */
function eligible(g) {
  return g.lots.filter(function (l) { var d = dleft(l.expiry_date); return l.quantity > 0 && (d === null || d >= 0); });
}
function sellable(g) { return eligible(g).reduce(function (a, l) { return a + l.quantity; }, 0); }

function qtyText(l) {
  var q = l.quantity, p = l.pieces_per_box || 1;
  if (p <= 1) { return q + " " + X("pcs"); }
  var b = Math.floor(q / p), r = q % p, s = [];
  if (b > 0) { s.push(X("boxes", { b: b, p: p })); }
  if (r > 0) { s.push(r + " " + X("pcs")); }
  return s.join(" + ") + " <small>(" + q + " " + X("pcs") + ")</small>";
}
function expTag(d) {
  if (d === null) { return ""; }
  if (d < 0) { return ' <span class="rouge">' + X("expiredSince", { n: -d }) + "</span>"; }
  if (d <= 30) { return ' <span class="orange">' + (d === 0 ? X("todayWord") : X("daysN", { n: d })) + "</span>"; }
  return " <small>" + X("daysN", { n: d }) + "</small>";
}

function bar() {
  var h = "";
  BAR.forEach(function (b) {
    h += '<button type="button" data-s="nav" data-v="' + b[0] + '" class="' + (b[0] === V ? "on" : "") + '">' +
      '<span class="ic"><svg viewBox="0 0 24 24">' + b[2] + "</svg></span><span>" + X(b[1]) + "</span></button>";
  });
  $x("shopBar").innerHTML = h;
}

/* ---------- Accueil : alerte d'expiration ---------- */
function risky() {
  return P.filter(function (l) { return l.quantity > 0 && !l.alert_off && l.expiry_date && dleft(l.expiry_date) <= 30; })
    .sort(function (a, b) { return a.expiry_date < b.expiry_date ? -1 : 1; });
}
function alertBlock() {
  var r = risky();
  if (!r.length) { return '<div class="okmsg">' + X("allGood") + "</div>"; }
  var names = {}, expd = {};
  r.forEach(function (l) { var k = norm(l.name); names[k] = 1; if (dleft(l.expiry_date) <= 0) { expd[k] = 1; } });
  var n = Object.keys(names).length, k = Object.keys(expd).length;
  if (!showExp) {
    return '<div class="sirene"><span class="lamp"></span><div><b>' + X("alertTitle", { n: n }) + "</b>" +
      (k ? '<div class="hint" style="margin:2px 0 0">' + X("alertSub", { k: k }) + "</div>" : "") + "</div></div>" +
      '<button class="main danger" type="button" data-s="seeExp">' + X("seeProducts") + "</button>";
  }
  var rows = "";
  r.forEach(function (l) {
    var d = dleft(l.expiry_date);
    var days = d < 0 ? X("expiredSince", { n: -d }) : d === 0 ? X("todayWord") : X("daysN", { n: d });
    rows += '<tr class="' + (d <= 0 ? "exp" : "") + '"><td><label><input type="checkbox" data-s="dismiss" data-id="' + l.id + '">' + esc(l.name) + "</label></td>" +
      "<td>" + qtyText(l) + "</td><td>" + days + "<br><small>" + fmt(l.expiry_date) + "</small></td></tr>";
  });
  return '<div class="sirene"><span class="lamp"></span><div><b>' + X("alertTitle", { n: n }) + "</b></div></div>" +
    '<p class="hint">' + X("dismissHelp") + "</p>" +
    '<div class="tblw"><table class="tbl"><tr><th>' + X("thProd") + "</th><th>" + X("thQty") + "</th><th>" + X("thDays") + "</th></tr>" + rows + "</table></div>" +
    '<button class="link" type="button" data-s="hideExp">' + X("hide") + "</button>";
}
function vHome() {
  var gs = groups(), value = 0, low = 0, sales = 0, gain = 0, owed = 0;
  P.forEach(function (l) { if (l.quantity > 0) { value += l.quantity * Number(l.buy_price); } });
  gs.forEach(function (g) { if (g.qty <= 5) { low++; } });
  SL.forEach(function (s) { sales += Number(s.amount); gain += Number(s.amount) - Number(s.cost || 0); });
  D.forEach(function (d) { if (!d.paid) { owed += Number(d.amount); } });
  var h = alertBlock();
  if (low) { h += '<div class="lowmsg">' + X("lowMsg", { n: low }) + "</div>"; }
  h += '<div class="stats">' + stat(gs.length, "stProd") + stat(money(value), "stValue") + stat(money(sales), "stSales") +
    stat(money(gain), "stProfit") + stat(money(owed), "stDebts") + "</div>";
  return h;
}

/* ---------- Produits ---------- */
function listHtml() {
  var f = $x("fProd") ? norm($x("fProd").value) : "", h = "";
  groups().forEach(function (g) {
    if (f && norm(g.name).indexOf(f) < 0) { return; }
    h += '<div class="grp"><h4><span>' + esc(g.name) + "</span><span>" + g.qty + " " + X("pcs") + '</span></h4><div class="hint">' +
      X("sellAt") + money(g.price) + " " + X("perPiece") + "</div>";
    g.lots.forEach(function (l) {
      h += '<div class="lot"><span>' + qtyText(l) +
        (l.expiry_date ? "<br><small>" + fmt(l.expiry_date) + "</small>" + expTag(dleft(l.expiry_date)) : "") +
        "<br><small>" + X("costPiece") + money(l.buy_price) + " " + X("perPiece") + '</small></span>' +
        '<button class="small" type="button" data-s="dellot" data-id="' + l.id + '">' + X("suppr") + "</button></div>";
    });
    h += "</div>";
  });
  return h || '<p class="hint">' + X("rien") + "</p>";
}
function resume() {
  var bx = parseInt($x("sBoites").value, 10), pc = parseInt($x("sPieces").value, 10);
  var bp = parseFloat($x("sPrixBoite").value), sp = parseFloat($x("sPrixVente").value), el = $x("sResume");
  if (!(bx >= 1) || !(pc >= 1) || isNaN(bp) || isNaN(sp)) { el.textContent = ""; return; }
  var unit = bp / pc, m = sp - unit, r = sp > 0 ? Math.round(m / sp * 100) : 0;
  el.textContent = X("sumTxt", { p: bx * pc, c: money(unit), m: money(m), r: r }) + (m < 0 ? " " + X("sumLoss") : "");
}
function vProd() {
  var dl = groups().map(function (g) { return '<option value="' + esc(g.name) + '">'; }).join("");
  return "<h3>" + X("recTitle") + '</h3><p class="hint">' + X("recHelp") + "</p>" +
    '<label class="lb" for="sNom">' + X("fName") + '</label><input id="sNom" list="dlNom" autocomplete="off"><datalist id="dlNom">' + dl + "</datalist>" +
    '<label class="lb" for="sBoites">' + X("fBoxes") + '</label><input id="sBoites" type="number" inputmode="numeric" value="1">' +
    '<label class="lb" for="sPieces">' + X("fPieces") + '</label><input id="sPieces" type="number" inputmode="numeric" value="1">' +
    '<label class="lb" for="sPrixBoite">' + X("fBoxPrice") + '</label><input id="sPrixBoite" type="number" inputmode="decimal">' +
    '<label class="lb" for="sPrixVente">' + X("fSell") + '</label><input id="sPrixVente" type="number" inputmode="decimal">' +
    '<label class="lb" for="sDate">' + X("fDate") + '</label><input id="sDate" type="date">' +
    '<p class="hint" id="sResume"></p>' +
    '<button class="main" type="button" data-s="addlot">' + X("addStock") + "</button>" +
    '<input id="fProd" style="margin-top:18px" placeholder="' + esc(X("search")) + '"><div id="listProd">' + listHtml() + "</div>";
}
async function addLot() {
  var name = $x("sNom").value.trim();
  if (!name) { return msg(X("needName")); }
  var bx = parseInt($x("sBoites").value, 10), pc = parseInt($x("sPieces").value, 10);
  var bp = parseFloat($x("sPrixBoite").value), sp = parseFloat($x("sPrixVente").value);
  if (!(bx >= 1) || !(pc >= 1) || !(bp >= 0) || !(sp >= 0)) { return msg(X("badNum")); }
  var unit = bp / pc, qty = bx * pc, date = $x("sDate").value || null;
  if (sp < unit && !confirm(X("confLoss"))) { return; }
  var k = norm(name), same = P.filter(function (l) { return norm(l.name) === k; });
  if (same.length) { name = same[0].name; }
  var twin = same.filter(function (l) {
    return (l.expiry_date || null) === date && Math.abs(Number(l.buy_price) - unit) < 0.005 && (l.pieces_per_box || 1) === pc;
  })[0];
  var r;
  if (twin) { r = await db.from("products").update({ quantity: twin.quantity + qty, sell_price: sp }).eq("id", twin.id); }
  else { r = await db.from("products").insert({ shop_id: shopId, name: name, quantity: qty, expiry_date: date, buy_price: unit, sell_price: sp, pieces_per_box: pc }); }
  if (r.error) { return msg(r.error.message); }
  await reload();
}

/* ---------- Ventes ---------- */
function vSel() {
  var k = $x("vProd") && $x("vProd").value;
  return groups().filter(function (g) { return g.key === k; })[0];
}
function vTotal() {
  var q = parseInt($x("vQte").value, 10) || 0, p = parseFloat($x("vPrix").value) || 0;
  $x("vTotal").textContent = X("sTotal") + money(q * p);
}
function vVen() {
  var gs = groups().filter(function (x) { return sellable(x) > 0; });
  var tot = 0, gain = 0, rows = "";
  SL.forEach(function (s) {
    tot += Number(s.amount); gain += Number(s.amount) - Number(s.cost || 0);
    rows += '<div class="ligne"><span>' + esc(s.product_name) + " × " + (s.qty || 1) + " : " + money(s.amount) + "</span>" +
      '<button class="small" type="button" data-s="cancel" data-id="' + s.id + '">' + X("cancelSale") + "</button></div>";
  });
  var h = "<h3>" + X("bVen") + "</h3>";
  if (!gs.length) { h += '<p class="hint">' + X("noSellable") + "</p>"; }
  else {
    h += '<label class="lb" for="vProd">' + X("sProd") + '</label><select id="vProd" class="champ">' +
      gs.map(function (x) { return '<option value="' + esc(x.key) + '">' + esc(x.name) + " (" + sellable(x) + ")</option>"; }).join("") + "</select>" +
      '<label class="lb" for="vQte">' + X("sQty") + '</label><input id="vQte" type="number" inputmode="numeric" value="1">' +
      '<label class="lb" for="vPrix">' + X("sPrice") + '</label><input id="vPrix" type="number" inputmode="decimal" value="' + gs[0].price + '">' +
      '<p class="hint" id="vTotal"></p><button class="main" type="button" data-s="sell">' + X("sellBtn") + "</button>";
  }
  h += "<h3>" + X("todayTitle") + "</h3>";
  h += '<div class="stats"><div class="stat"><strong>' + money(tot) + "</strong><span>" + X("stSales") + '</span></div><div class="stat"><strong>' + money(gain) + "</strong><span>" + X("stProfit") + "</span></div></div>";
  return h + (rows || '<p class="hint">' + X("rien") + "</p>");
}
async function sell() {
  var g = vSel();
  if (!g) { return msg(X("chooseP")); }
  var q = parseInt($x("vQte").value, 10), p = parseFloat($x("vPrix").value);
  if (!(q >= 1) || isNaN(p) || p < 0) { return msg(X("badQty")); }
  var lots = eligible(g);
  if (lots.reduce(function (a, l) { return a + l.quantity; }, 0) < q) { return msg(X("noStock")); }
  var left = q;
  for (var i = 0; i < lots.length && left > 0; i++) {
    var l = lots[i], n = Math.min(left, l.quantity);
    var r = await db.from("sales").insert({ shop_id: shopId, product_id: l.id, product_name: g.name, qty: n, amount: p * n, cost: Number(l.buy_price) * n });
    if (r.error) { msg(r.error.message); break; }
    var u = await db.from("products").update({ quantity: l.quantity - n }).eq("id", l.id);
    if (u.error) { msg(u.error.message); break; }
    left -= n;
  }
  await reload();
}
async function cancelSale(id) {
  var s = SL.filter(function (x) { return x.id === id; })[0];
  if (!s || !confirm(X("confCancel"))) { return; }
  var lot = P.filter(function (l) { return l.id === s.product_id; })[0];
  if (lot) {
    var u = await db.from("products").update({ quantity: lot.quantity + (s.qty || 1) }).eq("id", lot.id);
    if (u.error) { return msg(u.error.message); }
  }
  var d = await db.from("sales").delete().eq("id", id);
  if (d.error) { return msg(d.error.message); }
  await reload();
}

/* ---------- Dettes ---------- */
function vDet() {
  var owed = 0;
  D.forEach(function (d) { if (!d.paid) { owed += Number(d.amount); } });
  var list = D.slice().sort(function (a, b) { return (a.paid ? 1 : 0) - (b.paid ? 1 : 0); });
  var h = "<h3>" + X("bDet") + "</h3>" +
    '<label class="lb" for="kNom">' + X("fClient") + '</label><input id="kNom">' +
    '<label class="lb" for="kMont">' + X("fAmount") + '</label><input id="kMont" type="number" inputmode="decimal">' +
    '<button class="main" type="button" data-s="adddebt">' + X("addDebt") + "</button>" +
    "<h3>" + X("debtTotal") + money(owed) + "</h3>";
  list.forEach(function (d) {
    h += '<div class="ligne"><span class="' + (d.paid ? "vert" : "") + '">' + esc(d.customer_name) + " : " + money(d.amount) + "</span><span>" +
      (d.paid ? "✔" : '<button class="small" type="button" data-s="paydebt" data-id="' + d.id + '">' + X("dPaid") + "</button>") +
      '<button class="small" type="button" data-s="deldebt" data-id="' + d.id + '">' + X("suppr") + "</button></span></div>";
  });
  return h;
}

/* ---------- Statistiques : graphiques ---------- */
async function loadRows() {
  var all = [], from = new Date();
  from.setMonth(from.getMonth() - 12); from.setHours(0, 0, 0, 0);
  for (var p = 0; p < 10; p++) {
    var r = await db.from("sales").select("created_at,amount,cost,qty,product_name")
      .eq("shop_id", shopId).gte("created_at", from.toISOString()).order("created_at").range(p * 1000, p * 1000 + 999);
    if (r.error) { break; }
    all = all.concat(r.data || []);
    if (!r.data || r.data.length < 1000) { break; }
  }
  return all;
}
function build(m) {
  var n = m === "day" ? 7 : m === "week" ? 8 : 6, out = [], t = new Date();
  t.setHours(0, 0, 0, 0);
  for (var i = n - 1; i >= 0; i--) {
    var s, e, lab;
    if (m === "day") {
      s = new Date(t); s.setDate(t.getDate() - i);
      e = new Date(s); e.setDate(s.getDate() + 1);
      lab = s.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric" }).replace(".", "");
    } else if (m === "week") {
      s = new Date(t); s.setDate(t.getDate() - ((t.getDay() + 6) % 7) - 7 * i);
      e = new Date(s); e.setDate(s.getDate() + 7);
      lab = ("0" + s.getDate()).slice(-2) + "/" + ("0" + (s.getMonth() + 1)).slice(-2);
    } else {
      s = new Date(t.getFullYear(), t.getMonth() - i, 1);
      e = new Date(t.getFullYear(), t.getMonth() - i + 1, 1);
      lab = s.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "");
    }
    out.push({ s: s, e: e, lab: lab, sales: 0, profit: 0 });
  }
  return out;
}
function pct(cur, prev) {
  if (!(prev > 0)) { return ""; }
  var p = Math.round((cur - prev) / prev * 100);
  return ' <span class="' + (p >= 0 ? "vert" : "rouge") + '">' + (p >= 0 ? "+" : "") + p + " %</span>";
}
function chart(ps) {
  var W = 320, n = ps.length, gw = W / n, bw = gw * 0.3, max = 1;
  ps.forEach(function (p) { if (p.sales > max) { max = p.sales; } });
  var g = '<line x1="0" y1="130" x2="' + W + '" y2="130" style="stroke:var(--border)"/>';
  ps.forEach(function (p, i) {
    var h1 = Math.max(0, p.sales) / max * 110, h2 = Math.max(0, p.profit) / max * 110, x = i * gw + gw * 0.18;
    g += '<rect x="' + x + '" y="' + (130 - h1) + '" width="' + bw + '" height="' + h1 + '" rx="3" style="fill:var(--accent)"/>';
    g += '<rect x="' + (x + bw + 2) + '" y="' + (130 - h2) + '" width="' + bw + '" height="' + h2 + '" rx="3" style="fill:#1f9d6b"/>';
    g += '<text x="' + (i * gw + gw / 2) + '" y="146" text-anchor="middle" font-size="9" style="fill:var(--muted)">' + p.lab + "</text>";
  });
  return '<svg class="evsvg" viewBox="0 0 ' + W + ' 150" role="img">' + g + "</svg>";
}
function evoHtml() {
  if (!srows.length) { return '<h3>' + X("evo") + '</h3><p class="hint">' + X("eNone") + "</p>"; }
  var ps = build(mode);
  srows.forEach(function (r) {
    var d = new Date(r.created_at);
    for (var i = 0; i < ps.length; i++) {
      if (d >= ps[i].s && d < ps[i].e) { ps[i].sales += Number(r.amount); ps[i].profit += Number(r.amount) - Number(r.cost || 0); break; }
    }
  });
  var cur = ps[ps.length - 1], prev = ps[ps.length - 2];
  var now = mode === "day" ? X("eNowDay") : mode === "week" ? X("eNowWeek") : X("eNowMonth");
  var marge = cur.sales > 0 ? Math.round(cur.profit / cur.sales * 100) : 0;
  var h = "<h3>" + X("evo") + '</h3><div class="evt">';
  [["day", "eDay"], ["week", "eWeek"], ["month", "eMonth"]].forEach(function (b) {
    h += '<button type="button" class="tab ' + (mode === b[0] ? "on" : "") + '" data-e2="' + b[0] + '">' + X(b[1]) + "</button>";
  });
  h += '</div><div class="leg"><span><i style="background:var(--accent)"></i>' + X("eSales") +
    '</span><span><i style="background:#1f9d6b"></i>' + X("eProfit") + "</span></div>" + chart(ps);
  h += '<div class="evrow"><b>' + now + '</b><span class="hint" style="margin:0">' + X("eVs") + "</span></div>" +
    '<div class="evrow"><span>' + X("eSales") + "</span><span>" + money(cur.sales) + pct(cur.sales, prev.sales) + "</span></div>" +
    '<div class="evrow"><span>' + X("eProfit") + "</span><span>" + money(cur.profit) + pct(cur.profit, prev.profit) + "</span></div>" +
    '<div class="evrow"><span>' + X("eMargin") + "</span><span>" + marge + " %</span></div>";
  h += "<h3>" + X("eList") + "</h3>";
  ps.slice().reverse().forEach(function (p) {
    h += '<div class="evrow"><span>' + p.lab + "</span><span>" + money(p.sales) + ' · <span class="' + (p.profit >= 0 ? "vert" : "rouge") + '">' + money(p.profit) + "</span></span></div>";
  });
  var from30 = new Date(); from30.setDate(from30.getDate() - 30); from30.setHours(0, 0, 0, 0);
  var m = {}, keys = [];
  srows.forEach(function (r) {
    if (new Date(r.created_at) < from30) { return; }
    var k = norm(r.product_name);
    if (!m[k]) { m[k] = { name: r.product_name, qty: 0, profit: 0 }; keys.push(k); }
    m[k].qty += Number(r.qty || 1);
    m[k].profit += Number(r.amount) - Number(r.cost || 0);
  });
  keys.sort(function (a, b) { return m[b].profit - m[a].profit; });
  if (keys.length) {
    h += "<h3>" + X("eTop") + "</h3>";
    keys.slice(0, 5).forEach(function (k) {
      h += '<div class="evrow"><span>' + esc(m[k].name) + " (" + m[k].qty + " " + X("pcs") + ")</span><span>" + money(m[k].profit) + "</span></div>";
    });
  }
  return h;
}
function vStat() { return '<div id="evoBox"><p class="hint">…</p></div>'; }
async function paintEvo() {
  srows = await loadRows();
  if (V === "stat" && $x("evoBox")) { $x("evoBox").innerHTML = evoHtml(); }
}

/* ---------- Affichage ---------- */
function render() {
  var views = { home: vHome, prod: vProd, ven: vVen, det: vDet, stat: vStat };
  if (V === "abo") {
    $x("shopView").classList.add("hidden");
    if (typeof onglet === "function") { onglet("pAbo"); }
  } else {
    $x("pAbo").classList.add("hidden");
    $x("shopView").classList.remove("hidden");
    $x("shopView").innerHTML = views[V]();
    if (V === "ven" && $x("vTotal")) { vTotal(); }
    if (V === "stat") { paintEvo(); }
  }
  bar();
}
window.dukyoShopGo = function (v) { V = v; render(); window.scrollTo(0, 0); };

var prevAff = afficher;
afficher = async function () {
  $x("shopBar").classList.add("hidden");
  document.body.classList.remove("hasbar2");
  await prevAff();
  var app = $x("app");
  if (app && !app.classList.contains("hidden")) {
    await load();
    $x("shopBar").classList.remove("hidden");
    document.body.classList.add("hasbar2");
    render();
  }
};
var oldBienvenue = ouvrirBienvenue;
ouvrirBienvenue = function () {
  oldBienvenue();
  $x("shopBar").classList.add("hidden");
  document.body.classList.remove("hasbar2");
};

document.addEventListener("input", function (e) {
  var id = e.target.id;
  if (id === "sBoites" || id === "sPieces" || id === "sPrixBoite" || id === "sPrixVente") { resume(); }
  else if (id === "fProd") { $x("listProd").innerHTML = listHtml(); }
  else if (id === "vQte" || id === "vPrix") { vTotal(); }
});
document.addEventListener("change", async function (e) {
  var t = e.target;
  if (t.dataset && t.dataset.s === "dismiss") {
    if (!confirm(X("confDismiss"))) { t.checked = false; return; }
    var r = await db.from("products").update({ alert_off: true }).eq("id", t.dataset.id);
    if (r.error) { t.checked = false; return msg(r.error.message); }
    await reload();
  } else if (t.id === "vProd") {
    var g = vSel();
    if (g) { $x("vPrix").value = g.price; vTotal(); }
  } else if (t.id === "sNom") {
    var k = norm(t.value), m = groups().filter(function (x) { return x.key === k; })[0];
    if (m && !$x("sPrixVente").value) { $x("sPrixVente").value = m.price; resume(); }
  }
});
document.addEventListener("click", async function (e) {
  var e2 = e.target.closest("[data-e2]");
  if (e2) {
    mode = e2.dataset.e2;
    localStorage.setItem("evoMode", mode);
    if ($x("evoBox")) { $x("evoBox").innerHTML = evoHtml(); }
    return;
  }
  var b = e.target.closest("[data-s]");
  if (!b || b.tagName === "INPUT") { return; }
  var a = b.dataset.s, id = b.dataset.id;
  msg("");
  if (a === "nav") { V = b.dataset.v; render(); window.scrollTo(0, 0); }
  else if (a === "seeExp") { showExp = true; render(); }
  else if (a === "hideExp") { showExp = false; render(); }
  else if (a === "addlot") { await addLot(); }
  else if (a === "dellot") {
    if (confirm(X("confDelLot"))) {
      var r = await db.from("products").delete().eq("id", id);
      if (r.error) { return msg(r.error.message); }
      await reload();
    }
  }
  else if (a === "sell") { await sell(); }
  else if (a === "cancel") { await cancelSale(id); }
  else if (a === "adddebt") {
    var c = $x("kNom").value.trim(), m = parseFloat($x("kMont").value);
    if (!c || isNaN(m) || m <= 0) { return msg(X("badNum")); }
    var r2 = await db.from("debts").insert({ shop_id: shopId, customer_name: c, amount: m });
    if (r2.error) { return msg(r2.error.message); }
    await reload();
  }
  else if (a === "paydebt") {
    var r3 = await db.from("debts").update({ paid: true }).eq("id", id);
    if (r3.error) { return msg(r3.error.message); }
    await reload();
  }
  else if (a === "deldebt") {
    if (confirm(X("confDelDebt"))) {
      var r4 = await db.from("debts").delete().eq("id", id);
      if (r4.error) { return msg(r4.error.message); }
      await reload();
    }
  }
});

langue(L);
afficher();
})();
