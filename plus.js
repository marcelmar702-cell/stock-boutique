(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };
if (typeof db === "undefined") { return; }

var st = document.createElement("style");
st.textContent = [
".sheet{position:fixed;inset:0;z-index:80;overflow-y:auto;background:var(--bg);-webkit-overflow-scrolling:touch}",
".sheet.hidden{display:none}",
".sheetin{max-width:480px;margin:0 auto;padding:12px 16px 48px}",
".sheetbar{display:flex;align-items:center;gap:10px;position:sticky;top:0;background:var(--bg);padding:10px 0;z-index:1}",
".sheetbar b{font-size:18px}.sheetbar button{margin:0!important;font-size:18px}",
".legal h4{margin:16px 0 4px;font-size:15px}",
".legal p{margin:0 0 8px;font-size:14px;line-height:1.55}",
".alink{display:block;text-align:center;text-decoration:none;margin-top:12px;padding:13px;border-radius:11px;font-size:16px;font-weight:700;color:#fff;background:#1f9d6b}",
".alink.b{background:linear-gradient(135deg,var(--accent),#1f9d6b)}",
".avbig{font-size:64px;text-align:center;line-height:1.2}",
".avgrid{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-top:10px}",
".avgrid button{margin:0;padding:8px 0;font-size:24px;background:var(--field);border:1px solid var(--border);border-radius:12px;color:var(--text)}",
".avgrid button.on,.rate button.on{border-color:var(--accent);box-shadow:0 0 0 3px rgba(var(--glow),.25)}",
".rate{display:flex;gap:8px;margin-top:10px}",
".rate button{flex:1;margin:0;padding:12px 4px;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:13px;font-weight:600;background:var(--field);border:1px solid var(--border);border-radius:14px;color:var(--text)}",
".rate button b{font-size:34px;line-height:1}",
"textarea.champ{width:100%;padding:12px;font-size:16px;border-radius:11px;border:1px solid var(--border);background:var(--field);color:var(--text);font-family:inherit}",
"#btn-profile .av{font-size:22px;line-height:1}",
".chk{display:flex;gap:10px;align-items:flex-start;margin-top:14px;font-size:13px;color:var(--muted);line-height:1.4}",
".chk input{width:22px;height:22px;flex:none;margin:0;padding:0}",
".chk a,.lglinks a{color:var(--accent);text-decoration:underline;cursor:pointer}",
".lglinks{margin-top:14px;text-align:center;font-size:13px;color:var(--muted)}.lglinks a{margin:0 6px}",
".nres{font-size:13px;margin-top:8px;min-height:18px}"
].join("\n");
document.head.appendChild(st);

