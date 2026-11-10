(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };

var st = document.createElement("style");
st.textContent = [
"#admin{display:none!important}",
"select.champ{width:100%;padding:12px 13px;font-size:16px;border-radius:11px;border:1px solid var(--border);background:var(--field);color:var(--text)}",
".bnav{position:fixed;left:0;right:0;bottom:0;z-index:30;display:flex;justify-content:center;background:var(--card);border-top:1px solid var(--border);padding:6px 4px calc(6px + env(safe-area-inset-bottom,0px));box-shadow:0 -4px 16px rgba(0,0,0,.10);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}",
".bnav.hidden{display:none}",
".bnav button{flex:1 1 0;max-width:104px;min-width:0;display:flex;flex-direction:column;align-items:center;gap:3px;background:none;border:0;color:var(--muted);font-size:10.5px;font-weight:600;padding:2px 1px;margin:0;cursor:pointer;overflow:visible}",
".bnav .ic{display:flex;align-items:center;justify-content:center;width:46px;height:28px;border-radius:14px;transition:background .3s,transform .45s cubic-bezier(.34,1.56,.64,1)}",
".bnav button:active .ic{transform:scale(.9)}",
".bnav svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}",
".bnav button.on{color:var(--text)}.bnav button.on .ic{background:var(--accent);color:var(--accent-text)}",
".bnav .dot{position:absolute;top:0;left:calc(50% + 8px);width:10px;height:10px;border-radius:50%;background:#1fbf5b;border:2px solid var(--card)}",
"body.hasbar{padding-bottom:96px}",
".stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}",
".stat{background:var(--field);border:1px solid var(--border);border-radius:12px;padding:12px 6px;text-align:center}",
".stat strong{display:block;font-size:24px}.stat span{font-size:12px;color:var(--muted)}",
".shopc{background:var(--field);border:1px solid var(--border);border-radius:14px;padding:12px;margin-top:10px;animation:fadeUp .4s ease both}",
".shopc .n{font-weight:700;word-break:break-word}.shopc .m{font-size:13px;color:var(--muted);margin-top:2px;word-break:break-word}",
".shopc .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:8px}",
".shopc select{width:auto;padding:7px;border-radius:9px;border:1px solid var(--border);background:var(--card);color:var(--text);font-size:14px}",
".shopc button.small{margin:0}",
".tag-ok{color:var(--ok);font-weight:600}.tag-bad{color:var(--error);font-weight:600}",
".tab{font-size:13px;padding:10px 2px}"
].join("\n");
document.head.appendChild(st);

