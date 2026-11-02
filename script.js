/* ======================= Site logic (no need to edit) ======================= */
const $ = (s, r = document) => r.querySelector(s);
const HOME_X = typeof HOME !== "undefined" ? HOME : HOME_DEFAULT, ABOUT_X = typeof ABOUT !== "undefined" ? ABOUT : ABOUT_DEFAULT;
const ph = t => String(t).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>');
const ul = a => `<ul>${a.map(x => `<li>${ph(x)}</li>`).join("")}</ul>`;
// Pictures & videos: each item may have a media list (file paths or YouTube/Vimeo links)
const isVideoFile = u => /\.(mp4|webm|mov)(\?|$)/i.test(u);
const isEmbed = u => /youtu|vimeo/i.test(u);
const firstImg = o => o.image || (o.media || []).find(u => u && !isVideoFile(u) && !isEmbed(u)) || "";
const mediaHTML = (list, alt = "Portfolio photo") => {
  const items = (list || []).filter(Boolean);
  if (!items.length) return "";
  return `<div class="gal">${items.map(u => {
    const yt = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})/), vm = u.match(/vimeo\.com\/(\d+)/);
    if (yt) return `<div class="vid"><iframe src="https://www.youtube-nocookie.com/embed/${yt[1]}" title="Video: ${alt}" loading="lazy" allowfullscreen></iframe></div>`;
    if (vm) return `<div class="vid"><iframe src="https://player.vimeo.com/video/${vm[1]}" title="Video: ${alt}" loading="lazy" allowfullscreen></iframe></div>`;
    if (isVideoFile(u)) return `<video src="${u}" controls preload="metadata" playsinline></video>`;
    return `<img src="${u}" alt="${alt}" loading="lazy">`;
  }).join("")}</div>`;
};
const card = (t, body) => `<article class="card reveal"><h3>${t}</h3>${body}</article>`;

$("#educationList").innerHTML = EDUCATION.map(e => card(e.title, ul(e.items) + mediaHTML(e.media, e.title))).join("");
$("#sportList").innerHTML = SPORT.map(e => card(e.title, ul(e.items) + mediaHTML(e.media, e.title))).join("");
$("#workList").innerHTML = WORK.map(w => `<article class="reveal">${card(ph(w.title),
  `<p class="meta">${ph(w.company)} · ${ph(w.location)} · ${ph(w.period)}${w.current ? " · Current" : ""}</p><p>${ph(w.about)}</p>
   <h4>Key responsibilities</h4>${ul(w.duties)}<h4>Projects supported</h4>${ul(w.projects)}<h4>Tools</h4>${ul(w.tools)}<h4>Accomplishments</h4>${ul(w.wins)}${mediaHTML(w.media, w.company)}`)}</article>`).join("");
$("#journeyList").innerHTML = JOURNEY.map(m => `<li class="reveal"><span class="date">${ph(m.date)}</span><h3>${m.icon} ${m.title}</h3><p>${m.text}</p>${mediaHTML(m.media, m.title)}</li>`).join("");
$("#skillList").innerHTML = SKILLS.map(g => card(g.title, `<div class="tiles">${g.items.map(s => `<div class="tile"><span class="mk">${s.n.replace(/[^A-Za-z ]/g,"").trim().split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}</span><span><b>${s.n}</b><small>${ph(s.level)}</small></span></div>`).join("")}</div>${mediaHTML(g.media, g.title)}`)).join("");

// Projects: filters + modal
function drawProjects(f) {
  $("#projectList").innerHTML = PROJECTS.map((p, i) => (f === "All" || p.cat === f) ? `<article class="card proj"><div class="cover">${firstImg(p) ? `<img src="${firstImg(p)}" alt="${p.title}" loading="lazy">` : ""}<span class="chip2">${p.cat}</span>${firstImg(p) ? "" : "Placeholder image"}</div><div class="body"><div class="ptop"><h3>${ph(p.title)}</h3><button class="arrow" data-i="${i}" aria-label="View details: ${p.title}">View Details ↗</button></div><p>${p.desc}</p><p class="tools">${ph(p.d["Tools and standards"])}</p></div></article>` : "").join("");
}
$("#filters").innerHTML = FILTERS.map((f, i) => `<button class="chip" aria-pressed="${i === 0}">${f}</button>`).join("");
$("#filters").addEventListener("click", e => {
  if (!e.target.matches(".chip")) return;
  document.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", c === e.target));
  drawProjects(e.target.textContent);
});
const modal = $("#modal");
$("#projectList").addEventListener("click", e => {
  const b = e.target.closest("[data-i]"); if (!b) return;
  const p = PROJECTS[b.dataset.i];
  $("#mBody").innerHTML = `<span class="tag">${p.cat}</span><h3 id="mTitle">${ph(p.title)}</h3><p class="note">Example placeholder. Do not publish confidential client details.</p>` +
    Object.entries(p.d).map(([k, v]) => `<h4>${k}</h4><p>${ph(v)}</p>`).join("") + (p.media && p.media.length ? `<h4>Pictures &amp; videos</h4>${mediaHTML(p.media, p.title)}` : `<h4>Images</h4><p>${ph("[Add approved photos or diagrams]")}</p>`);
  modal.showModal();
});
$("#mClose").onclick = () => modal.close();
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });
drawProjects("All");