var TX = {
fr: {
mxProfile:"Mon profil", mxSupport:"Support", mxFeedback:"Donner mon avis", mxPrivacy:"Confidentialité", mxTerms:"Conditions d’utilisation",
mxSettings:"Réglages du support", mxFbList:"Avis reçus", back:"←",
pfHelp:"Choisis l’image de ta boutique. Elle apparaît en haut à droite.",
spHelp:"Un problème ? Écris-nous sur WhatsApp. Le nom de ta boutique est déjà dans le message.",
spNone:"Le support n’est pas encore configuré.", spChannel:"Rejoindre la chaîne WhatsApp",
spMsg:"Bonjour Dukyo, je suis la boutique {n}. J’ai un problème : ", spWa:"WhatsApp : ",
fbHelp:"Que penses-tu de Dukyo ?", fbSuper:"Super", fbOk:"Pas mal", fbBad:"Pas vraiment bien",
fbComment:"Un commentaire ? (facultatif)", fbSend:"Envoyer", fbThanks:"Merci pour ton avis ! 💙", fbPick:"Choisis un visage.",
osHelp:"Ajoute les numéros WhatsApp que les boutiques peuvent contacter. Écris le numéro avec l’indicatif (243…) ou en commençant par 0.",
osLabel:"Nom (exemple : Support)", osNum:"Numéro WhatsApp", osAdd:"Ajouter", osList:"Numéros du support", osNoneL:"Aucun numéro pour l’instant.",
osChan:"Lien de ta chaîne ou de ton groupe WhatsApp", osChanHelp:"Facultatif. Je te conseille une chaîne pour tes annonces.",
osSave:"Enregistrer le lien", osSaved:"Enregistré ✓", osDel:"Supprimer", osBad:"Écris un nom et un numéro valide.", osBadLink:"Le lien doit commencer par https://",
ofNone:"Aucun avis pour l’instant.",
tcAccept:"J’accepte les {t} et la {p}", tcTerms:"conditions d’utilisation", tcPrivacy:"politique de confidentialité",
tcNeed:"Tu dois accepter les conditions pour créer ton compte.",
lgAsk:"Pour voir, corriger ou supprimer tes données : utilise la page Support de l’application."
},
sw: {
mxProfile:"Profil yangu", mxSupport:"Support", mxFeedback:"Toa maoni yangu", mxPrivacy:"Confidentialité", mxTerms:"Conditions d’utilisation",
mxSettings:"Réglages za support", mxFbList:"Maoni yaliyopokelewa", back:"←",
pfHelp:"Chagua picha ya boutique yako. Inaonekana juu kulia.",
spHelp:"Una shida ? Tuandikie kwenye WhatsApp. Jina ya boutique yako liko tayari kwenye message.",
spNone:"Support haijawekwa bado.", spChannel:"Jiunge na chaîne ya WhatsApp",
spMsg:"Habari Dukyo, mimi ni boutique {n}. Nina shida : ", spWa:"WhatsApp : ",
fbHelp:"Unaonaje Dukyo ?", fbSuper:"Super", fbOk:"Si mbaya", fbBad:"Si nzuri sana",
fbComment:"Maoni ? (si lazima)", fbSend:"Tuma", fbThanks:"Asante kwa maoni yako ! 💙", fbPick:"Chagua uso.",
osHelp:"Ongeza numéros za WhatsApp ambazo boutiques zinaweza kuwasiliana. Andika numéro na indicatif (243…) au anza na 0.",
osLabel:"Jina (mfano : Support)", osNum:"Numéro ya WhatsApp", osAdd:"Ongeza", osList:"Numéros za support", osNoneL:"Hakuna numéro bado.",
osChan:"Lien ya chaîne au groupe yako ya WhatsApp", osChanHelp:"Si lazima. Nakushauri chaîne kwa annonces zako.",
osSave:"Hifadhi lien", osSaved:"Imehifadhiwa ✓", osDel:"Futa", osBad:"Andika jina na numéro sahihi.", osBadLink:"Lien lazima ianze na https://",
ofNone:"Hakuna maoni bado.",
tcAccept:"Nakubali {t} na {p}", tcTerms:"conditions d’utilisation", tcPrivacy:"politique ya confidentialité",
tcNeed:"Lazima ukubali conditions ili kufungua compte yako.",
lgAsk:"Kuona, kurekebisha au kufuta données zako : tumia ukurasa wa Support kwenye application."
}};
function X(k, v) {
  var s = (TX[L] && TX[L][k]) || TX.fr[k] || k;
  if (v) { for (var i in v) { s = s.replace("{" + i + "}", v[i]); } }
  return s;
}

