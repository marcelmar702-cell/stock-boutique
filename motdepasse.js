(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };
if (typeof db === "undefined") { return; }

var st = document.createElement("style");
st.textContent = [
".nre{margin-top:14px;text-align:center;font-size:13px}",
".nre a,.fgt a{color:var(--accent);text-decoration:underline;cursor:pointer}",
".fgt{margin-top:12px;text-align:center;font-size:14px}",
".tmp{font-size:30px;font-weight:800;letter-spacing:3px;text-align:center;padding:14px;border:2px dashed var(--border);border-radius:14px;margin:12px 0;user-select:all}"
].join("\n");
document.head.appendChild(st);

var PX = {
fr: { nreOk:"Alertes activées", nreMore:"Revoir",
  fgtLink:"Mot de passe oublié ?", fgtTitle:"Mot de passe oublié",
  fgtHelp:"Écris ton email. Tu peux recevoir un lien par email, ou demander de l’aide sur WhatsApp : Dukyo te donne un mot de passe temporaire.",
  fgtEmail:"Ton email", fgtSend:"Recevoir un lien par email",
  fgtSent:"Si cet email existe, un lien vient d’être envoyé. Regarde aussi les spams.",
  fgtFail:"L’envoi d’email n’est pas disponible pour le moment. Utilise WhatsApp.",
  fgtWa:"Demander de l’aide sur WhatsApp : ", fgtWaMsg:"Bonjour Dukyo, j’ai oublié mon mot de passe. Mon email : {e}. Le nom de ma boutique : ",
  fgtNoWa:"Le support WhatsApp n’est pas encore configuré.", fgtNeed:"Écris ton email.",
  chTitle:"Nouveau mot de passe", chHelp:"Choisis un mot de passe que tu peux retenir (6 caractères minimum).",
  chForced:"Tu utilises un mot de passe temporaire. Choisis ton nouveau mot de passe maintenant.",
  chNew:"Nouveau mot de passe", chNew2:"Écris-le encore", chSave:"Enregistrer", chDone:"Mot de passe changé ✓",
  mxChange:"Changer mon mot de passe", mxPwShops:"Mots de passe (boutiques)",
  pwReset:"Réinitialiser", pwConf:"Créer un mot de passe temporaire pour {n} ?", pwTmp:"Mot de passe temporaire",
  pwHow:"Donne-le à la boutique. Elle devra choisir un nouveau mot de passe dès sa connexion.",
  pwCopy:"Copier", pwCopied:"Copié ✓", pwWa:"Envoyer par WhatsApp",
  pwWaMsg:"Dukyo : ton mot de passe temporaire est {p}. Connecte-toi avec ton email, puis choisis un nouveau mot de passe.",
  pwNone:"Aucune boutique.", pwBack:"Retour à la liste", short:"Mot de passe trop court (6 minimum).", diff:"Les deux mots de passe ne sont pas pareils." },
sw: { nreOk:"Alertes zimewashwa", nreMore:"Ona tena",
  fgtLink:"Umesahau password ?", fgtTitle:"Umesahau password",
  fgtHelp:"Andika email yako. Unaweza kupokea lien kwa email, au kuomba msaada kwenye WhatsApp : Dukyo inakupa password ya muda.",
  fgtEmail:"Email yako", fgtSend:"Pokea lien kwa email",
  fgtSent:"Kama email hii ipo, lien imetumwa. Angalia pia spams.",
  fgtFail:"Kutuma email hakuwezekani sasa. Tumia WhatsApp.",
  fgtWa:"Omba msaada kwenye WhatsApp : ", fgtWaMsg:"Habari Dukyo, nimesahau password yangu. Email yangu : {e}. Jina ya boutique yangu : ",
  fgtNoWa:"Support ya WhatsApp haijawekwa bado.", fgtNeed:"Andika email yako.",
  chTitle:"Password mpya", chHelp:"Chagua password unayoweza kukumbuka (angalau 6 caractères).",
  chForced:"Unatumia password ya muda. Chagua password yako mpya sasa.",
  chNew:"Password mpya", chNew2:"Iandike tena", chSave:"Hifadhi", chDone:"Password imebadilishwa ✓",
  mxChange:"Badilisha password yangu", mxPwShops:"Ma password (boutiques)",
  pwReset:"Rudisha upya", pwConf:"Kutengeneza password ya muda kwa {n} ?", pwTmp:"Password ya muda",
  pwHow:"Mpe boutique. Atalazimika kuchagua password mpya akiingia.",
  pwCopy:"Copier", pwCopied:"Imecopié ✓", pwWa:"Tuma kwa WhatsApp",
  pwWaMsg:"Dukyo : password yako ya muda ni {p}. Ingia kwa email yako, kisha chagua password mpya.",
  pwNone:"Hakuna boutique.", pwBack:"Rudi kwenye orodha", short:"Password ni fupi sana (6 minimum).", diff:"Ma password mbili hazifanani." }
};
function P(k, v) {
  var s = (PX[L] && PX[L][k]) || PX.fr[k] || k;
  if (v) { for (var i in v) { s = s.replace("{" + i + "}", v[i]); } }
  return s;
}