// Contact + CV
const toast = m => { const t = $("#toast"); t.textContent = m; t.classList.add("on"); setTimeout(() => t.classList.remove("on"), 3500); };
$("#contactList").innerHTML = `<li><b>Email</b>${SITE.email ? SITE.email : ph("[Add your email]")}</li>
  <li><b>LinkedIn</b>${SITE.linkedin ? `<a href="${SITE.linkedin}" target="_blank" rel="noopener">${SITE.linkedin}</a>` : ph("[Add your LinkedIn link]")}</li><li><b>Location</b>Cambodia</li>`;
$("#mailBtn").onclick = e => { if (SITE.email) { e.preventDefault(); location.href = "mailto:" + SITE.email; } else { e.preventDefault(); toast("Add your email in script.js first."); } };
document.querySelectorAll("[data-cv]").forEach(b => b.onclick = () => {
  if (!SITE.cvFile) return toast("CV not uploaded yet. See README, step “Add your CV”.");
  const a = document.createElement("a"); a.href = SITE.cvFile; a.download = ""; a.click();
});
$("#year").textContent = new Date().getFullYear();

// Mobile menu
const burger = $("#burger"), menu = $("nav");
const setMenu = o => { menu.classList.toggle("open", o); burger.setAttribute("aria-expanded", o); burger.textContent = o ? "✕" : "☰"; burger.setAttribute("aria-label", o ? "Close menu" : "Open menu"); };
burger.onclick = () => setMenu(!menu.classList.contains("open"));
menu.addEventListener("click", e => { if (e.target.tagName === "A") setMenu(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

// Active section + reveal on scroll
const links = [...document.querySelectorAll("nav a")];
const spy = new IntersectionObserver(es => es.forEach(en => {
  if (en.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section").forEach(s => spy.observe(s));
const rev = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); rev.unobserve(en.target); } }), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => rev.observe(el));

// Mini journey card (About) + theme toggle
$("#miniJourney").innerHTML = JOURNEY.map(m => `<li><span class="ic">${m.icon}</span><span><small>${ph(m.date)}</small><b>${m.title}</b></span></li>`).join("");
const root = document.documentElement, tbtn = $("#theme");
let saved = null; try { saved = localStorage.getItem("lc-theme"); } catch (e) {}
let dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
const applyTheme = () => { root.dataset.theme = dark ? "dark" : "light"; tbtn.textContent = dark ? "☾ Dark" : "☀ Light"; tbtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme"); };
tbtn.onclick = () => { dark = !dark; applyTheme(); try { localStorage.setItem("lc-theme", dark ? "dark" : "light"); } catch (e) {} };
applyTheme();

// Dynamic touches: typing line, scroll progress, header shadow, back-to-top
const words = (HOME_X.typedWords && HOME_X.typedWords.length) ? HOME_X.typedWords : HOME_DEFAULT.typedWords;
const typedEl = $("#typed");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let w = 0, c = words[0].length, del = true;
  (function tick() {
    const full = words[w];
    c += del ? -1 : 1; typedEl.textContent = full.slice(0, c);
    let t = del ? 35 : 70;
    if (!del && c === full.length) { del = true; t = 1800; }
    else if (del && c === 0) { del = false; w = (w + 1) % words.length; t = 300; }
    setTimeout(tick, t);
  })();
}
const bar = $("#progress"), navEl = $("#nav"), topBtn = $("#top");
const onScroll = () => {
  const max = document.documentElement.scrollHeight - innerHeight, y = scrollY;
  bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  navEl.classList.toggle("scrolled", y > 10); topBtn.classList.toggle("show", y > 600);
};
addEventListener("scroll", onScroll, { passive: true }); onScroll();
topBtn.onclick = () => scrollTo({ top: 0, behavior: "smooth" });

// Course catalog: search + category filters + details pop-up
let cCat = "All";
function drawCourses() {
  const q = $("#courseSearch").value.trim().toLowerCase();
  const hit = COURSES.map((c, i) => [c, i]).filter(([c]) => (cCat === "All" || c.cat === cCat) && (c.title + c.desc + c.cat + c.tools).toLowerCase().includes(q));
  $("#courseList").innerHTML = hit.map(([c, i]) => `<article class="card proj"><div class="cover">${firstImg(c) ? `<img src="${firstImg(c)}" alt="${c.title}" loading="lazy">` : ""}<span class="chip2">${c.cat}</span>${firstImg(c) ? "" : "Course image"}</div><div class="body"><div class="ptop"><h3>${ph(c.title)}</h3></div><p class="tools">${ph(c.provider)} · ${ph(c.duration)}</p><p>${c.desc}</p><button class="arrow" data-c="${i}" aria-label="View details: ${c.title}">View Details ↗</button></div></article>`).join("");
  $("#courseEmpty").hidden = hit.length > 0;
}
$("#courseFilters").innerHTML = COURSE_FILTERS.map((f, i) => `<button class="chip" aria-pressed="${i === 0}">${f}</button>`).join("");
$("#courseFilters").addEventListener("click", e => {
  if (!e.target.matches(".chip")) return;
  document.querySelectorAll("#courseFilters .chip").forEach(c => c.setAttribute("aria-pressed", c === e.target));
  cCat = e.target.textContent; drawCourses();
});
$("#courseSearch").addEventListener("input", drawCourses);
$("#courseList").addEventListener("click", e => {
  const b = e.target.closest("[data-c]"); if (!b) return;
  const c = COURSES[b.dataset.c];
  $("#mBody").innerHTML = `<span class="tag">${c.cat}</span><h3 id="mTitle">${ph(c.title)}</h3><p class="note">Example placeholder. Add only courses you really completed or taught.</p>` +
    Object.entries(c.d).map(([k, v]) => `<h4>${k}</h4><p>${ph(v)}</p>`).join("") + (c.media && c.media.length ? `<h4>Pictures &amp; videos</h4>${mediaHTML(c.media, c.title)}` : "");
  modal.showModal();
});
drawCourses();

// Click a photo to see it larger
document.addEventListener("click", e => {
  const im = e.target.closest(".gal img"); if (!im || im.closest("dialog")) return;
  $("#mBody").innerHTML = `<img class="big" src="${im.src}" alt="${im.alt}">`; modal.showModal();
});

// More life: skills ticker, staggered reveal, heading underline, timeline progress
const skillNames = SKILLS.flatMap(g => g.items.map(s => s.n));
$("#ticker").innerHTML = [...skillNames, ...skillNames].map(n => `<span>${n}</span>`).join("");
document.querySelectorAll(".grid3, .grid2, .tiles").forEach(g => [...g.querySelectorAll(":scope > .reveal")].forEach((el, i) => el.style.setProperty("--d", Math.min(i, 6) * 80 + "ms")));
const seen = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("seen"); seen.unobserve(en.target); } }), { threshold: .15 });
document.querySelectorAll(".sec").forEach(s => seen.observe(s));
const tls = [...document.querySelectorAll(".timeline")], still = matchMedia("(prefers-reduced-motion: reduce)").matches;
const tlProgress = () => tls.forEach(t => { const r = t.getBoundingClientRect(); const p = still ? 1 : Math.min(1, Math.max(0, (innerHeight * .65 - r.top) / r.height)); t.style.setProperty("--tl", p * 100 + "%"); });
addEventListener("scroll", tlProgress, { passive: true }); addEventListener("resize", tlProgress); tlProgress();