/* ---------- Textes légaux (projet à faire relire par un juriste) ---------- */
var LEGAL = {
fr: {
privacy: { title:"Confidentialité", date:"Version du 13/11/2026", items:[
["1. Qui nous sommes","Dukyo est une plateforme de gestion pour boutiques (stock, ventes, dettes, abonnement), éditée en République démocratique du Congo."],
["2. Les données que nous gardons","Ton email et ton mot de passe (le mot de passe est protégé : personne ne peut le lire) ; le nom de ta boutique ; les produits, prix, stocks, ventes, dettes et noms de clients que tu écris ; l’image de profil que tu choisis ; ton avis ; la date où tu as accepté les conditions."],
["3. À quoi elles servent","À faire marcher l’application, à t’envoyer des alertes (produits qui expirent, dettes, abonnement) et à gérer ton abonnement et tes paiements. Pour l’abonnement, nous voyons le nom de ta boutique, ton email, l’état de ton abonnement et tes demandes de paiement."],
["4. Tes données de gestion","Dans l’application, l’équipe Dukyo ne voit pas tes produits, tes ventes ni tes dettes. Nous ne les consultons pas, sauf pour réparer un problème technique, à ta demande, ou si la loi l’exige."],
["5. Les noms de tes clients","Les noms et montants de ton cahier de dettes concernent des personnes qui ne sont pas sur Dukyo. Tu es responsable de les enregistrer de façon honnête et utile à ton commerce. Dukyo les garde seulement pour toi."],
["6. Avec qui c’est partagé","Nous ne vendons aucune donnée. Pour fonctionner, nous utilisons : un hébergeur de base de données (Supabase, serveurs en Europe), un hébergeur du site (GitHub Pages) et un service d’alertes (ntfy.sh). Les alertes contiennent le nom de ta boutique, des noms de produits et des chiffres, jamais ton mot de passe."],
["7. Combien de temps","Tant que ton compte existe. Quand ta boutique est supprimée, ses données sont effacées."],
["8. Sécurité","La connexion est chiffrée et chaque boutique n’accède qu’à ses propres données. Aucun système n’est parfait : garde ton mot de passe secret."],
["9. Tes droits","Tu peux demander à voir, corriger, récupérer ou supprimer tes données."],
["10. Changements","Nous pouvons mettre ce texte à jour. La date en haut indique la dernière version."]]},
terms: { title:"Conditions d’utilisation", date:"Version du 13/11/2026", items:[
["1. Objet","Dukyo est un outil pour suivre le stock, les dates d’expiration, les ventes et les dettes d’une boutique."],
["2. Ton compte","Donne des informations exactes. Un compte correspond à une boutique. Tu es responsable de ton mot de passe et de tout ce qui est fait avec ton compte."],
["3. Abonnement et essai","Une nouvelle boutique bénéficie d’un essai gratuit de 14 jours. Ensuite l’abonnement est payant, au prix affiché dans l’application. Il se paie à l’avance par mobile money, aux numéros indiqués dans l’application."],
["4. Confirmation des paiements","Toucher « J’ai déjà payé » envoie seulement une demande. L’abonnement est prolongé uniquement après vérification et confirmation par Dukyo. Une fausse déclaration de paiement peut entraîner le blocage du compte."],
["5. Fin d’abonnement ou blocage","Quand l’abonnement se termine ou que le compte est bloqué, l’accès est fermé. Tes données restent enregistrées et tu retrouves ton accès après paiement."],
["6. Remboursement","Un paiement confirmé n’est pas remboursable, sauf erreur de Dukyo."],
["7. Bon usage","Pas d’usage illégal, pas d’essai d’accéder aux données d’une autre boutique, pas de perturbation du service."],
["8. Limites de responsabilité","Dukyo t’aide à suivre ton commerce, mais les alertes peuvent arriver en retard ou ne pas arriver (téléphone, réseau, réglages). Tu restes responsable de vérifier tes produits, tes dates et tes décisions. Dukyo n’est pas responsable des pertes liées à des produits expirés, à des erreurs de saisie ou à une coupure du service, qui est fourni tel quel."],
["9. Fin du compte","Tu peux demander la suppression de ton compte. Dukyo peut bloquer ou supprimer un compte qui ne respecte pas ces conditions."],
["10. Changements et droit applicable","Ces conditions peuvent évoluir ; la date en haut indique la dernière version. Elles sont régies par le droit de la République démocratique du Congo."]]}
},
sw: {
privacy: { title:"Confidentialité", date:"Version ya 13/11/2026. Toleo la Kifaransa ndilo linalotumika kisheria.", items:[
["1. Sisi ni nani","Dukyo ni plateforme ya kusimamia boutiques (stock, ventes, dettes, abonnement), iliyotengenezwa nchini RDC."],
["2. Données tunazohifadhi","Email yako na mot de passe (mot de passe inalindwa : hakuna anayeweza kuisoma) ; jina ya boutique ; produits, bei, stock, ventes, dettes na majina ya clients unaoandika ; picha ya profil unayochagua ; maoni yako ; tarehe ya kukubali conditions."],
["3. Zinatumikaje","Kuendesha application, kukutumia alertes (produits zinazoisha, dettes, abonnement) na kusimamia abonnement na paiements zako. Kwa abonnement, tunaona jina ya boutique, email, hali ya abonnement na maombi ya paiement."],
["4. Données zako za gestion","Ndani ya application, timu ya Dukyo haioni produits, ventes wala dettes zako. Hatuzitazami, isipokuwa kutengeneza shida ya technique, ukituomba, au sheria ikitaka."],
["5. Majina ya clients wako","Majina na kiasi kwenye cahier ya dettes ni ya watu ambao hawako kwenye Dukyo. Wewe unawajibika kuyaandika kwa uaminifu. Dukyo inayahifadhi kwa ajili yako tu."],
["6. Tunashirikiana na nani","Hatuuzi données. Tunatumia : hébergeur ya base de données (Supabase, serveurs za Ulaya), hébergeur ya site (GitHub Pages) na huduma ya alertes (ntfy.sh). Alertes zina jina ya boutique, majina ya produits na nombres, kamwe mot de passe."],
["7. Kwa muda gani","Mradi compte yako ipo. Boutique ikifutwa, données zake zinafutwa."],
["8. Sécurité","Connexion imesimbwa na kila boutique inaona données zake tu. Hakuna système kamilifu : weka mot de passe yako siri."],
["9. Haki zako","Unaweza kuomba kuona, kurekebisha, kupata au kufuta données zako."],
["10. Mabadiliko","Tunaweza kubadilisha maandishi haya. Tarehe ya juu inaonyesha toleo la mwisho."]]},
terms: { title:"Conditions d’utilisation", date:"Version ya 13/11/2026. Toleo la Kifaransa ndilo linalotumika kisheria.", items:[
["1. Kusudi","Dukyo ni zana ya kufuatilia stock, dates za expiration, ventes na dettes za boutique."],
["2. Compte yako","Toa taarifa sahihi. Compte moja ni boutique moja. Wewe unawajibika kwa mot de passe yako na kila kitu kinachofanywa na compte yako."],
["3. Abonnement na essai","Boutique mpya ina essai ya bure ya siku 14. Baadaye abonnement ni ya kulipa, kwa bei inayoonekana kwenye application. Inalipwa mapema kwa mobile money, kwenye numéros zilizoandikwa kwenye application."],
["4. Confirmation ya paiements","Kubonyeza « Nimeshalipa » kunatuma ombi tu. Abonnement inaongezwa tu baada ya Dukyo kuangalia na kuconfirmer. Kusema uongo kuhusu paiement kunaweza kusababisha compte kubloqué."],
["5. Mwisho wa abonnement au blocage","Abonnement ikiisha au compte ikibloqué, huwezi kuingia. Données zako zinabaki na unarudi baada ya kulipa."],
["6. Remboursement","Paiement iliyoconfirmé hairudishwi, isipokuwa kosa la Dukyo."],
["7. Matumizi mazuri","Hakuna matumizi haramu, hakuna kujaribu kuingia kwenye données za boutique nyingine, hakuna kuvuruga huduma."],
["8. Mipaka ya uwajibikaji","Dukyo inakusaidia kufuatilia biashara yako, lakini alertes zinaweza kuchelewa au zisifike (simu, réseau, réglages). Wewe unabaki kuwajibika kuangalia produits, dates na maamuzi yako. Dukyo haiwajibiki kwa hasara za produits zilizoisha, makosa ya kuandika au kukatika kwa huduma, inayotolewa kama ilivyo."],
["9. Mwisho wa compte","Unaweza kuomba compte yako ifutwe. Dukyo inaweza kubloquer au kufuta compte isiyofuata conditions hizi."],
["10. Mabadiliko na sheria","Conditions zinaweza kubadilika ; tarehe ya juu inaonyesha toleo la mwisho. Zinafuata sheria ya RDC."]]}
}};