/* ---------- Boîte des notifications : on la cache vraiment ---------- */
function tidy() {
  var b = $x("nbox");
  if (!b || b.dataset.re) { return; }
  var ok = b.querySelector('[data-n="ok"]');
  if (!ok || !localStorage.getItem("notif_ok_" + ok.dataset.id)) { return; }
  b.style.display = "none";
  if (!$x("nre")) {
    b.insertAdjacentHTML("beforebegin", '<p id="nre" class="nre">✅ ' + P("nreOk") + ' · <a href="#" data-nre="1">' + P("nreMore") + "</a></p>");
  }
}
new MutationObserver(tidy).observe(document.body, { childList: true, subtree: true });

/* ---------- Fenêtre plein écran ---------- */
document.body.insertAdjacentHTML("beforeend",
  '<div id="pwm" class="sheet hidden"><div class="sheetin"><div class="sheetbar"><button id="pwBack" class="small" type="button">←</button><b id="pwTitle"></b></div><div id="pwBody"></div></div></div>');
function openM(title, html, locked) {
  $x("pwTitle").textContent = title;
  $x("pwBody").innerHTML = html;
  $x("pwBack").style.display = locked ? "none" : "";
  $x("pwm").classList.remove("hidden");
  $x("pwm").scrollTop = 0;
}
function closeM() { $x("pwm").classList.add("hidden"); }
$x("pwBack").addEventListener("click", closeM);
function say(id, text, bad) {
  var r = $x(id);
  if (r) { r.style.color = bad ? "var(--error)" : "var(--ok)"; r.textContent = text; }
}

/* ---------- Mot de passe oublié (page de connexion) ---------- */
var loginBtn = document.querySelector("#auth button.main");
if (loginBtn) { loginBtn.insertAdjacentHTML("afterend", '<p class="fgt"><a href="#" data-pw="forgot" id="fgtL"></a></p>'); }
function texts() { if ($x("fgtL")) { $x("fgtL").textContent = P("fgtLink"); } }
texts();
var baseLangue = langue;
langue = function (l) { baseLangue(l); texts(); };

async function pageForgot() {
  var e0 = ($x("email") && $x("email").value.trim()) || "";
  var r = await db.from("app_settings").select("v").eq("k", "support_contacts").maybeSingle();
  var c = [];
  try { var a = JSON.parse((r.data && r.data.v) || "[]"); if (Array.isArray(a)) { c = a; } } catch (x) {}
  var h = '<p class="hint">' + P("fgtHelp") + '</p><label class="lb" for="fgE">' + P("fgtEmail") +
    '</label><input id="fgE" type="email" autocapitalize="none" autocorrect="off" value="' + esc(e0) + '">' +
    '<button class="main" type="button" data-pw="send">' + P("fgtSend") + '</button><div class="nres" id="fgRes"></div>';
  if (c.length) {
    c.forEach(function (x) { h += '<button class="main" type="button" data-pw="wa" data-v="' + esc(x.num) + '">' + P("fgtWa") + esc(x.label) + "</button>"; });
  } else { h += '<p class="hint" style="margin-top:14px">' + P("fgtNoWa") + "</p>"; }
  openM(P("fgtTitle"), h, false);
}

/* ---------- Changer le mot de passe ---------- */
function openPw(mode) {
  var h = '<p class="hint">' + (mode === "temp" ? P("chForced") : P("chHelp")) + "</p>" +
    '<label class="lb" for="npA">' + P("chNew") + '</label><input id="npA" type="password" autocomplete="new-password">' +
    '<label class="lb" for="npB">' + P("chNew2") + '</label><input id="npB" type="password" autocomplete="new-password">' +
    '<button class="main" type="button" data-pw="savepw" data-v="' + (mode ? "1" : "") + '">' + P("chSave") + '</button><div class="nres" id="npRes"></div>';
  openM(P("chTitle"), h, !!mode);
}

/* ---------- Propriétaire : mots de passe des boutiques ---------- */
async function pageShopsPw() {
  openM(P("mxPwShops"), '<p class="hint">…</p>', false);
  var r = await db.rpc("owner_overview");
  var rows = r.data || [], h = rows.length ? "" : '<p class="hint">' + P("pwNone") + "</p>";
  rows.forEach(function (s) {
    h += '<div class="ligne"><span><b>' + esc(s.name) + "</b><br><small>" + esc(s.email || "") + '</small></span>' +
      '<button class="small" type="button" data-pw="reset" data-id="' + s.id + '" data-nm="' + esc(s.name) + '">' + P("pwReset") + "</button></div>";
  });
  $x("pwBody").innerHTML = h;
}