Object.assign(T.fr, {
oHome:"Accueil", oAbo:"Abonnements", oPay:"Paiements", oShops:"Boutiques",
oTitle:"Espace propriétaire",
oPrivacy:"Tu vois les abonnements et les paiements. Tu ne vois jamais les produits, ventes ou dettes des boutiques.",
sTotal:"Boutiques", sActive:"Actives", sExpired:"Abonnement fini", sBlocked:"Bloquées", sPending:"Paiements à confirmer",
colEnd:"Fin d’abonnement", daysLeft:"jours restants", expiredWord:"expiré",
statusActive:"Active", statusBlocked:"Bloquée", months:"mois", extend:"Prolonger",
confirmExt:"Prolonger cette boutique de {n} mois ?", noShops:"Aucune boutique pour l’instant.",
pPending:"Paiements à confirmer", noPending:"Aucun paiement en attente.", asks:"demande {n} mois",
confirm:"Confirmer", reject:"Refuser", confirmPay:"Confirmer ce paiement et prolonger de {n} mois ?", confirmRej:"Refuser cette demande ?",
history:"Historique", hConf:"confirmé", hRej:"refusé",
numbers:"Mes numéros de paiement", numHelp:"Les boutiques voient ces numéros pour te payer.", noNums:"Aucun numéro. Ajoute-en un.",
nOp:"Opérateur (Orange, Airtel, Africell…)", nNum:"Numéro", nHolder:"Nom du compte", add:"Ajouter", needAll:"Remplis les trois champs.",
price:"Prix affiché aux boutiques", priceHelp:"Exemple : 5 000 FC par mois", save:"Enregistrer",
block:"Bloquer", unblock:"Réactiver", del:"Supprimer",
confirmBlock:"Bloquer cette boutique ? Elle ne pourra plus utiliser Dukyo.", confirmUnblock:"Réactiver cette boutique ?",
confirmDel:"Supprimer cette boutique, son compte et toutes ses données ? C’est définitif.", confirmDel2:"Dernière vérification : tout supprimer ?",
aboTab:"Abonnement", aboTitle:"Mon abonnement", until:"Abonnement jusqu’au", expiredSince:"Abonnement terminé depuis le", left:"jours restants",
howTitle:"Comment payer", how1:"1. Envoie l’argent à l’un de ces numéros.",
how2:"2. Choisis la durée payée, puis touche « J’ai déjà payé ».",
how3:"3. Dukyo vérifie le paiement, puis allonge ton abonnement. Rien ne se fait tout seul.",
paid:"J’ai déjà payé", duration:"Durée payée", waiting:"Demande envoyée. Attends la confirmation de Dukyo.",
noNumsShop:"Pas encore de numéro de paiement. Contacte Dukyo.",
blockedTitle:"Compte bloqué", blockedText:"Ton compte est bloqué. Contacte Dukyo pour le réactiver.",
expTitle:"Abonnement terminé", expText:"Pour continuer à utiliser Dukyo, paie ton abonnement.",
refresh:"Actualiser", warn7:"⚠️ Ton abonnement finit dans {n} jours."
});
Object.assign(T.sw, {
oHome:"Accueil", oAbo:"Abonnements", oPay:"Paiements", oShops:"Boutiques",
oTitle:"Espace ya propriétaire",
oPrivacy:"Unaona abonnements na paiements. Huoni kamwe produits, ventes wala dettes za boutiques.",
sTotal:"Boutiques", sActive:"Zinafanya kazi", sExpired:"Abonnement imeisha", sBlocked:"Zimebloqués", sPending:"Paiements za kuconfirmer",
colEnd:"Mwisho wa abonnement", daysLeft:"siku zimebaki", expiredWord:"imeisha",
statusActive:"Inafanya kazi", statusBlocked:"Imebloqué", months:"mois", extend:"Ongeza",
confirmExt:"Kuongeza boutique hii mois {n} ?", noShops:"Hakuna boutique bado.",
pPending:"Paiements za kuconfirmer", noPending:"Hakuna paiement ya kusubiri.", asks:"anaomba mois {n}",
confirm:"Confirmer", reject:"Kataa", confirmPay:"Kuconfirmer paiement hii na kuongeza mois {n} ?", confirmRej:"Kukataa ombi hili ?",
history:"Historique", hConf:"imeconfirmé", hRej:"imekataliwa",
numbers:"Numéros zangu za paiement", numHelp:"Boutiques zinaona numéros hizi ili kukulipa.", noNums:"Hakuna numéro. Ongeza moja.",
nOp:"Opérateur (Orange, Airtel, Africell…)", nNum:"Numéro", nHolder:"Jina ya compte", add:"Ongeza", needAll:"Jaza champs zote tatu.",
price:"Bei inayoonyeshwa kwa boutiques", priceHelp:"Mfano : 5 000 FC kwa mois", save:"Hifadhi",
block:"Bloquer", unblock:"Rudisha", del:"Futa",
confirmBlock:"Kubloquer boutique hii ? Haitaweza kutumia Dukyo.", confirmUnblock:"Kurudisha boutique hii ?",
confirmDel:"Kufuta boutique hii, compte yake na données zote ? Haiwezi kurudishwa.", confirmDel2:"Kuthibitisha mara ya mwisho : kufuta yote ?",
aboTab:"Abonnement", aboTitle:"Abonnement yangu", until:"Abonnement hadi", expiredSince:"Abonnement imeisha tangu", left:"siku zimebaki",
howTitle:"Jinsi ya kulipa", how1:"1. Tuma pesa kwa moja ya numéros hizi.",
how2:"2. Chagua durée uliyolipa, kisha bonyeza « Nimeshalipa ».",
how3:"3. Dukyo inaangalia paiement, kisha inaongeza abonnement yako. Hakuna kinachofanyika peke yake.",
paid:"Nimeshalipa", duration:"Durée uliyolipa", waiting:"Ombi limetumwa. Subiri Dukyo ikuconfirmer.",
noNumsShop:"Hakuna numéro ya paiement bado. Wasiliana na Dukyo.",
blockedTitle:"Compte imebloqué", blockedText:"Compte yako imebloqué. Wasiliana na Dukyo ili irudishwe.",
expTitle:"Abonnement imeisha", expText:"Ili kuendelea kutumia Dukyo, lipa abonnement yako.",
refresh:"Rafraîchir", warn7:"⚠️ Abonnement yako inaisha baada ya siku {n}."
});

