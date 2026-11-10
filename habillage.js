(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };

var st = document.createElement("style");
st.textContent = [
":root{--card2:rgba(255,255,255,.40)}",
":root[data-theme=\"dark\"]{--card2:rgba(18,26,46,.42)}",
"body{padding:0!important;display:block!important}",
".card{width:calc(100% - 20px)!important;max-width:480px!important;margin:0 auto!important;min-height:100vh;border-radius:0!important;border-top:0!important;background:var(--card2)!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;padding:14px 16px 28px!important}",
"body.hasbar .card,body.hasbar2 .card{padding-bottom:104px!important}",
"#own button[data-a=\"out\"],#app>button.link{display:none!important}",
".top{margin-bottom:8px}",
".brand{position:relative;overflow:hidden;width:min(300px,80%);margin:6px auto 12px;background:#fff;border-radius:18px;padding:8px 10px;box-shadow:0 6px 20px rgba(31,60,120,.16);line-height:0}",
".brand svg,.brand img{width:100%;height:auto;display:block}",
".brand::after{content:\"\";position:absolute;inset:0;background:linear-gradient(110deg,transparent 40%,rgba(255,255,255,.95) 50%,transparent 60%);background-size:250% 100%;background-position:160% 0;mix-blend-mode:soft-light;animation:brille2 6s ease-in-out infinite;pointer-events:none}",
"@keyframes brille2{0%{background-position:160% 0}100%{background-position:-60% 0}}",
"#btn-profile{display:none;align-items:center;justify-content:center;width:38px;height:38px;padding:0;margin:0;border-radius:50%;background:var(--field);border:1px solid var(--border);color:var(--text)}",
"#btn-profile svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}",
".pmenu{position:fixed;top:60px;right:max(10px,calc(50% - 230px));z-index:60;min-width:210px;background:var(--bg2);border:1px solid var(--border);border-radius:14px;box-shadow:0 12px 32px rgba(0,0,0,.28);overflow:hidden;animation:fadeUp .25s ease both}",
".pmenu.hidden{display:none}",
".pmenu .mail{padding:10px 14px;font-size:12px;color:var(--muted);border-bottom:1px solid var(--border);word-break:break-all}",
".pmenu button{display:block;width:100%;text-align:left;background:none;border:0;border-radius:0;padding:13px 14px;margin:0;font-size:15px;font-weight:600;color:var(--text);box-shadow:none}",
".pmenu button.on{background:rgba(31,94,255,.14)}",
".pmenu button.out{color:var(--error);border-top:1px solid var(--border)}"
].join("\n");
document.head.appendChild(st);

/* Logo : dessiné en code, avec le panier */
var LOGO = "<svg viewBox='60 25 1410 880' xmlns='http://www.w3.org/2000/svg' role='img' aria-label='Dukyo'>" +
"<defs>" +
"<linearGradient id='dkA' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#06185c'/><stop offset='.5' stop-color='#0a46c8'/><stop offset='.85' stop-color='#1a8cff'/><stop offset='1' stop-color='#3ee6ff'/></linearGradient>" +
"<linearGradient id='dkB' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='#07206e'/><stop offset='.6' stop-color='#0b52e0'/><stop offset='1' stop-color='#2a9bff'/></linearGradient>" +
"<linearGradient id='dkO' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='#ffb000'/><stop offset='.5' stop-color='#ff7a00'/><stop offset='1' stop-color='#ff4d00'/></linearGradient>" +
"<linearGradient id='dkY' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#ffc400'/><stop offset='1' stop-color='#ff5a00'/></linearGradient>" +
"</defs>" +
"<path fill='url(#dkA)' d='M275 45H720C1010 45 1240 200 1255 385L1050 330C1030 260 920 215 740 215L520 220C400 222 300 260 220 320Z'/>" +
"<path fill='url(#dkB)' d='M150 635L440 618L412 735C700 650 950 650 1145 685C1010 820 780 885 500 885H95Z'/>" +
"<path fill='url(#dkO)' d='M225 392C100 440 55 520 85 570C150 640 400 600 700 568C900 560 1000 570 1070 578C700 580 330 650 120 600C20 560 60 450 225 392Z'/>" +
"<path fill='url(#dkO)' d='M1015 662C1180 662 1300 685 1380 715C1280 690 1150 672 1015 665Z'/>" +
"<path d='M190 362H246L272 468' fill='none' stroke='#0b2a6f' stroke-width='16' stroke-linecap='round' stroke-linejoin='round'/>" +
"<path fill='#0b2a6f' d='M258 415H472L430 520H270Z'/>" +
"<path d='M280 458H448M275 488H438' stroke='#fff' stroke-width='9' fill='none'/>" +
"<circle cx='295' cy='548' r='25' fill='#0b2a6f'/><circle cx='295' cy='548' r='9' fill='#fff'/>" +
"<circle cx='388' cy='548' r='25' fill='#0b2a6f'/><circle cx='388' cy='548' r='9' fill='#fff'/>" +
"<path fill='url(#dkO)' d='M285 410L293 355H337L329 410Z'/>" +
"<path fill='url(#dkO)' d='M340 410L350 315H394L384 410Z'/>" +
"<path fill='url(#dkO)' d='M398 410L420 278H468L444 410Z'/>" +
"<text x='480' y='552' font-size='300' font-weight='900' font-style='italic' textLength='960' lengthAdjust='spacingAndGlyphs' fill='#0b2a6f' font-family='Arial Black,Arial,system-ui,sans-serif'>Duk<tspan fill='url(#dkY)'>y</tspan>o</text>" +
"<text x='515' y='640' font-size='64' font-weight='700' font-style='italic' textLength='880' lengthAdjust='spacingAndGlyphs' fill='#0b2a6f' font-family='system-ui,Arial,sans-serif'>Gérez mieux. Développez plus.</text>" +
"</svg>";