// Home + About text (editable in admin.html)
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
$("#hGreeting").textContent = HOME_X.greeting;
{ const n = $("#hName"), sp = document.createElement("span"); sp.textContent = HOME_X.firstName; n.replaceChildren(sp, " " + HOME_X.lastName); }
$("#hTitle").textContent = HOME_X.title; $("#hLead").textContent = HOME_X.statement;
$("#hBtn1").textContent = HOME_X.button1; $("#hBtn2").textContent = HOME_X.button2;
$("#hScript").replaceChildren(...HOME_X.script.flatMap((l, i) => i ? [document.createElement("br"), l] : [l]));
$("#typed").textContent = words[0];
$("#aLabel").textContent = ABOUT_X.label; $("#aHeading").textContent = ABOUT_X.heading; $("#aBtn").textContent = ABOUT_X.button;
$("#aText").innerHTML = ABOUT_X.paragraphs.map(p => `<p>${esc(p)}</p>`).join("");
$("#aFacts").innerHTML = ABOUT_X.facts.map(f => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join("");
if (ABOUT_X.portrait) {
  const im = document.createElement("img"); im.src = ABOUT_X.portrait; im.alt = "Portrait of " + HOME_X.firstName + " " + HOME_X.lastName; im.className = "portrait"; im.loading = "lazy";
  Object.assign(im.style, { width: "100%", objectFit: "cover", display: "block", padding: "0" });
  $("#aPortrait").replaceWith(im);
}