function tx(k, v) {
  var s = (T[L] && T[L][k]) || T.fr[k] || k;
  if (v) { for (var i in v) { s = s.replace("{" + i + "}", v[i]); } }
  return s;
}
function fmt(d) { return d ? d.split("-").reverse().join("/") : "-"; }
function daysLeft(end) {
  if (!end) { return -9999; }
  var b = new Date(); b.setHours(0, 0, 0, 0);
  return Math.round((new Date(end + "T00:00:00") - b) / 864e5);
}
function opts(list) {
  return list.map(function (m) { return '<option value="' + m + '">' + m + " " + tx("months") + "</option>"; }).join("");
}

/* ---------- Éléments ajoutés à la page ---------- */
document.querySelector(".card").insertAdjacentHTML("beforeend", '<div id="own" class="hidden"></div><div id="gate" class="hidden"></div>');
document.body.insertAdjacentHTML("beforeend", '<nav id="ownBar" class="bnav hidden"></nav>');
document.querySelector("#app .tabs").insertAdjacentHTML("beforeend", '<button class="tab" id="tAbo" type="button" onclick="onglet(\'pAbo\')" data-t="aboTab"></button>');
$x("pVen").insertAdjacentHTML("afterend", '<div id="pAbo" class="hidden"></div>');
document.querySelector("#app .entete").insertAdjacentHTML("afterend", '<div id="aboBanner"></div>');

/* ---------- Propriétaire ---------- */
var S = { shops: [], reqs: [], nums: [], price: "" };
var view = "home", timer = null, MODE = "none", lastPending = 0;
var BAR = [
  ["home", "oHome", '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>'],
  ["abo", "oAbo", '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'],
  ["pay", "oPay", '<rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 11h20M6 16h4"/>'],
  ["shops", "oShops", '<path d="M4 9l1-5h14l1 5"/><path d="M4 9a2.5 2.5 0 005 0 2.5 2.5 0 005 0 2.5 2.5 0 005 0"/><path d="M5 12v8h14v-8"/>']
];

function pendingList() { return S.reqs.filter(function (r) { return r.status === "pending"; }); }
function shopById(id) { return S.shops.filter(function (s) { return s.id === id; })[0]; }

async function chargerReqs() {
  var b = await db.from("payment_requests").select("*").order("created_at", { ascending: false }).limit(100);
  if (!b.error) { S.reqs = b.data || []; }
}
async function chargerTout() {
  var a = await db.rpc("owner_overview");
  if (a.error) { msg(a.error.message); } else { S.shops = a.data || []; }
  await chargerReqs();
  var c = await db.from("payment_numbers").select("*").order("created_at");
  if (!c.error) { S.nums = c.data || []; }
  var d = await db.from("app_settings").select("v").eq("k", "price_text").maybeSingle();
  S.price = (d.data && d.data.v) || "";
}

function bar() {
  var n = pendingList().length, h = "";
  BAR.forEach(function (b) {
    h += '<button type="button" data-a="nav" data-v="' + b[0] + '" class="' + (b[0] === view ? "on" : "") + '">' +
      '<span class="ic"><svg viewBox="0 0 24 24">' + b[2] + "</svg></span><span>" + tx(b[1]) + "</span>" +
      (b[0] === "pay" && n ? '<span class="dot"></span>' : "") + "</button>";
  });
  $x("ownBar").innerHTML = h;
}
function stat(n, k) { return '<div class="stat"><strong>' + n + "</strong><span>" + tx(k) + "</span></div>"; }
function logoutBtn() { return '<button class="link" type="button" data-a="out">' + tx("logout") + "</button>"; }