/* ---------- Page plein écran ---------- */
document.body.insertAdjacentHTML("beforeend",
  '<div id="sheet" class="sheet hidden"><div class="sheetin"><div class="sheetbar"><button id="sheetBack" class="small" type="button">←</button><b id="sheetTitle"></b></div><div id="sheetBody"></div></div></div>');
function openSheet(title, html) {
  $x("sheetTitle").textContent = title;
  $x("sheetBody").innerHTML = html;
  $x("sheet").classList.remove("hidden");
  $x("sheet").scrollTop = 0;
}
function setBody(html) { $x("sheetBody").innerHTML = html; }
function closeSheet() { $x("sheet").classList.add("hidden"); }
$x("sheetBack").addEventListener("click", closeSheet);

function legal(k) {
  var d = LEGAL[L === "sw" ? "sw" : "fr"][k];
  if (!d) { return; }
  var h = '<div class="legal"><p class="hint">' + d.date + "</p>";
  d.items.forEach(function (it) { h += "<h4>" + it[0] + "</h4><p>" + it[1] + "</p>"; });
  h += '<p class="hint" style="margin-top:16px">' + X("lgAsk") + "</p></div>";
  openSheet(d.title, h);
}

/* ---------- Profil de boutique : petit animal ---------- */
var EMO = ["🐱","🐶","🦊","🐼","🐨","🐯","🦁","🐸","🐵","🐰","🐻","🐷","🐮","🐔","🐧","🦉","🦄","🐢","🐙","🦋","🐝","🐞","🐬","🦒"];
function autoAv(id) {
  var h = 0;
  for (var i = 0; i < id.length; i++) { h = (h * 31 + id.charCodeAt(i)) % 9973; }
  return EMO[h % EMO.length];
}
function avOf(s) { return s.avatar || autoAv(s.id); }
async function shopInfo() {
  var r = await db.from("shops").select("id,name,avatar").limit(1);
  return (r.data && r.data[0]) || null;
}
async function pageProfile() {
  openSheet(X("mxProfile"), '<p class="hint">…</p>');
  var s = await shopInfo();
  if (!s) { return; }
  var cur = avOf(s);
  setBody('<div class="avbig" id="avbig">' + cur + '</div><p class="hint" style="text-align:center">' + X("pfHelp") + '</p><div class="avgrid">' +
    EMO.map(function (e) { return '<button type="button" data-xp="av" data-v="' + e + '" class="' + (e === cur ? "on" : "") + '">' + e + "</button>"; }).join("") + "</div>" +
    '<div class="nres" id="pfRes"></div>');
  window.__shopId = s.id;
}
async function paintAvatar() {
  var b = $x("btn-profile");
  if (!b) { return; }
  var s = null;
  try { s = await shopInfo(); } catch (e) { s = null; }
  if (s) { b.innerHTML = '<span class="av">' + esc(avOf(s)) + "</span>"; b.dataset.av = "1"; }
  else if (b.dataset.av) { b.innerHTML = ORIG; delete b.dataset.av; }
}
var ORIG = $x("btn-profile") ? $x("btn-profile").innerHTML : "";