document.querySelectorAll(".logosvg,.logoimg,h1.logo").forEach(function (e) { e.remove(); });
var top = document.querySelector(".top");
var brand = document.createElement("div");
brand.className = "brand";
brand.innerHTML = LOGO;
top.insertAdjacentElement("afterend", brand);
/* Si un jour tu ajoutes logo.png au dépôt, il remplace le dessin automatiquement */
var im = new Image();
im.alt = "Dukyo";
im.onload = function () { brand.innerHTML = ""; brand.appendChild(im); };
im.src = "logo.png";

var sl = document.querySelector('.card > p.sub[data-t="slogan"]');
if (sl) { sl.style.display = "none"; }
document.querySelectorAll('link[rel="icon"],link[rel="apple-touch-icon"]').forEach(function (l) { l.remove(); });
var fav = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='40 0 1260 1024'><path fill='#1a5be0' d='M275 45H720C1010 45 1240 200 1255 385L1050 330C1030 260 920 215 740 215L520 220C400 222 300 260 220 320Z'/><path fill='#0b52e0' d='M150 635L440 618L412 735C700 650 950 650 1145 685C1010 820 780 885 500 885H95Z'/><path fill='#ff8a1e' d='M225 392C100 440 55 520 85 570C150 640 400 600 700 568C900 560 1000 570 1070 578C700 580 330 650 120 600C20 560 60 450 225 392Z'/></svg>";
var lk = document.createElement("link");
lk.rel = "icon";
lk.href = "data:image/svg+xml," + encodeURIComponent(fav);
document.head.appendChild(lk);

/* Profil + menu */
top.insertAdjacentHTML("beforeend",
  '<button id="btn-profile" type="button" aria-label="Profil"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg></button>');
document.body.insertAdjacentHTML("beforeend", '<div id="pmenu" class="pmenu hidden"></div>');

function tt(k) { return (T[L] && T[L][k]) || T.fr[k] || k; }
function closeMenu() { $x("pmenu").classList.add("hidden"); }
async function openMenu() {
  var s = (await db.auth.getSession()).data.session;
  if (!s) { return; }
  var ob = $x("ownBar"), sb = $x("shopBar");
  var owner = ob && !ob.classList.contains("hidden"), shop = sb && !sb.classList.contains("hidden");
  var items = [];
  if (owner) { items = [["home", "oHome"], ["abo", "oAbo"], ["pay", "oPay"], ["shops", "oShops"]]; }
  else if (shop) { items = [["home", "mHome"], ["prod", "mProd"], ["ven", "mVen"], ["det", "mDet"], ["stat", "mStat"], ["abo", "mAbo"]]; }
  var h = '<div class="mail">' + esc(s.user.email || "") + "</div>";
  items.forEach(function (it) { h += '<button type="button" data-go="' + it[0] + '">' + tt(it[1]) + "</button>"; });
  h += '<button type="button" class="out" data-go="__out">' + tt("logout") + "</button>";
  var m = $x("pmenu");
  m.innerHTML = h;
  m.dataset.mode = owner ? "owner" : shop ? "shop" : "none";
  m.classList.remove("hidden");
}
$x("btn-profile").addEventListener("click", function (e) {
  e.stopPropagation();
  if ($x("pmenu").classList.contains("hidden")) { openMenu(); } else { closeMenu(); }
});
$x("pmenu").addEventListener("click", function (e) {
  var b = e.target.closest("[data-go]");
  if (!b) { return; }
  var v = b.dataset.go, mode = $x("pmenu").dataset.mode;
  closeMenu();
  if (v === "__out") { sortir(); }
  else if (mode === "owner") { var t = document.querySelector('#ownBar [data-v="' + v + '"]'); if (t) { t.click(); } }
  else if (mode === "shop" && window.dukyoShopGo) { window.dukyoShopGo(v); }
});
document.addEventListener("click", function (e) {
  if (!e.target.closest("#pmenu") && !e.target.closest("#btn-profile")) { closeMenu(); }
});

async function updateProfile() {
  var s = (await db.auth.getSession()).data.session;
  $x("btn-profile").style.display = s ? "flex" : "none";
}
var baseAff = afficher;
afficher = async function () {
  await baseAff();
  closeMenu();
  updateProfile();
};
updateProfile();
setTimeout(updateProfile, 1500);
})();