function etat(s) {
  var d = daysLeft(s.subscription_end);
  if (s.status === "blocked") { return '<span class="tag-bad">' + tx("statusBlocked") + "</span>"; }
  if (d < 0) { return '<span class="tag-bad">' + tx("expiredWord") + " " + fmt(s.subscription_end) + "</span>"; }
  return '<span class="tag-ok">' + tx("statusActive") + " · " + d + " " + tx("daysLeft") + "</span>";
}

function vHome() {
  var act = 0, exp = 0, blk = 0, n = pendingList().length;
  S.shops.forEach(function (s) {
    if (s.status === "blocked") { blk++; } else if (daysLeft(s.subscription_end) < 0) { exp++; } else { act++; }
  });
  return "<h2>" + tx("oTitle") + '</h2><p class="sub">' + tx("oPrivacy") + "</p>" +
    '<div class="stats">' + stat(S.shops.length, "sTotal") + stat(act, "sActive") + stat(exp, "sExpired") + stat(blk, "sBlocked") + "</div>" +
    (n ? '<button class="main" type="button" data-a="nav" data-v="pay">' + tx("sPending") + " : " + n + "</button>" : "") + logoutBtn();
}
function vAbo() {
  var h = "<h2>" + tx("oAbo") + "</h2>";
  var list = S.shops.slice().sort(function (a, b) { return daysLeft(a.subscription_end) - daysLeft(b.subscription_end); });
  if (!list.length) { h += '<p class="sub">' + tx("noShops") + "</p>"; }
  list.forEach(function (s) {
    h += '<div class="shopc"><div class="n">' + esc(s.name) + '</div><div class="m">' + esc(s.email || "") + "</div>" +
      '<div class="m">' + tx("colEnd") + " : " + fmt(s.subscription_end) + "</div><div>" + etat(s) + "</div>" +
      '<div class="row"><select id="m_' + s.id + '">' + opts([1, 2, 3, 6, 12]) + '</select>' +
      '<button class="small" type="button" data-a="ext" data-id="' + s.id + '">' + tx("extend") + "</button></div></div>";
  });
  return h + logoutBtn();
}
function vPay() {
  var h = "<h2>" + tx("oPay") + "</h2><h3>" + tx("pPending") + "</h3>";
  var p = pendingList();
  if (!p.length) { h += '<p class="sub">' + tx("noPending") + "</p>"; }
  p.forEach(function (r) {
    var s = shopById(r.shop_id);
    h += '<div class="shopc"><div class="n">' + esc(s ? s.name : "?") + '</div><div class="m">' + tx("asks", { n: r.months }) + " · " + fmt(String(r.created_at).slice(0, 10)) + "</div>" +
      '<div class="row"><select id="c_' + r.id + '">' + opts([1, 2, 3, 6, 12]) + '</select>' +
      '<button class="small" type="button" data-a="ok" data-id="' + r.id + '" data-m="' + r.months + '">' + tx("confirm") + "</button>" +
      '<button class="small" type="button" data-a="no" data-id="' + r.id + '">' + tx("reject") + "</button></div></div>";
  });
  var done = S.reqs.filter(function (r) { return r.status !== "pending"; }).slice(0, 10);
  if (done.length) {
    h += "<h3>" + tx("history") + "</h3>";
    done.forEach(function (r) {
      var s = shopById(r.shop_id);
      h += '<div class="shopc"><div class="n">' + esc(s ? s.name : "?") + '</div><div class="m">' +
        (r.status === "confirmed" ? tx("hConf") + " · " + (r.confirmed_months || r.months) + " " + tx("months") : tx("hRej")) + " · " + fmt(String(r.created_at).slice(0, 10)) + "</div></div>";
    });
  }
  h += "<h3>" + tx("numbers") + '</h3><p class="sub">' + tx("numHelp") + "</p>";
  if (!S.nums.length) { h += '<p class="sub">' + tx("noNums") + "</p>"; }
  S.nums.forEach(function (n) {
    h += '<div class="shopc"><div class="n">' + esc(n.operator) + " : " + esc(n.number) + '</div><div class="m">' + esc(n.holder) + "</div>" +
      '<div class="row"><button class="small" type="button" data-a="delnum" data-id="' + n.id + '">' + tx("del") + "</button></div></div>";
  });
  h += '<label class="lb" for="nOp">' + tx("nOp") + '</label><input id="nOp">' +
    '<label class="lb" for="nNum">' + tx("nNum") + '</label><input id="nNum" inputmode="tel">' +
    '<label class="lb" for="nHolder">' + tx("nHolder") + '</label><input id="nHolder">' +
    '<button class="main" type="button" data-a="addnum">' + tx("add") + "</button>";
  h += "<h3>" + tx("price") + '</h3><p class="sub">' + tx("priceHelp") + '</p><input id="pPrice" value="' + esc(S.price) + '">' +
    '<button class="main" type="button" data-a="price">' + tx("save") + "</button>";
  return h + logoutBtn();
}
function vShops() {
  var h = "<h2>" + tx("oShops") + "</h2>";
  if (!S.shops.length) { h += '<p class="sub">' + tx("noShops") + "</p>"; }
  S.shops.forEach(function (s) {
    h += '<div class="shopc"><div class="n">' + esc(s.name) + '</div><div class="m">' + esc(s.email || "") + "</div>" +
      '<div class="m">' + tx("colEnd") + " : " + fmt(s.subscription_end) + "</div><div>" + etat(s) + "</div>" +
      '<div class="row"><button class="small" type="button" data-a="blk" data-id="' + s.id + '">' + (s.status === "blocked" ? tx("unblock") : tx("block")) + "</button>" +
      '<button class="small" type="button" data-a="del" data-id="' + s.id + '">' + tx("del") + "</button></div></div>";
  });
  return h + logoutBtn();
}
function renderOwner() {
  var f = { home: vHome, abo: vAbo, pay: vPay, shops: vShops };
  $x("own").innerHTML = f[view]();
  bar();
}