/* ---------- Support WhatsApp ---------- */
function normNum(s) {
  var d = String(s).replace(/\D/g, "");
  if (d.indexOf("00") === 0) { d = d.slice(2); } else if (d.charAt(0) === "0") { d = "243" + d.slice(1); }
  return d;
}
async function getSettings() {
  var r = await db.from("app_settings").select("k,v").in("k", ["support_contacts", "support_channel"]);
  var o = { contacts: [], channel: "" };
  (r.data || []).forEach(function (x) {
    if (x.k === "support_contacts") { try { var a = JSON.parse(x.v); if (Array.isArray(a)) { o.contacts = a; } } catch (e) {} }
    if (x.k === "support_channel") { o.channel = x.v || ""; }
  });
  return o;
}
function saveKey(k, v) { return db.from("app_settings").upsert({ k: k, v: v }); }

async function pageSupport() {
  openSheet(X("mxSupport"), '<p class="hint">…</p>');
  var s = await shopInfo(), cfg = await getSettings();
  var name = s ? s.name : "";
  var h = '<p class="hint">' + X("spHelp") + "</p>";
  cfg.contacts.forEach(function (c) {
    h += '<a class="alink" target="_blank" rel="noopener" href="https://wa.me/' + esc(c.num) + "?text=" + encodeURIComponent(X("spMsg", { n: name })) + '">' + X("spWa") + esc(c.label) + "</a>";
  });
  if (/^https:\/\//i.test(cfg.channel)) {
    h += '<a class="alink b" target="_blank" rel="noopener" href="' + esc(cfg.channel) + '">' + X("spChannel") + "</a>";
  }
  if (!cfg.contacts.length && !cfg.channel) { h += '<p class="hint">' + X("spNone") + "</p>"; }
  setBody(h);
}
async function pageOwnerSettings() {
  openSheet(X("mxSettings"), '<p class="hint">…</p>');
  var cfg = await getSettings();
  var h = '<p class="hint">' + X("osHelp") + "</p><h3>" + X("osList") + "</h3>";
  if (!cfg.contacts.length) { h += '<p class="hint">' + X("osNoneL") + "</p>"; }
  cfg.contacts.forEach(function (c, i) {
    h += '<div class="ligne"><span>' + esc(c.label) + " : +" + esc(c.num) + '</span><button class="small" type="button" data-xp="delc" data-v="' + i + '">' + X("osDel") + "</button></div>";
  });
  h += '<label class="lb" for="osL">' + X("osLabel") + '</label><input id="osL">' +
    '<label class="lb" for="osN">' + X("osNum") + '</label><input id="osN" inputmode="tel">' +
    '<button class="main" type="button" data-xp="addc">' + X("osAdd") + "</button>" +
    '<h3 style="margin-top:24px">' + X("osChan") + '</h3><p class="hint">' + X("osChanHelp") + "</p>" +
    '<input id="osC" placeholder="https://" value="' + esc(cfg.channel) + '">' +
    '<button class="main" type="button" data-xp="chan">' + X("osSave") + '</button><div class="nres" id="osRes"></div>';
  setBody(h);
}

