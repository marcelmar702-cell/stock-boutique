(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };

var st = document.createElement("style");
st.textContent = [
".tabs,#pProd,#pDet,#pVen{display:none!important}",
"body.hasbar2{padding-bottom:0!important}",
"body.hasbar2 .card{padding-bottom:104px}",
".stat strong{font-size:19px;word-break:break-word}",
".hint{font-size:13px;color:var(--muted);margin:6px 0;line-height:1.45}",
".grp{margin-top:12px;padding:12px;background:var(--field);border:1px solid var(--border);border-radius:14px;animation:fadeUp .4s ease both}",
".grp h4{margin:0;display:flex;justify-content:space-between;gap:8px;font-size:16px;word-break:break-word}",
".lot{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 0;border-top:1px solid var(--border);font-size:14px;margin-top:8px}",
".lot small{color:var(--muted)}",
".alrt{border-left:5px solid var(--error);background:var(--field);border-radius:12px;padding:12px;margin-top:12px;font-size:14px;line-height:1.5;animation:pulse 2.6s ease-in-out infinite}",
".alrt.o{border-left-color:var(--warn);animation:none}",
".alrt.g{border-left-color:var(--ok);animation:none}",
".alrt b{display:block;margin-bottom:4px;font-size:15px}",
"@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(179,38,30,0)}50%{box-shadow:0 0 0 6px rgba(179,38,30,.16)}}"
].join("\n");
document.head.appendChild(st);