/* ---------- Boutique : abonnement ---------- */
async function renderAbo(c) {
  var r = await db.from("shops").select("id,name,status,subscription_end").limit(1);
  if (r.error || !r.data || !r.data.length) { c.innerHTML = '<p class="sub">' + esc(r.error ? r.error.message : "") + "</p>"; return; }
  var sh = r.data[0], d = daysLeft(sh.subscription_end);
  var nums = await db.from("payment_numbers").select("*").order("created_at");
  var pr = await db.from("app_settings").select("v").eq("k", "price_text").maybeSingle();
  var rq = await db.from("payment_requests").select("id").eq("shop_id", sh.id).eq("status", "pending");
  var h = "<h3>" + tx("aboTitle") + "</h3>";
  h += '<div class="shopc"><div class="' + (d < 0 ? "tag-bad" : "tag-ok") + '">' +
    (d < 0 ? tx("expiredSince") + " " + fmt(sh.subscription_end) : tx("until") + " " + fmt(sh.subscription_end) + " (" + d + " " + tx("left") + ")") + "</div></div>";
  if (pr.data && pr.data.v) { h += '<p class="sub"><b>' + esc(pr.data.v) + "</b></p>"; }
  h += "<h3>" + tx("howTitle") + '</h3><p class="sub">' + tx("how1") + "<br>" + tx("how2") + "<br>" + tx("how3") + "</p>";
  var list = nums.data || [];
  if (!list.length) { h += '<p class="sub">' + tx("noNumsShop") + "</p>"; }
  list.forEach(function (n) {
    h += '<div class="shopc"><div class="n">' + esc(n.operator) + " : " + esc(n.number) + '</div><div class="m">' + esc(n.holder) + "</div></div>";
  });
  if (rq.data && rq.data.length) { h += '<div class="alerte">' + tx("waiting") + "</div>"; }
  else if (list.length) {
    h += '<label class="lb" for="aboM">' + tx("duration") + '</label><select id="aboM" class="champ">' + opts([1, 2, 3]) + "</select>" +
      '<button class="main" type="button" data-a="ask">' + tx("paid") + "</button>";
  }
  c.innerHTML = h;
}
function showGate(sh) {
  var g = $x("gate");
  if (sh.status !== "active") {
    g.innerHTML = "<h2>" + tx("blockedTitle") + '</h2><p class="sub">' + tx("blockedText") + "</p>" +
      '<button class="main" type="button" data-a="refresh">' + tx("refresh") + "</button>" + logoutBtn();
  } else {
    g.innerHTML = "<h2>" + tx("expTitle") + '</h2><p class="sub">' + tx("expText") + '</p><div id="gateAbo"></div>' +
      '<button class="link" type="button" data-a="refresh">' + tx("refresh") + "</button>" + logoutBtn();
    renderAbo($x("gateAbo"));
  }
  g.classList.remove("hidden");
}