/* ---------- Avis ---------- */
var fbSel = 0;
function rateBtn(n, emo, key, cur) {
  return '<button type="button" data-xp="rate" data-v="' + n + '" class="' + (cur === n ? "on" : "") + '"><b>' + emo + "</b>" + X(key) + "</button>";
}
async function pageFeedback() {
  openSheet(X("mxFeedback"), '<p class="hint">…</p>');
  var r = await db.from("feedback").select("rating,comment").limit(1);
  var row = r.data && r.data[0];
  fbSel = row ? row.rating : 0;
  setBody('<p class="hint">' + X("fbHelp") + '</p><div class="rate">' + rateBtn(3, "😍", "fbSuper", fbSel) + rateBtn(2, "🙂", "fbOk", fbSel) + rateBtn(1, "😕", "fbBad", fbSel) + "</div>" +
    '<label class="lb" for="fbCom">' + X("fbComment") + '</label><textarea id="fbCom" class="champ" rows="3" maxlength="500">' + esc(row && row.comment || "") + "</textarea>" +
    '<button class="main" type="button" data-xp="send">' + X("fbSend") + '</button><div class="nres" id="fbRes"></div>');
}
async function pageOwnerFeedback() {
  openSheet(X("mxFbList"), '<p class="hint">…</p>');
  var a = await db.from("feedback").select("*").order("updated_at", { ascending: false });
  var b = await db.rpc("owner_overview");
  var names = {};
  (b.data || []).forEach(function (s) { names[s.id] = s.name; });
  var rows = a.data || [];
  if (!rows.length) { return setBody('<p class="hint">' + X("ofNone") + "</p>"); }
  var c = { 3: 0, 2: 0, 1: 0 };
  rows.forEach(function (r) { c[r.rating]++; });
  var emo = { 3: "😍", 2: "🙂", 1: "😕" };
  var h = '<div class="stats"><div class="stat"><strong>😍 ' + c[3] + '</strong><span>' + X("fbSuper") + '</span></div><div class="stat"><strong>🙂 ' + c[2] + "</strong><span>" + X("fbOk") +
    '</span></div><div class="stat"><strong>😕 ' + c[1] + "</strong><span>" + X("fbBad") + "</span></div></div>";
  rows.forEach(function (r) {
    h += '<div class="ligne"><span>' + emo[r.rating] + " <b>" + esc(names[r.shop_id] || "?") + "</b>" +
      (r.comment ? "<br><small>" + esc(r.comment) + "</small>" : "") + "<br><small>" + String(r.updated_at).slice(0, 10).split("-").reverse().join("/") + "</small></span></div>";
  });
  setBody(h);
}

