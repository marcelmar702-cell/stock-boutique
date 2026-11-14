(function () {
"use strict";
var $x = function (id) { return document.getElementById(id); };
if (typeof db === "undefined" || !$x("sheet")) { return; }

var st = document.createElement("style");
st.textContent = [
".qimg{display:block;max-width:100%;margin-top:10px;border-radius:12px;border:1px solid var(--border)}",
".qa{margin-top:8px;font-size:14px;line-height:1.55}",
".qa.hidden{display:none}",
"#sheetBody .grp h4 span:last-child{font-size:20px;color:var(--accent)}"
].join("\n");
document.head.appendChild(st);

var AX = {
fr: { mxFaq:"Aide", mxOFaq:"Aide (questions)", none:"Aucune question pour l’instant.",
  qf:"Question (français)", af:"Réponse (français)", qs:"Question (swahili, facultatif)", as:"Réponse (swahili, facultatif)",
  img:"Image ou capture d’écran (facultatif)", rm:"Retirer l’image", save:"Enregistrer", cancel:"Annuler la modification",
  edit:"Modifier", del:"Supprimer", saved:"Enregistré ✓", need:"La question et la réponse en français sont obligatoires.",
  conf:"Supprimer cette question ?", add:"Ajouter une question", editing:"Modifier la question", list:"Questions" },
sw: { mxFaq:"Msaada", mxOFaq:"Msaada (maswali)", none:"Hakuna swali bado.",
  qf:"Swali (Kifaransa)", af:"Jibu (Kifaransa)", qs:"Swali (Kiswahili, si lazima)", as:"Jibu (Kiswahili, si lazima)",
  img:"Picha au capture d’écran (si lazima)", rm:"Ondoa picha", save:"Hifadhi", cancel:"Ghairi mabadiliko",
  edit:"Badilisha", del:"Futa", saved:"Imehifadhiwa ✓", need:"Swali na jibu la Kifaransa ni lazima.",
  conf:"Kufuta swali hili ?", add:"Ongeza swali", editing:"Badilisha swali", list:"Maswali" }
};
function A(k) { return (AX[L] && AX[L][k]) || AX.fr[k] || k; }
function lines(s) { return esc(s).replace(/\n/g, "<br>"); }
function openSheet(title, html) {
  $x("sheetTitle").textContent = title;
  $x("sheetBody").innerHTML = html;
  $x("sheet").classList.remove("hidden");
  $x("sheet").scrollTop = 0;
}
function setBody(html) { $x("sheetBody").innerHTML = html; }

/* ---------- Boutique : lire l'aide ---------- */
async function pageFaq() {
  openSheet(A("mxFaq"), '<p class="hint">…</p>');
  var r = await db.from("faq_items").select("*").order("position");
  var rows = r.data || [];
  if (!rows.length) { return setBody('<p class="hint">' + A("none") + "</p>"); }
  var h = "";
  rows.forEach(function (q, i) {
    var sw = L === "sw" && q.q_sw && q.a_sw;
    h += '<div class="grp"><h4 data-xq="' + i + '" style="cursor:pointer"><span>' + esc(sw ? q.q_sw : q.q_fr) + "</span><span>+</span></h4>" +
      '<div class="qa hidden" id="qa' + i + '">' + lines(sw ? q.a_sw : q.a_fr) +
      (q.image_url ? '<img class="qimg" loading="lazy" alt="" src="' + esc(q.image_url) + '">' : "") + "</div></div>";
  });
  setBody(h);
}

/* ---------- Images : réduire avant d'envoyer ---------- */
function compress(file, max) {
  return new Promise(function (res, rej) {
    var im = new Image(), u = URL.createObjectURL(file);
    im.onload = function () {
      var r = Math.min(1, max / Math.max(im.width, im.height));
      var c = document.createElement("canvas");
      c.width = Math.round(im.width * r); c.height = Math.round(im.height * r);
      c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      c.toBlob(function (b) { URL.revokeObjectURL(u); if (b) { res(b); } else { rej(new Error("image")); } }, "image/jpeg", 0.82);
    };
    im.onerror = function () { rej(new Error("image")); };
    im.src = u;
  });
}
function pathOf(url) {
  var p = String(url || "").split("/object/public/media/")[1];
  return p ? decodeURIComponent(p) : null;
}
function uid() { return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2); }

/* ---------- Propriétaire : écrire l'aide ---------- */
var ed = { id: null, img: null, rm: false, blob: null }, ITEMS = [];
async function pageOwnerFaq(keep) {
  if (!keep) { ed = { id: null, img: null, rm: false, blob: null }; }
  openSheet(A("mxOFaq"), '<p class="hint">…</p>');
  var r = await db.from("faq_items").select("*").order("position");
  ITEMS = r.data || [];
  var cur = ed.id ? ITEMS.filter(function (x) { return x.id === ed.id; })[0] : null;
  var h = "<h3>" + (cur ? A("editing") : A("add")) + "</h3>" +
    '<label class="lb" for="fqQ">' + A("qf") + '</label><input id="fqQ" value="' + esc(cur ? cur.q_fr : "") + '">' +
    '<label class="lb" for="fqA">' + A("af") + '</label><textarea id="fqA" class="champ" rows="4">' + esc(cur ? cur.a_fr : "") + "</textarea>" +
    '<label class="lb" for="fqQs">' + A("qs") + '</label><input id="fqQs" value="' + esc(cur && cur.q_sw || "") + '">' +
    '<label class="lb" for="fqAs">' + A("as") + '</label><textarea id="fqAs" class="champ" rows="4">' + esc(cur && cur.a_sw || "") + "</textarea>" +
    '<label class="lb" for="fqFile">' + A("img") + '</label><input id="fqFile" type="file" accept="image/*">' +
    '<div id="fqPrev">' + (ed.img && !ed.rm ? '<img class="qimg" alt="" src="' + esc(ed.img) + '"><button class="small" type="button" data-xz="rmimg" style="margin:8px 0 0">' + A("rm") + "</button>" : "") + "</div>" +
    '<button class="main" type="button" data-xz="save">' + A("save") + "</button>" +
    (cur ? '<button class="link" type="button" data-xz="cancel">' + A("cancel") + "</button>" : "") +
    '<div class="nres" id="fqRes"></div><h3 style="margin-top:22px">' + A("list") + "</h3>";
  if (!ITEMS.length) { h += '<p class="hint">' + A("none") + "</p>"; }
  ITEMS.forEach(function (q, i) {
    h += '<div class="ligne"><span>' + esc(q.q_fr) + (q.image_url ? " 🖼️" : "") + '</span><span style="white-space:nowrap">' +
      (i > 0 ? '<button class="small" type="button" data-xz="up" data-id="' + q.id + '">↑</button>' : "") +
      (i < ITEMS.length - 1 ? '<button class="small" type="button" data-xz="down" data-id="' + q.id + '">↓</button>' : "") +
      '<button class="small" type="button" data-xz="edit" data-id="' + q.id + '">' + A("edit") + "</button>" +
      '<button class="small" type="button" data-xz="del" data-id="' + q.id + '">' + A("del") + "</button></span></div>";
  });
  setBody(h);
}
function bad(msg) { var r = $x("fqRes"); r.style.color = "var(--error)"; r.textContent = msg; }
async function removeFile(url) { var p = pathOf(url); if (p) { await db.storage.from("media").remove([p]); } }

async function saveFaq() {
  var q = $x("fqQ").value.trim(), a = $x("fqA").value.trim();
  if (!q || !a) { return bad(A("need")); }
  var img = ed.img || null;
  if (ed.blob) {
    var path = "faq/" + uid() + ".jpg";
    var up = await db.storage.from("media").upload(path, ed.blob, { contentType: "image/jpeg" });
    if (up.error) { return bad(up.error.message); }
    if (img) { await removeFile(img); }
    img = db.storage.from("media").getPublicUrl(path).data.publicUrl;
  } else if (ed.rm && img) { await removeFile(img); img = null; }
  var row = { q_fr: q, a_fr: a, q_sw: $x("fqQs").value.trim() || null, a_sw: $x("fqAs").value.trim() || null, image_url: img };
  var r;
  if (ed.id) { r = await db.from("faq_items").update(row).eq("id", ed.id); }
  else {
    var max = 0; ITEMS.forEach(function (x) { if (x.position > max) { max = x.position; } });
    row.position = max + 1;
    r = await db.from("faq_items").insert(row);
  }
  if (r.error) { return bad(r.error.message); }
  ed = { id: null, img: null, rm: false, blob: null };
  await pageOwnerFaq();
  var ok = $x("fqRes"); ok.style.color = "var(--ok)"; ok.textContent = A("saved");
}
async function swap(id, dir) {
  var i = ITEMS.findIndex(function (x) { return x.id === id; }), j = i + dir;
  if (i < 0 || j < 0 || j >= ITEMS.length) { return; }
  var a = ITEMS[i], b = ITEMS[j], pa = a.position, pb = b.position;
  if (pa === pb) { pb = pa + dir; }
  await db.from("faq_items").update({ position: pb }).eq("id", a.id);
  await db.from("faq_items").update({ position: pa }).eq("id", b.id);
  pageOwnerFaq(true);
}

document.addEventListener("change", async function (e) {
  if (e.target.id !== "fqFile" || !e.target.files[0]) { return; }
  try {
    ed.blob = await compress(e.target.files[0], 1000);
    ed.rm = false;
    $x("fqPrev").innerHTML = '<img class="qimg" alt="" src="' + URL.createObjectURL(ed.blob) + '">';
  } catch (x) { bad("Image illisible."); }
});
document.addEventListener("click", async function (e) {
  var q = e.target.closest("[data-xq]");
  if (q) {
    var box = $x("qa" + q.dataset.xq), open = box.classList.contains("hidden");
    box.classList.toggle("hidden");
    q.lastElementChild.textContent = open ? "−" : "+";
    return;
  }
  var b = e.target.closest("[data-xz]");
  if (!b) { return; }
  var a = b.dataset.xz, id = b.dataset.id;
  if (a === "save") { await saveFaq(); }
  else if (a === "rmimg") { ed.rm = true; ed.blob = null; $x("fqPrev").innerHTML = ""; }
  else if (a === "cancel") { pageOwnerFaq(); }
  else if (a === "edit") {
    var it = ITEMS.filter(function (x) { return x.id === id; })[0];
    ed = { id: id, img: it && it.image_url || null, rm: false, blob: null };
    await pageOwnerFaq(true);
    $x("sheet").scrollTop = 0;
  }
  else if (a === "del") {
    if (!confirm(A("conf"))) { return; }
    var it2 = ITEMS.filter(function (x) { return x.id === id; })[0];
    if (it2 && it2.image_url) { await removeFile(it2.image_url); }
    await db.from("faq_items").delete().eq("id", id);
    pageOwnerFaq();
  }
  else if (a === "up") { swap(id, -1); }
  else if (a === "down") { swap(id, 1); }
});

/* ---------- Menu profil ---------- */
var pm = $x("pmenu");
if (pm) {
  new MutationObserver(function () {
    if (pm.classList.contains("hidden") || pm.querySelector("[data-xn]")) { return; }
    var mode = pm.dataset.mode;
    if (mode !== "shop" && mode !== "owner") { return; }
    var out = pm.querySelector("button.out");
    if (out) { out.insertAdjacentHTML("beforebegin", '<button type="button" data-xn="' + mode + '">' + A(mode === "shop" ? "mxFaq" : "mxOFaq") + "</button>"); }
  }).observe(pm, { childList: true });
  pm.addEventListener("click", function (e) {
    var b = e.target.closest("[data-xn]");
    if (!b) { return; }
    pm.classList.add("hidden");
    if (b.dataset.xn === "shop") { pageFaq(); } else { pageOwnerFaq(); }
  });
}
})();