/* ---------- Écrans ---------- */
var SCREENS = ["auth", "insc", "creer", "bienvenue", "app", "admin", "own", "gate"];
function hideAll() {
  SCREENS.forEach(function (i) { var e = $x(i); if (e) { e.classList.add("hidden"); } });
  $x("ownBar").classList.add("hidden");
  document.body.classList.remove("hasbar");
  clearInterval(timer);
}
function enforce() {
  if (MODE === "own" || MODE === "gate") {
    ["auth", "insc", "creer", "bienvenue", "app", "admin"].forEach(function (i) { $x(i).classList.add("hidden"); });
  }
}
async function showOwner() {
  MODE = "own";
  hideAll();
  $x("own").classList.remove("hidden");
  $x("ownBar").classList.remove("hidden");
  document.body.classList.add("hasbar");
  await chargerTout();
  lastPending = pendingList().length;
  renderOwner();
  timer = setInterval(async function () {
    if (document.hidden) { return; }
    await chargerReqs();
    var n = pendingList().length;
    if (n > lastPending && navigator.vibrate) { try { navigator.vibrate([200, 100, 200]); } catch (e) {} }
    var typing = document.activeElement && /INPUT|SELECT/.test(document.activeElement.tagName);
    if (n !== lastPending && !typing) { await chargerTout(); renderOwner(); } else { bar(); }
    lastPending = n;
  }, 30000);
}

var baseAfficher = afficher;
afficher = async function () {
  MODE = "none";
  hideAll();
  var s = (await db.auth.getSession()).data.session;
  if (!s) { await baseAfficher(); return; }
  var a = await db.rpc("is_admin");
  if (a.data === true) { await showOwner(); enforce(); setTimeout(enforce, 1500); return; }
  var r = await db.from("shops").select("id,name,status,subscription_end").eq("owner_id", s.user.id).limit(1);
  if (r.error || !r.data || !r.data.length) { await baseAfficher(); return; }
  var sh = r.data[0], d = daysLeft(sh.subscription_end);
  if (sh.status !== "active" || d < 0) { MODE = "gate"; showGate(sh); enforce(); setTimeout(enforce, 1500); return; }
  await baseAfficher();
  $x("aboBanner").innerHTML = d <= 7 ? '<div class="alerte">' + tx("warn7", { n: d }) + "</div>" : "";
};

onglet = function (id) {
  var map = { pProd: "tProd", pDet: "tDet", pVen: "tVen", pAbo: "tAbo" };
  Object.keys(map).forEach(function (p) {
    $x(p).classList.toggle("hidden", p !== id);
    $x(map[p]).classList.toggle("on", p === id);
  });
  if (id === "pAbo") { renderAbo($x("pAbo")); }
};

/* ---------- Boutons ---------- */
async function run(name, args) {
  var r = await db.rpc(name, args);
  if (r.error) { msg(r.error.message); return false; }
  return true;
}
async function refreshOwner() { await chargerTout(); lastPending = pendingList().length; renderOwner(); }