/* ---------- Menu profil : lignes en plus ---------- */
function extendMenu() {
  var pm = $x("pmenu");
  if (!pm || pm.classList.contains("hidden") || pm.querySelector("[data-xm]")) { return; }
  var mode = pm.dataset.mode, items;
  if (mode === "shop") { items = [["profile", "mxProfile"], ["support", "mxSupport"], ["feedback", "mxFeedback"], ["privacy", "mxPrivacy"], ["terms", "mxTerms"]]; }
  else if (mode === "owner") { items = [["osettings", "mxSettings"], ["ofeedback", "mxFbList"], ["privacy", "mxPrivacy"], ["terms", "mxTerms"]]; }
  else { return; }
  var out = pm.querySelector("button.out");
  var h = items.map(function (it) { return '<button type="button" data-xm="' + it[0] + '">' + X(it[1]) + "</button>"; }).join("");
  if (out) { out.insertAdjacentHTML("beforebegin", h); }
}
new MutationObserver(extendMenu).observe($x("pmenu"), { childList: true });
$x("pmenu").addEventListener("click", function (e) {
  var b = e.target.closest("[data-xm]");
  if (!b) { return; }
  $x("pmenu").classList.add("hidden");
  var k = b.dataset.xm;
  if (k === "profile") { pageProfile(); }
  else if (k === "support") { pageSupport(); }
  else if (k === "feedback") { pageFeedback(); }
  else if (k === "osettings") { pageOwnerSettings(); }
  else if (k === "ofeedback") { pageOwnerFeedback(); }
  else { legal(k); }
});

