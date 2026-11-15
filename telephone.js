(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };
if (typeof db === "undefined") { return; }

var PDOM = "dukyo.invalid";

var TX = {
  fr: { lEmail:"Écris ici ton numéro de téléphone (ou ton email)",
        badId:"Écris un numéro de téléphone valide (ou un email).",
        wrong:"Numéro (ou email) ou mot de passe incorrect.",
        exists:"Ce numéro (ou cet email) a déjà un compte. Touche « Se connecter ».",
        tech:"Le service a refusé ce numéro. Envoie une capture de ce message au support Dukyo.",
        need:"Tu dois accepter les conditions pour créer ton compte." },
  sw: { lEmail:"Weka hapa numéro yako ya simu (au mail yako)",
        badId:"Andika numéro ya simu sahihi (au mail).",
        wrong:"Numéro (au mail) au mot de passe si sahihi.",
        exists:"Numéro hii (au mail hii) ina compte tayari. Bonyeza « Ingia ».",
        tech:"Huduma imekataa numéro hii. Tuma capture ya message hii kwa support ya Dukyo.",
        need:"Lazima ukubali conditions ili kufungua compte yako." }
};
function X(k) { return (TX[L] && TX[L][k]) || TX.fr[k] || k; }
T.fr.lEmail = TX.fr.lEmail;
T.sw.lEmail = TX.sw.lEmail;

["email", "iEmail"].forEach(function (id) {
  var i = $x(id);
  if (i) { i.type = "text"; i.setAttribute("inputmode", "text"); i.setAttribute("autocomplete", "username"); }
});
langue(L);

function digits(v) {
  var d = String(v).replace(/\D/g, "");
  if (d.indexOf("00") === 0) { d = d.slice(2); }
  else if (d.charAt(0) === "0") { d = "243" + d.slice(1); }
  else if (d.length === 9) { d = "243" + d; }
  return d;
}
function toId(v) {
  v = String(v || "").trim();
  if (!v) { return null; }
  if (v.indexOf("@") > -1) { return v.toLowerCase(); }
  var d = digits(v);
  return d.length >= 11 && d.length <= 15 ? d + "@" + PDOM : null;
}
function friendly(m, id) {
  if (/invalid login/i.test(m)) { return X("wrong"); }
  if (/already|registered/i.test(m)) { return X("exists"); }
  if (/email/i.test(m) && /invalid/i.test(m) && id.indexOf("@" + PDOM) > -1) { return X("tech"); }
  return m;
}

connecter = async function () {
  msg("");
  var id = toId($x("email").value);
  if (!id) { return msg(X("badId")); }
  var r = await db.auth.signInWithPassword({ email: id, password: $x("pass").value });
  if (r.error) { return msg(friendly(r.error.message, id)); }
  afficher();
};
inscrire2 = async function () {
  msg("");
  var id = toId($x("iEmail").value), p = $x("iPass").value;
  if (!id) { return msg(X("badId")); }
  if (p.length < 6) { return msg(t("court")); }
  if (p !== $x("iPass2").value) { return msg(t("pasPareil")); }
  var tc = $x("iTerms");
  if (tc && !tc.checked) { return msg(X("need")); }
  var r = await db.auth.signUp({
    email: id, password: p,
    options: { data: { terms_accepted_at: new Date().toISOString(), terms_version: "2026-11-13", login_type: id.indexOf("@" + PDOM) > -1 ? "phone" : "email" } }
  });
  if (r.error) { return msg(friendly(r.error.message, id)); }
  afficher();
};

/* Le numéro s'affiche proprement partout (listes du propriétaire, menu…) */
var RE = new RegExp("(\\d{9,15})@" + PDOM.replace(/\./g, "\\."), "g");
function pretty() {
  var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n;
  while ((n = w.nextNode())) {
    var v = n.nodeValue;
    if (v.indexOf("@" + PDOM) > -1) { n.nodeValue = v.replace(RE, "+$1"); }
    else if (v.indexOf("Ton email et ton mot de passe") > -1) { n.nodeValue = v.replace("Ton email et ton mot de passe", "Ton email ou ton numéro de téléphone, et ton mot de passe"); }
    else if (v.indexOf("Email yako na mot de passe") > -1) { n.nodeValue = v.replace("Email yako na mot de passe", "Email yako au numéro ya simu, na mot de passe"); }
  }
}
var pend = false;
new MutationObserver(function () {
  if (pend) { return; }
  pend = true;
  requestAnimationFrame(function () { pend = false; pretty(); });
}).observe(document.body, { childList: true, subtree: true });
pretty();
})();