document.addEventListener("click", async function (e) {
  var b = e.target.closest("[data-a]");
  if (!b) { return; }
  var a = b.dataset.a, id = b.dataset.id;
  msg("");
  if (a === "nav") { view = b.dataset.v; renderOwner(); window.scrollTo(0, 0); }
  else if (a === "out") { sortir(); }
  else if (a === "refresh") { afficher(); }
  else if (a === "ext") {
    var n = parseInt($x("m_" + id).value, 10);
    if (confirm(tx("confirmExt", { n: n })) && await run("extend_shop", { p_shop: id, p_months: n })) { await refreshOwner(); }
  }
  else if (a === "ok") {
    var m = parseInt($x("c_" + id).value, 10);
    if (confirm(tx("confirmPay", { n: m })) && await run("confirm_payment", { p_id: id, p_months: m })) { await refreshOwner(); }
  }
  else if (a === "no") {
    if (confirm(tx("confirmRej")) && await run("reject_payment", { p_id: id })) { await refreshOwner(); }
  }
  else if (a === "blk") {
    var s = shopById(id), bl = s && s.status === "blocked";
    if (confirm(bl ? tx("confirmUnblock") : tx("confirmBlock")) && await run("set_shop_status", { p_shop: id, p_status: bl ? "active" : "blocked" })) { await refreshOwner(); }
  }
  else if (a === "del") {
    if (confirm(tx("confirmDel")) && confirm(tx("confirmDel2")) && await run("delete_shop", { p_shop: id })) { await refreshOwner(); }
  }
  else if (a === "addnum") {
    var op = $x("nOp").value.trim(), nu = $x("nNum").value.trim(), ho = $x("nHolder").value.trim();
    if (!op || !nu || !ho) { return msg(tx("needAll")); }
    var r = await db.from("payment_numbers").insert({ operator: op, number: nu, holder: ho });
    if (r.error) { return msg(r.error.message); }
    await refreshOwner();
  }
  else if (a === "delnum") {
    var r2 = await db.from("payment_numbers").delete().eq("id", id);
    if (r2.error) { return msg(r2.error.message); }
    await refreshOwner();
  }
  else if (a === "price") {
    var r3 = await db.from("app_settings").upsert({ k: "price_text", v: $x("pPrice").value.trim() });
    if (r3.error) { return msg(r3.error.message); }
    await refreshOwner();
  }
  else if (a === "ask") {
    var mm = parseInt($x("aboM").value, 10);
    if (await run("ask_payment", { p_months: mm })) { renderAbo(b.closest("#gateAbo,#pAbo")); }
  }
});