/* ---------- Case à cocher à l'inscription + liens sur la connexion ---------- */
var insBtn = $x("insc") && $x("insc").querySelector("button.main");
if (insBtn) {
  insBtn.insertAdjacentHTML("beforebegin", '<label class="chk"><input type="checkbox" id="iTerms"><span id="iTermsT"></span></label>');
}
if ($x("auth")) {
  $x("auth").insertAdjacentHTML("beforeend", '<p class="lglinks"><a href="#" data-xl="terms" id="lkT"></a> · <a href="#" data-xl="privacy" id="lkP"></a></p>');
}
function legalTexts() {
  if ($x("iTermsT")) {
    $x("iTermsT").innerHTML = X("tcAccept").replace("{t}", '<a href="#" data-xl="terms">' + X("tcTerms") + "</a>").replace("{p}", '<a href="#" data-xl="privacy">' + X("tcPrivacy") + "</a>");
  }
  if ($x("lkT")) { $x("lkT").textContent = X("mxTerms"); $x("lkP").textContent = X("mxPrivacy"); }
}
legalTexts();
var baseLangue = langue;
langue = function (l) { baseLangue(l); legalTexts(); };
inscrire2 = async function () {
  msg("");
  var e = $x("iEmail").value.trim(), p = $x("iPass").value;
  if (p.length < 6) { return msg(t("court")); }
  if (p !== $x("iPass2").value) { return msg(t("pasPareil")); }
  if (!$x("iTerms").checked) { return msg(X("tcNeed")); }
  var r = await db.auth.signUp({ email: e, password: p, options: { data: { terms_accepted_at: new Date().toISOString(), terms_version: "2026-11-13" } } });
  if (r.error) { return msg(r.error.message); }
  afficher();
};

/* ---------- Clics dans les pages ---------- */
document.addEventListener("click", async function (e) {
  var lk = e.target.closest("[data-xl]");
  if (lk) { e.preventDefault(); legal(lk.dataset.xl); return; }
  var b = e.target.closest("[data-xp]");
  if (!b) { return; }
  var a = b.dataset.xp, v = b.dataset.v;
  if (a === "av") {
    var r = await db.from("shops").update({ avatar: v }).eq("id", window.__shopId);
    var res = $x("pfRes");
    if (r.error) { res.style.color = "var(--error)"; res.textContent = r.error.message; return; }
    $x("avbig").textContent = v;
    document.querySelectorAll(".avgrid button").forEach(function (x) { x.classList.toggle("on", x.dataset.v === v); });
    paintAvatar();
  } else if (a === "rate") {
    fbSel = parseInt(v, 10);
    document.querySelectorAll(".rate button").forEach(function (x) { x.classList.toggle("on", x.dataset.v === v); });
  } else if (a === "send") {
    var fr = $x("fbRes");
    if (!fbSel) { fr.style.color = "var(--error)"; fr.textContent = X("fbPick"); return; }
    var r2 = await db.rpc("send_feedback", { p_rating: fbSel, p_comment: $x("fbCom").value });
    fr.style.color = r2.error ? "var(--error)" : "var(--ok)";
    fr.textContent = r2.error ? r2.error.message : X("fbThanks");
  } else if (a === "addc") {
    var lab = $x("osL").value.trim(), num = normNum($x("osN").value), or = $x("osRes");
    if (!lab || num.length < 10 || num.length > 15) { or.style.color = "var(--error)"; or.textContent = X("osBad"); return; }
    var cfg = await getSettings();
    cfg.contacts.push({ label: lab.slice(0, 30), num: num });
    var r3 = await saveKey("support_contacts", JSON.stringify(cfg.contacts));
    if (r3.error) { or.style.color = "var(--error)"; or.textContent = r3.error.message; return; }
    pageOwnerSettings();
  } else if (a === "delc") {
    var cfg2 = await getSettings();
    cfg2.contacts.splice(parseInt(v, 10), 1);
    await saveKey("support_contacts", JSON.stringify(cfg2.contacts));
    pageOwnerSettings();
  } else if (a === "chan") {
    var link = $x("osC").value.trim(), rr = $x("osRes");
    if (link && !/^https:\/\//i.test(link)) { rr.style.color = "var(--error)"; rr.textContent = X("osBadLink"); return; }
    var r4 = await saveKey("support_channel", link);
    rr.style.color = r4.error ? "var(--error)" : "var(--ok)";
    rr.textContent = r4.error ? r4.error.message : X("osSaved");
  }
});

var prevAff = afficher;
afficher = async function () { await prevAff(); paintAvatar(); };
paintAvatar();
})();