Object.assign(T.fr, {
bHome:"Accueil", bProd:"Produits", bVen:"Ventes", bDet:"Dettes", bAbo:"Abonnement",
stProd:"Produits", stPieces:"Pièces en stock", stValue:"Valeur du stock", stSales:"Ventes d’aujourd’hui", stProfit:"Bénéfice d’aujourd’hui", stDebts:"Dettes à recevoir",
aExpired:"🚨 Produits expirés : retire-les de la vente", aLoss:"Perte si tu ne les vends pas : ",
aSoon:"⏰ Bientôt expirés (30 jours ou moins)", aLow:"📉 Stock bas (5 pièces ou moins)",
inDays:"dans {n} jours", todayWord:"aujourd’hui", expOn:"expiré le", pcs:"pièces",
allGood:"✅ Aucune alerte. Tout va bien.", seeProd:"Voir les produits",
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
sProd:"Produit vendu", sQty:"Quantité vendue (pièces)", sPrice:"Prix de vente d’une pièce (FC) — change-le pour faire une remise",
sellBtn:"Vendre", sTotal:"Total : ", todayTitle:"Ventes d’aujourd’hui", cancelSale:"Annuler",
confCancel:"Annuler cette vente ? Le stock revient.",
noStock:"Stock insuffisant (les produits expirés ne se vendent pas).", chooseP:"Choisis un produit.", badQty:"Écris une quantité et un prix valides.",
noSellable:"Aucun produit à vendre. Ajoute du stock d’abord.",
fClient:"Nom du client", fAmount:"Montant dû (FC)", addDebt:"Ajouter la dette", debtTotal:"À recevoir : ",
dPaid:"Payé", confDelDebt:"Supprimer cette dette ?", needName:"Écris le nom du produit.", badNum:"Vérifie les nombres."
});
Object.assign(T.sw, {
bAbo:"Abonnement",
stPieces:"Pièces zilizobaki", stValue:"Valeur ya stock", stSales:"Ventes ya leo", stProfit:"Faida ya leo", stDebts:"Dettes za kupokea",
aExpired:"🚨 Produits zimeisha : ziondoe kwenye vente", aLoss:"Hasara kama hutaziuza : ",
aSoon:"⏰ Zinakaribia kuisha (siku 30 au chini)", aLow:"📉 Stock ndogo (pièces 5 au chini)",
inDays:"baada ya siku {n}", todayWord:"leo", expOn:"imeisha tarehe", pcs:"pièces",
allGood:"✅ Hakuna alerte. Kila kitu kiko sawa.", seeProd:"Ona produits",
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
sProd:"Produit iliyouzwa", sQty:"Idadi iliyouzwa (pièces)", sPrice:"Bei ya kuuza pièce moja (FC) — ibadilishe kwa remise",
sellBtn:"Uza", sTotal:"Jumla : ", todayTitle:"Ventes ya leo", cancelSale:"Ghairi",
confCancel:"Kughairi vente hii ? Stock inarudi.",
noStock:"Stock haitoshi (produits zilizoisha hazinauzwa).", chooseP:"Chagua produit.", badQty:"Andika idadi na bei sahihi.",
noSellable:"Hakuna produit ya kuuza. Ongeza stock kwanza.",
fClient:"Jina ya client", fAmount:"Kiasi anachodaiwa (FC)", addDebt:"Ongeza dette", debtTotal:"Za kupokea : ",
dPaid:"Amelipa", confDelDebt:"Kufuta dette hii ?", needName:"Andika jina ya produit.", badNum:"Angalia ma nombre."
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

var P = [], D = [], SL = [], V = "home";
var BAR = [
  ["home", "bHome", '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>'],
  ["prod", "bProd", '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>'],
  ["ven", "bVen", '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 4h3l2.5 11h10l2-8H7"/>'],
  ["det", "bDet", '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>'],
  ["abo", "bAbo", '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>']
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
/* Vente : le lot qui expire en premier part en premier, et un lot expiré ne se vend pas. */
function eligible(g) {
  return g.lots.filter(function (l) { var d = dleft(l.expiry_date); return l.quantity > 0 && (d === null || d >= 0); });
}
function sellable(g) { return eligible(g).reduce(function (a, l) { return a + l.quantity; }, 0); }

function expTag(d) {
  if (d === null) { return ""; }
  if (d < 0) { return ' <span class="rouge">' + X("expire") + "</span>"; }
  if (d <= 30) { return ' <span class="orange">' + (d === 0 ? X("todayWord") : X("inDays", { n: d })) + "</span>"; }
  return " <small>" + X("inDays", { n: d }) + "</small>";
}

function bar() {
  var h = "";
  BAR.forEach(function (b) {
    h += '<button type="button" data-s="nav" data-v="' + b[0] + '" class="' + (b[0] === V ? "on" : "") + '">' +
      '<span class="ic"><svg viewBox="0 0 24 24">' + b[2] + "</svg></span><span>" + X(b[1]) + "</span></button>";
  });
  $x("shopBar").innerHTML = h;
}

/* ---------- Accueil ---------- */
function vHome() {
  var gs = groups(), pieces = 0, value = 0, loss = 0, exp = [], soon = [], low = [];
  P.forEach(function (l) {
    if (l.quantity <= 0) { return; }
    pieces += l.quantity; value += l.quantity * Number(l.buy_price);
    var d = dleft(l.expiry_date);
    if (d !== null && d < 0) { exp.push(l); loss += l.quantity * Number(l.buy_price); }
    else if (d !== null && d <= 30) { soon.push(l); }
  });
  soon.sort(function (a, b) { return a.expiry_date < b.expiry_date ? -1 : 1; });
  gs.forEach(function (g) { if (g.qty <= 5) { low.push(g); } });
  var sales = 0, gain = 0, owed = 0;
  SL.forEach(function (s) { sales += Number(s.amount); gain += Number(s.amount) - Number(s.cost || 0); });
  D.forEach(function (d) { if (!d.paid) { owed += Number(d.amount); } });
  var h = "";
  if (exp.length) {
    h += '<div class="alrt"><b>' + X("aExpired") + "</b>";
    exp.slice(0, 6).forEach(function (l) { h += esc(l.name) + " — " + l.quantity + " " + X("pcs") + " — " + X("expOn") + " " + fmt(l.expiry_date) + "<br>"; });
    h += '<div class="hint">' + X("aLoss") + money(loss) + "</div></div>";
  }
  if (soon.length) {
    h += '<div class="alrt o"><b>' + X("aSoon") + "</b>";
    soon.slice(0, 6).forEach(function (l) {
      var d = dleft(l.expiry_date);
      h += esc(l.name) + " — " + l.quantity + " " + X("pcs") + " — " + (d === 0 ? X("todayWord") : X("inDays", { n: d })) + "<br>";
    });
    h += "</div>";
  }
  if (low.length) {
    h += '<div class="alrt o"><b>' + X("aLow") + "</b>";
    low.slice(0, 6).forEach(function (g) { h += esc(g.name) + " — " + g.qty + " " + X("pcs") + "<br>"; });
    h += "</div>";
  }
  if (!exp.length && !soon.length && !low.length) { h += '<div class="alrt g">' + X("allGood") + "</div>"; }
  else { h += '<button class="link" type="button" data-s="nav" data-v="prod">' + X("seeProd") + "</button>"; }
  h += '<div class="stats">' + stat(gs.length, "stProd") + stat(pieces, "stPieces") + stat(money(value), "stValue") +
    stat(money(sales), "stSales") + stat(money(gain), "stProfit") + stat(money(owed), "stDebts") + "</div>";
  h += '<button class="link" type="button" onclick="sortir()">' + X("logout") + "</button>";
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
      h += '<div class="lot"><span>' + l.quantity + " " + X("pcs") +
        (l.expiry_date ? " · " + fmt(l.expiry_date) + expTag(dleft(l.expiry_date)) : "") +
        "<br><small>" + X("costPiece") + money(l.buy_price) + " " + X("perPiece") + '</small></span>' +
        '<button class="small" type="button" data-s="dellot" data-id="' + l.id + '">' + X("del") + "</button></div>";
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
  var twin = same.filter(function (l) { return (l.expiry_date || null) === date && Math.abs(Number(l.buy_price) - unit) < 0.005; })[0];
  var r;
  if (twin) { r = await db.from("products").update({ quantity: twin.quantity + qty, sell_price: sp }).eq("id", twin.id); }
  else { r = await db.from("products").insert({ shop_id: shopId, name: name, quantity: qty, expiry_date: date, buy_price: unit, sell_price: sp }); }
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
  return h + (rows || '<p class="hint">' + X("rien") + "</p>") + rows.length * 0 + "";
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
      '<button class="small" type="button" data-s="deldebt" data-id="' + d.id + '">' + X("del") + "</button></span></div>";
  });
  return h || "";
}

/* ---------- Affichage ---------- */
function render() {
  var views = { home: vHome, prod: vProd, ven: vVen, det: vDet };
  if (V === "abo") { $x("shopView").classList.add("hidden"); onglet("pAbo"); }
  else {
    $x("pAbo").classList.add("hidden");
    $x("shopView").classList.remove("hidden");
    $x("shopView").innerHTML = views[V]();
    if (V === "ven" && $x("vTotal")) { vTotal(); }
  }
  bar();
}

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
document.addEventListener("change", function (e) {
  if (e.target.id === "vProd") {
    var g = vSel();
    if (g) { $x("vPrix").value = g.price; vTotal(); }
  } else if (e.target.id === "sNom") {
    var k = norm(e.target.value), m = groups().filter(function (x) { return x.key === k; })[0];
    if (m && !$x("sPrixVente").value) { $x("sPrixVente").value = m.price; resume(); }
  }
});
document.addEventListener("click", async function (e) {
  var b = e.target.closest("[data-s]");
  if (!b) { return; }
  var a = b.dataset.s, id = b.dataset.id;
  msg("");
  if (a === "nav") { V = b.dataset.v; render(); window.scrollTo(0, 0); }
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