langue(L);
afficher();
})();
(function () {
  var st = document.createElement("style");
  st.textContent = ".logosvg{display:block;line-height:0}.lgn{fill:#0d2a6b}:root[data-theme=\"dark\"] .lgn{fill:#eef2fa}";
  document.head.appendChild(st);
  var defs = '<defs><linearGradient id="gB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a2a8a"/><stop offset=".6" stop-color="#1e63d6"/><stop offset="1" stop-color="#29b6ff"/></linearGradient><linearGradient id="gO" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff7a1a"/><stop offset="1" stop-color="#ffb52e"/></linearGradient></defs>';
  var dd = '<path fill-rule="evenodd" fill="url(#gB)" d="M6 8H52C88 8 108 30 108 54S88 98 52 98H6ZM28 30H50C64 30 76 40 76 54S64 78 50 78H28Z"/>';
  var sw = '<path fill="url(#gO)" d="M2 70C42 46 92 56 130 42C102 76 40 88 2 70Z"/>';
  var bars = '<rect x="36" y="58" width="8" height="14" rx="2" fill="url(#gO)"/><rect x="48" y="50" width="8" height="22" rx="2" fill="url(#gO)"/><rect x="60" y="42" width="8" height="30" rx="2" fill="url(#gO)"/>';
  var ff = 'font-family="system-ui,Segoe UI,Roboto,sans-serif"';
  var svg = '<svg viewBox="0 0 330 104" height="60" role="img" aria-label="Dukyo">' + defs + dd + sw + bars +
    '<text x="124" y="72" font-size="58" font-weight="800" ' + ff + ' class="lgn">Duk<tspan fill="#f08a1e">y</tspan>o</text>' +
    '<text x="126" y="95" font-size="12" font-style="italic" font-weight="600" ' + ff + ' class="lgn">Gérez mieux. Développez plus.</text></svg>';
  var box = document.createElement("div");
  box.className = "logosvg";
  box.innerHTML = svg;
  var old = document.querySelector(".logoimg, h1.logo");
  if (old) { old.replaceWith(box); }
  var sl = document.querySelector('.card > p.sub[data-t="slogan"]');
  if (sl) { sl.style.display = "none"; }
  document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]').forEach(function (l) { l.remove(); });
  var fav = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114 106"><path fill-rule="evenodd" fill="#1e63d6" d="M6 8H52C88 8 108 30 108 54S88 98 52 98H6ZM28 30H50C64 30 76 40 76 54S64 78 50 78H28Z"/><path fill="#ff8a1e" d="M2 70C42 46 92 56 130 42C102 76 40 88 2 70Z"/></svg>';
  var l = document.createElement("link");
  l.rel = "icon";
  l.href = "data:image/svg+xml," + encodeURIComponent(fav);
  document.head.appendChild(l);
})();
(function () {
  var st = document.createElement("style");
  st.textContent = [
    "body{padding:0!important;display:block!important}",
    ".card{max-width:520px!important;margin:0 auto!important;min-height:100vh;border-radius:0!important;border-top:0;padding:16px 18px 28px}",
    "body.hasbar{padding-bottom:0!important}",
    "body.hasbar .card{padding-bottom:104px}",
    ".logoimg{height:52px;width:auto;display:block;mix-blend-mode:multiply}",
    ":root[data-theme=\"dark\"] .logoimg{background:#fff;border-radius:12px;padding:4px;mix-blend-mode:normal}"
  ].join("\n");
  document.head.appendChild(st);
  var h = document.querySelector("h1.logo");
  if (h) {
    var im = new Image();
    im.alt = "Dukyo"; im.className = "logoimg";
    im.onload = function () {
      h.replaceWith(im);
      var sl = document.querySelector('.card > p.sub[data-t="slogan"]');
      if (sl) { sl.style.display = "none"; }
    };
    im.src = "logo.png";
  }
  ["icon", "apple-touch-icon"].forEach(function (r) {
    var l = document.createElement("link"); l.rel = r; l.href = "icon.png"; document.head.appendChild(l);
  });
})();
(function () {
  var st = document.createElement("style");
  st.textContent = ".logosvg{display:block;line-height:0}.lgn{fill:#0d2a6b}:root[data-theme=\"dark\"] .lgn{fill:#eef2fa}";
  document.head.appendChild(st);
  var defs = '<defs><linearGradient id="gB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a2a8a"/><stop offset=".6" stop-color="#1e63d6"/><stop offset="1" stop-color="#29b6ff"/></linearGradient><linearGradient id="gO" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff7a1a"/><stop offset="1" stop-color="#ffb52e"/></linearGradient></defs>';
  var dd = '<path fill-rule="evenodd" fill="url(#gB)" d="M6 8H52C88 8 108 30 108 54S88 98 52 98H6ZM28 30H50C64 30 76 40 76 54S64 78 50 78H28Z"/>';
  var sw = '<path fill="url(#gO)" d="M2 70C42 46 92 56 130 42C102 76 40 88 2 70Z"/>';
  var bars = '<rect x="36" y="58" width="8" height="14" rx="2" fill="url(#gO)"/><rect x="48" y="50" width="8" height="22" rx="2" fill="url(#gO)"/><rect x="60" y="42" width="8" height="30" rx="2" fill="url(#gO)"/>';
  var ff = 'font-family="system-ui,Segoe UI,Roboto,sans-serif"';
  var svg = '<svg viewBox="0 0 330 104" height="60" role="img" aria-label="Dukyo">' + defs + dd + sw + bars +
    '<text x="124" y="72" font-size="58" font-weight="800" ' + ff + ' class="lgn">Duk<tspan fill="#f08a1e">y</tspan>o</text>' +
    '<text x="126" y="95" font-size="12" font-style="italic" font-weight="600" ' + ff + ' class="lgn">Gérez mieux. Développez plus.</text></svg>';
  var box = document.createElement("div");
  box.className = "logosvg";
  box.innerHTML = svg;
  var old = document.querySelector(".logoimg, h1.logo");
  if (old) { old.replaceWith(box); }
  var sl = document.querySelector('.card > p.sub[data-t="slogan"]');
  if (sl) { sl.style.display = "none"; }
  document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]').forEach(function (l) { l.remove(); });
  var fav = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114 106"><path fill-rule="evenodd" fill="#1e63d6" d="M6 8H52C88 8 108 30 108 54S88 98 52 98H6ZM28 30H50C64 30 76 40 76 54S64 78 50 78H28Z"/><path fill="#ff8a1e" d="M2 70C42 46 92 56 130 42C102 76 40 88 2 70Z"/></svg>';
  var l = document.createElement("link");
  l.rel = "icon";
  l.href = "data:image/svg+xml," + encodeURIComponent(fav);
  document.head.appendChild(l);
})();