/* ---------- Menu profil ---------- */
var pm = $x("pmenu");
if (pm) {
  new MutationObserver(function () {
    if (pm.classList.contains("hidden") || pm.querySelector("[data-xw]")) { return; }
    var mode = pm.dataset.mode;
    if (mode !== "shop" && mode !== "owner") { return; }
    var h = '<button type="button" data-xw="chg">' + P("mxChange") + "</button>";
    if (mode === "owner") { h += '<button type="button" data-xw="pws">' + P("mxPwShops") + "</button>"; }
    var out = pm.querySelector("button.out");
    if (out) { out.insertAdjacentHTML("beforebegin", h); }
  }).observe(pm, { childList: true });
  pm.addEventListener("click", function (e) {
    var b = e.target.closest("[data-xw]");
    if (!b) { return; }
    pm.classList.add("hidden");
    if (b.dataset.xw === "chg") { openPw(""); } else { pageShopsPw(); }
  });
}

/* ---------- Tous les clics ---------- */
document.addEventListener("click", async function (e) {
  if (e.target.closest('[data-n="ok"]')) { tidy(); return; }
  var more = e.target.closest("[data-nre]");
  if (more) {
    e.preventDefault();
    var nb = $x("nbox");
    if (nb) { nb.dataset.re = "1"; nb.style.display = ""; nb.classList.remove("ncol"); var d = nb.querySelector(".ndone"); if (d) { d.remove(); } }
    var nr = $x("nre"); if (nr) { nr.remove(); }
    return;
  }
  var b = e.target.closest("[data-pw]");
  if (!b) { return; }
  var a = b.dataset.pw, id = b.dataset.id;
  if (a === "forgot") { e.preventDefault(); pageForgot(); }
  else if (a === "send") {
    var em = $x("fgE").value.trim();
    if (!em) { return say("fgRes", P("fgtNeed"), true); }
    var r = await db.auth.resetPasswordForEmail(em, { redirectTo: location.origin + location.pathname });
    if (r.error) { say("fgRes", P("fgtFail"), true); } else { say("fgRes", P("fgtSent"), false); }
  }
  else if (a === "wa") {
    var em2 = ($x("fgE").value || "").trim() || "?";
    window.open("https://wa.me/" + b.dataset.v + "?text=" + encodeURIComponent(P("fgtWaMsg", { e: em2 })), "_blank");
  }
  else if (a === "savepw") {
    var p = $x("npA").value, q = $x("npB").value;
    if (p.length < 6) { return say("npRes", P("short"), true); }
    if (p !== q) { return say("npRes", P("diff"), true); }
    var u = await db.auth.updateUser({ password: p, data: { must_change: false } });
    if (u.error) { return say("npRes", u.error.message, true); }
    say("npRes", P("chDone"), false);
    setTimeout(closeM, 900);
  }
  else if (a === "reset") {
    var name = b.dataset.nm;
    if (!confirm(P("pwConf", { n: name }))) { return; }
    var r2 = await db.rpc("admin_reset_password", { p_shop: id });
    if (r2.error) { alert(r2.error.message); return; }
    var pw = r2.data;
    $x("pwBody").innerHTML = "<h3>" + esc(name) + '</h3><p class="hint">' + P("pwTmp") + '</p><div class="tmp" id="tmpPw">' + esc(pw) + "</div>" +
      '<p class="hint">' + P("pwHow") + "</p>" +
      '<button class="main" type="button" data-pw="copy">' + P("pwCopy") + "</button>" +
      '<a class="alink b" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(P("pwWaMsg", { p: pw })) + '">' + P("pwWa") + "</a>" +
      '<button class="link" type="button" data-pw="list">' + P("pwBack") + "</button>";
  }
  else if (a === "copy") {
    try { await navigator.clipboard.writeText($x("tmpPw").textContent); b.textContent = P("pwCopied"); setTimeout(function () { b.textContent = P("pwCopy"); }, 1500); } catch (x) {}
  }
  else if (a === "list") { pageShopsPw(); }
});

/* ---------- Mot de passe temporaire ou lien email : choisir un nouveau mot de passe ---------- */
db.auth.onAuthStateChange(function (ev) {
  if (ev === "PASSWORD_RECOVERY") { setTimeout(function () { openPw("recovery"); }, 300); }
});
var prevAff = afficher;
afficher = async function () {
  await prevAff();
  var s = (await db.auth.getSession()).data.session;
  var meta = s && s.user && s.user.user_metadata;
  if (meta && meta.must_change === true && $x("pwm").classList.contains("hidden")) { openPw("temp"); }
};
afficher();
})();
