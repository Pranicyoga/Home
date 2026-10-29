/* Renders content from data.js. Rarely needs editing. */
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s || "").replace(/"/g, "&quot;");
const img = (src, alt = "", eager = false) => !src ? "" : `<img src="${src}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" onerror="this.remove()">`;
const lang = (c) => c.language ? `<span class="lang">${c.language}</span>` : "";
const lvl = (c) => c.level ? `<span class="lvl">${c.level}</span>` : "";
const money = (p) => /^\d/.test(String(p)) ? "₹" + p : p;
const badge = (c) => c.type === "Paid" ? `<span class="badge paid">${money(c.price)}</span>` : `<span class="badge free">Free</span>`;
const WA = `<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path fill="#fff" d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z"/><path fill="#25d366" d="M8.4 7.4c-.3.3-.6.9-.5 1.6.3 2.6 3.500 6.200 7.200 6.600.7.1 1.300-.3 1.600-.7l.200-.9-2.200-1-.9.900c-1-.4-2.500-1.900-2.900-2.900l.9-.9-1-2.200z"/></svg>`;

function renderChrome(home) {
  const p = home ? "" : "index.html";
  $("#site-header").innerHTML = `
    <div class="wrap bar">
      <a class="logo" href="index.html" aria-label="${SITE.name} home"><img src="images/logo-horizontal.svg" alt="${SITE.name} – ${SITE.tagline}" onerror="this.replaceWith(document.createTextNode('${SITE.name}'))"></a>
      <button class="burger" aria-label="Menu" onclick="document.body.classList.toggle('nav-open')">☰</button>
      <nav>
        <a href="${p}#classes">Classes</a><a href="${p}#special">Special</a>
        <a href="${p}#membership">Membership</a><a href="${p}#instructor">Instructor</a><a href="${p}#faq">FAQ</a>
        <a href="${p}#contact">Contact</a><a class="btn sm gold" href="${p}#classes">Join Free</a>
      </nav>
    </div>`;
  $("#site-footer").innerHTML = `<div class="wrap"><a href="index.html" aria-label="${SITE.name} home"><img class="flogo" src="images/logo-horizontal-white.svg" alt="${SITE.name}" onerror="this.replaceWith(document.createTextNode('${SITE.name}'))"></a><p>© ${new Date().getFullYear()} ${SITE.name}. Online yoga, pranayama &amp; meditation classes for beginners.</p></div>`;
  document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => document.body.classList.remove("nav-open")));
  waPopup();
  document.body.insertAdjacentHTML("beforeend", `<a class="wa" href="${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${WA}</a>`);
}

function card(c, kind) {
  return `<a class="card" href="class.html?t=${kind}&id=${c.id}">
    <div class="thumb">${img(c.thumb, `${c.title.trim()} – ${c.level || "online"} yoga class`)}${badge(c)}${lvl(c)}${lang(c)}</div>
    <div class="body"><p class="when">${c.date} &nbsp;|&nbsp; ${c.mode}</p><h3>${c.title}</h3><p>${c.short}</p>
    <div class="foot"><span>${c.time}</span><span class="link">View details</span></div></div></a>`;
}

function renderHome() {
  renderChrome(true);
  const h = SITE.hero;
  $("#hero").innerHTML = `<div class="wrap hero-grid">
    <div class="hero-text"><h1>${h.title}</h1><p>${h.text}</p>
      <div class="cta"><a class="btn gold" href="${h.buttonLink}">${h.buttonText}</a><a class="btn ghost" href="#membership">View Memberships</a></div>
      <ul class="points">${h.points.map(x => `<li>${x}</li>`).join("")}</ul></div>
    <div class="hero-art"><div class="arch">${img(h.image, "Yoga teacher meditating in lotus pose – free online yoga classes for beginners", true)}</div><div class="ring"></div></div></div>`;

  renderSections();
  homeSEO();
  $("#class-grid").innerHTML = CLASSES.map(c => card(c, "class")).join("");
  $("#special-grid").innerHTML = SPECIAL.map(c => card(c, "special")).join("");

  $("#plan-grid").innerHTML = MEMBERSHIPS.map((m, i) => `
    <div class="plan ${m.featured ? "featured" : ""}">
      ${m.featured ? '<span class="tag">Most popular</span>' : ""}
      <h3>${m.name}</h3><div class="price">${m.price}</div>
      <ul>${m.features.map(f => `<li>${f}</li>`).join("")}</ul>
      <button class="btn" onclick="openJoin(${i})">Join Now</button>
    </div>`).join("");

  renderInstructors(0);

  $("#faq-list").innerHTML = FAQ.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join("");

  $("#contact-box").innerHTML = `
    <div class="info"><h3>Get in touch</h3><p class="lead">Questions about a class or plan? Write to us or message on WhatsApp.</p>
      <div class="row"><span>Phone</span><a href="tel:${SITE.phone.replace(/\s/g, "")}">${SITE.phone}</a></div>
      <div class="row"><span>Email</span><a href="mailto:${SITE.email}">${SITE.email}</a></div>
      <div class="row"><span>Location</span>${SITE.address}</div>
      <a class="btn gold wabtn" href="${SITE.whatsapp}" target="_blank" rel="noopener">Chat on WhatsApp</a>
      <p class="social"><a href="${SITE.instagram}">Instagram</a><a href="${SITE.youtube}">YouTube</a><a href="${SITE.facebook}">Facebook</a></p></div>
    ${contactForm()}`;
}

function renderClass() {
  renderChrome(false);
  const q = new URLSearchParams(location.search), kind = q.get("t") === "special" ? "special" : "class";
  const c = (kind === "special" ? SPECIAL : CLASSES).find(x => x.id === q.get("id"));
  if (!c) { $("#class-page").innerHTML = `<div class="wrap section"><h2>Class not found</h2><br><a class="btn" href="index.html#classes">Back to classes</a></div>`; return; }
  classSEO(c, kind);
  const back = kind === "special" ? ["#special", "All special classes"] : ["#classes", "All classes"];
  $("#class-page").innerHTML = `
    <div class="class-banner">${img(c.banner, c.title.trim() + " – online yoga class")}<div class="shade"></div></div>
    <div class="wrap detail">
      <div class="main">
        <a class="link" href="index.html${back[0]}">← ${back[1]}</a>
        <h1>${c.title}</h1><div class="cr"><span>Level: ${c.level || "All Levels"}</span><span>Language: ${c.language || "English"}</span><span>${c.mode}</span></div><p class="lead">${c.about}</p>
        <h3>What you will gain</h3><ul class="ticks">${c.benefits.map(b => `<li>${b}</li>`).join("")}</ul>
        <h3>What to bring</h3><p>${c.bring}</p>
        ${instructorBox(c)}
      </div>
      <aside class="side">
        ${badge(c)}
        <dl><dt>Date</dt><dd>${c.date}</dd><dt>Time</dt><dd>${c.time}</dd><dt>Mode</dt><dd>${c.mode}</dd><dt>Level</dt><dd>${c.level || "All Levels"}</dd><dt>Language</dt><dd>${c.language || "English"}</dd>
        <dt>Fee</dt><dd>${c.type === "Paid" ? money(c.price) : "Free"}</dd></dl>
        <button class="btn gold block" onclick="openClass('${c.id}')">Register Now</button>
      </aside>
    </div>`;
}

/* WhatsApp chat pop-up: appears once per visit after a short delay */
function waPopup() {
  try { if (sessionStorage.getItem("waSeen")) return; } catch (e) {}
  const el = document.createElement("div");
  el.className = "wa-pop";
  el.innerHTML = `<button class="x" aria-label="Close">×</button>
    <a href="${SITE.whatsapp}" target="_blank" rel="noopener"><b>${SITE.name}</b>
    <span class="dots"><i></i><i></i><i></i></span><p>${SITE.waGreeting}</p></a>`;
  document.body.appendChild(el);
  const hide = () => { el.classList.remove("show"); try { sessionStorage.setItem("waSeen", "1"); } catch (e) {} };
  setTimeout(() => el.classList.add("show"), 2500);   // pop up after 2.5 s
  setTimeout(() => el.classList.add("typed"), 4300);  // "typing..." then message
  setTimeout(hide, 18000);                            // auto-hide
  el.querySelector(".x").addEventListener("click", hide);
}

/* ===== FORMS: saved to Google Sheets via Apps Script (SITE.formsUrl + FORM in data.js) ===== */
const fld = (label, name, o = {}) => `<label class="${o.full ? "full" : ""}">${label}${o.req ? " <em>*</em>" : ""}${o.html || `<input name="${name}" type="${o.type || "text"}" ${o.req ? "required" : ""} ${o.attr || ""}>`}</label>`;
const GENDER = `<select name="gender"><option value="">Select (optional)</option><option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option></select>`;
const HP = `<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">`;
const personal = () =>
  fld("Name", "name", { req: 1 }) + fld("Gender", "gender", { html: GENDER }) + fld("Occupation", "occupation") +
  fld("Where are you from?", "place", { req: 1 }) +
  fld("WhatsApp Number", "whatsapp", { req: 1, type: "tel", attr: 'pattern="[0-9+ ]{10,15}" inputmode="tel" title="Enter a valid WhatsApp number"' }) +
  fld("Email ID", "email", { req: 1, type: "email" });

/* HEALTH & SAFETY QUESTIONS (class + membership forms) */
const YN = (name) => `<select name="${name}" required onchange="syncMedical(this)"><option value="">Select</option><option>No</option><option>Yes</option></select>`;
const medicalFields = () =>
  `<h4 class="fs">Health &amp; safety</h4>` +
  fld("Do you have any serious medical condition, injury or recent surgery?", "medical", { req: 1, full: 1, html: YN("medical") }) +
  fld("Are you currently taking any medication?", "medication", { req: 1, full: 1, html: YN("medication") }) +
  `<label class="full med-d" hidden>Please tell us briefly about the condition or medication <em>*</em><textarea name="medicalDetails" rows="3" disabled required placeholder="For example: knee surgery in 2025, blood pressure medicine"></textarea></label>` +
  `<p class="full hint">Your health information is kept private and is used only to keep your practice safe. Yoga is not a substitute for medical advice.</p>`;
function syncMedical(s) {
  const f = s.form, yes = f.elements.medical.value === "Yes" || f.elements.medication.value === "Yes";
  const l = f.querySelector(".med-d"); l.hidden = !yes; l.querySelector("textarea").disabled = !yes;
}

/* TYPE 1: class registration pop-up. Free classes: details only. Paid classes: payment link + UTR. */
function classForm(selId) {
  const link = (c) => c.paymentLink || (c.registerLink && c.registerLink !== "#" ? c.registerLink : "");
  const opt = (c) => `<option value="${c.title} (${c.date})" data-type="${c.type}" data-price="${money(c.price)}" data-link="${link(c)}"${c.id === selId ? " selected" : ""}>${c.title} – ${c.date} (${c.type === "Paid" ? money(c.price) : "Free"}${c.language ? " · " + c.language : ""})</option>`;
  const sel = `<select name="class" required onchange="syncClass(this)"><option value="">Select a class</option><optgroup label="Upcoming Classes">${CLASSES.map(opt).join("")}</optgroup><optgroup label="Special Classes">${SPECIAL.map(opt).join("")}</optgroup></select>`;
  return `<form class="rform" onsubmit="submitForm(event,'class')">
    <h4 class="fs">Your details</h4>${personal()}
    <h4 class="fs">Your class</h4>${fld("Select the class", "class", { req: 1, html: sel, full: 1 })}
    ${medicalFields()}
    <div class="pay" hidden><p><b>Step 1.</b> Pay <b class="pamt"></b> for this class:</p>
      <a class="btn gold pl" href="#" target="_blank" rel="noopener">Open Payment Link</a>
      <p class="nolink" hidden>Payment link is not available yet. Please message us on WhatsApp.</p>
      <p class="small"><b>Step 2.</b> After paying, enter your UTR / transaction ID below.</p></div>
    <label class="full utr" hidden>UTR / Transaction ID <em>*</em><input name="utr" minlength="6" disabled></label>
    ${HP}<button class="btn" type="submit">Submit Registration</button><p class="fmsg" role="status"></p></form>`;
}
function syncClass(s) {
  const o = s.selectedOptions[0], f = s.form, paid = !!o && o.dataset.type === "Paid";
  f.querySelector(".pay").hidden = !paid;
  const u = f.querySelector(".utr"); u.hidden = !paid; u.querySelector("input").disabled = !paid;
  if (paid) {
    f.querySelector(".pamt").textContent = o.dataset.price;
    const a = f.querySelector(".pl"), has = !!o.dataset.link;
    a.hidden = !has; if (has) a.href = o.dataset.link;
    f.querySelector(".nolink").hidden = has;
  }
  f.querySelector("button[type=submit]").textContent = paid ? "Submit Registration & Payment" : "Submit Registration";
}
function openClass(id) {
  openModal("Class Registration", classForm(id));
  syncClass($("#join select[name=class]"));
}

/* TYPE 2: membership + payment link + UTR (pop-up opened by Join Now) */
function membershipForm(i) {
  const m = MEMBERSHIPS[i];
  const sel = `<select name="membership" required onchange="setPlan(this)">${MEMBERSHIPS.map((x, j) => `<option value="${x.name} – ${x.price}" data-link="${x.link}" data-price="${x.price}"${j === i ? " selected" : ""}>${x.name} – ${x.price}</option>`).join("")}</select>`;
  return `<form class="rform" onsubmit="submitForm(event,'membership')"><h4 class="fs">Your details</h4>${personal()}<h4 class="fs">Your plan</h4>${fld("Select Membership", "membership", { req: 1, html: sel, full: 1 })}
    ${medicalFields()}
    <div class="pay"><p><b>Step 1.</b> Pay <b class="pamt">${m.price}</b> using this payment link:</p>
    <a class="btn gold pl" href="${m.link}" target="_blank" rel="noopener">Open Payment Link</a>
    <p class="small"><b>Step 2.</b> After paying, enter your UTR / transaction ID below.</p></div>
    ${fld("UTR / Transaction ID", "utr", { req: 1, full: 1, attr: 'minlength="6"' })}${HP}
    <button class="btn" type="submit">Submit Membership Details</button><p class="fmsg" role="status"></p></form>`;
}
function setPlan(s) { const o = s.selectedOptions[0], f = s.form; f.querySelector(".pl").href = o.dataset.link; f.querySelector(".pamt").textContent = o.dataset.price; }
function openModal(title, html) {
  let d = $("#join");
  if (!d) {
    document.body.insertAdjacentHTML("beforeend", `<dialog id="join"><div class="dh"><h3></h3><button aria-label="Close" onclick="this.closest('dialog').close()">×</button></div><div class="db"></div></dialog>`);
    d = $("#join"); d.addEventListener("click", (e) => { if (e.target === d) d.close(); });
  }
  d.querySelector("h3").textContent = title;
  d.querySelector(".db").innerHTML = html;
  d.showModal();
}
function openJoin(i) { openModal("Membership Registration", membershipForm(i)); }

/* TYPE 3: contact us */
function contactForm() {
  return `<form class="cform" onsubmit="submitForm(event,'contact')"><h3>Send us a message</h3>
    ${fld("Name", "name", { req: 1 })}${fld("Email ID", "email", { req: 1, type: "email" })}
    ${fld("Message", "message", { req: 1, full: 1, html: '<textarea name="message" rows="5" required></textarea>' })}${HP}
    <button class="btn" type="submit">Send message</button><p class="fmsg" role="status"></p></form>`;
}

async function submitForm(ev, type) {
  ev.preventDefault();
  const f = ev.target, btn = f.querySelector("button[type=submit]"), msg = f.querySelector(".fmsg");
  if (f.elements.website.value) return;                       // spam trap
  if (!SITE.formsUrl || SITE.formsUrl.includes("PASTE")) { msg.className = "fmsg err"; msg.textContent = "Form is not connected yet. Paste your Apps Script URL in data.js (SITE.formsUrl)."; return; }
  const label = btn.textContent; btn.disabled = true; btn.textContent = "Sending...";
  const body = new URLSearchParams(new FormData(f));
  const o = f.elements.class && f.elements.class.selectedOptions && f.elements.class.selectedOptions[0];
  if (type === "class" && o && o.dataset.type === "Paid") { type = "classpaid"; body.set("fee", o.dataset.price); }
  body.set("formType", type);
  try {
    await fetch(SITE.formsUrl, { method: "POST", mode: "no-cors", body });
    f.outerHTML = `<div class="thanks"><h3>${FORM.thanksTitle}</h3><p>${FORM.thanks[type] || FORM.thanks.membership || "Thank you. We will confirm on WhatsApp shortly."}</p></div>`;
  } catch (e) {
    msg.className = "fmsg err"; msg.textContent = "Could not send. Please check your internet and try again.";
    btn.disabled = false; btn.textContent = label;
  }
}

/* ===== HOME SECTIONS: next-class strip, gain, why, testimonials, CTA (data.js) ===== */
const ICONS = {
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-4 3-6 6.5-6s6.5 2 6.5 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c3 0 4.5 1.8 4.5 5"/>',
  lotus: '<path d="M12 4c2 3 2 7 0 10-2-3-2-7 0-10zM12 14c-3-1-6-4-6-8 3 0 6 3 6 8zM12 14c3-1 6-4 6-8-3 0-6 3-6 8zM4 19h16"/>'
};
function renderSections() {
  const n = CLASSES[0];
  if (n) {
    const el = $("#next-strip"); el.hidden = false;
    el.innerHTML = `<div class="nx-main"><div class="nx-top"><span class="nx-label">Next live class</span><span class="pill ${n.type === "Paid" ? "paid" : "free"}">${n.type === "Paid" ? money(n.price) : "Free"}</span></div>
      <h3>${n.title}</h3><p>${n.date} · ${n.time} · ${n.mode}${n.level ? " · " + n.level : ""}${n.language ? " · " + n.language : ""}</p></div>
      <div class="nx-act"><button class="btn gold" onclick="openClass('${n.id}')">Reserve my seat</button></div>`;
  }
  $("#gain-box").innerHTML = `<div class="head"><h2>${GAIN.title}</h2><p>${GAIN.text}</p></div>
    <div class="grid3">${GAIN.items.map(g => `<div class="gcard"><div class="gimg">${img(g.image, g.title)}</div><h3>${g.title}</h3><p>${g.text}</p></div>`).join("")}</div>`;
  $("#why-box").innerHTML = `<div class="why"><div class="why-l"><h2>${WHY.title}</h2><p>${WHY.text}</p>
    <div class="why-img">${img(WHY.image, "Why choose Pranic Yoga online yoga classes")}</div><a class="btn gold big" href="#classes">${WHY.button}</a></div>
    <div class="why-r">${WHY.items.map(w => `<div class="wcard"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[w.icon] || ICONS.lotus}</svg><h3>${w.title}</h3><p>${w.text}</p></div>`).join("")}</div></div>`;
  const t = TESTIMONIALS.items.filter(x => x.text && x.text.trim());
  $("#stories").hidden = !t.length;
  $("#stories-box").innerHTML = `<div class="head"><h2>${TESTIMONIALS.title}</h2><p class="sub2">${TESTIMONIALS.subtitle}</p><p class="note">${TESTIMONIALS.note}</p></div>
    <div class="grid3">${t.map(x => `<div class="tcard"><div class="av">${img(x.image, x.name + " – Pranic Yoga student")}</div><h3>${x.name}, ${x.place}</h3><p class="tsub">${x.tag}</p><p>${x.text}</p><div class="q" aria-hidden="true">“</div></div>`).join("")}</div>`;
  $("#cta-box").innerHTML = `<h2>${CTA.title}</h2><p>${CTA.text}</p><div class="btns"><a class="btn big" href="${CTA.link}">${CTA.button}</a><a class="btn ghost" href="${SITE.whatsapp}" target="_blank" rel="noopener">Chat on WhatsApp</a></div>`;
}

/* ===== SEO: dynamic page meta + structured data (JSON-LD) ===== */
function setHead({ title, desc, canonical, image }) {
  document.title = title;
  const put = (sel, tag, attrs, attr, val) => {
    let el = document.head.querySelector(sel);
    if (!el) { el = document.createElement(tag); Object.keys(attrs).forEach(k => el.setAttribute(k, attrs[k])); document.head.appendChild(el); }
    el.setAttribute(attr, val);
  };
  put('meta[name="description"]', "meta", { name: "description" }, "content", desc);
  put('link[rel="canonical"]', "link", { rel: "canonical" }, "href", canonical);
  put('meta[property="og:title"]', "meta", { property: "og:title" }, "content", title);
  put('meta[property="og:description"]', "meta", { property: "og:description" }, "content", desc);
  put('meta[property="og:url"]', "meta", { property: "og:url" }, "content", canonical);
  put('meta[property="og:type"]', "meta", { property: "og:type" }, "content", "website");
  put('meta[property="og:image"]', "meta", { property: "og:image" }, "content", image);
  put('meta[name="twitter:card"]', "meta", { name: "twitter:card" }, "content", "summary_large_image");
}
function injectLD(obj, id) {
  let s = document.getElementById(id);
  if (!s) { s = document.createElement("script"); s.type = "application/ld+json"; s.id = id; document.head.appendChild(s); }
  s.textContent = JSON.stringify(obj);
}
const classUrl = (c, kind) => `${SITE.url}class.html?t=${kind}&id=${c.id}`;
const MONTHS = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
const DAYS = { sunday: "Sunday", monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday", friday: "Friday", saturday: "Saturday" };
function isoStart(c) {            // "02 Nov 2026" + "6:00 AM – 7:00 AM IST" -> 2026-11-02T06:00:00+05:30
  const d = /^(\d{1,2})\s+([A-Za-z]{3})\w*\s+(\d{4})$/.exec(String(c.date).trim()), t = /(\d{1,2}):(\d{2})\s*(AM|PM)/i.exec(c.time || "");
  if (!d || !MONTHS[d[2]] || !t) return null;
  let h = +t[1] % 12; if (/pm/i.test(t[3])) h += 12;
  const p = (n) => String(n).padStart(2, "0");
  return `${d[3]}-${p(MONTHS[d[2]])}-${p(d[1])}T${p(h)}:${t[2]}:00+05:30`;
}
function courseLD(c, kind) {
  const num = /\d/.test(c.price) ? String(c.price).replace(/[^\d.]/g, "") : "0";
  const inst = { "@type": "CourseInstance", courseMode: "online", instructor: { "@type": "Person", name: instructorFor(c).name } };
  const start = isoStart(c), ev = /every\s+(\w+)/i.exec(c.date || "");
  if (start) inst.startDate = start;
  else if (ev && DAYS[ev[1].toLowerCase()]) inst.courseSchedule = { "@type": "Schedule", repeatFrequency: "P1W", byDay: "https://schema.org/" + DAYS[ev[1].toLowerCase()] };
  else if (ev) inst.courseSchedule = { "@type": "Schedule", repeatFrequency: "P1D" };
  return {
    "@context": "https://schema.org", "@type": "Course", name: c.title.trim(), description: c.about, url: classUrl(c, kind),
    educationalLevel: c.level || "All Levels", inLanguage: langCodes(c.language), provider: { "@type": "Organization", name: SITE.name, sameAs: SITE.url },
    offers: { "@type": "Offer", category: c.type, price: c.type === "Paid" ? num : "0", priceCurrency: "INR", availability: "https://schema.org/InStock", url: classUrl(c, kind) },
    hasCourseInstance: inst
  };
}
function classSEO(c, kind) {
  const title = `${c.seoTitle || c.title.trim()} | ${SITE.name}`;
  const desc = c.seoDesc || `${c.short} ${c.level || "All levels"} online yoga class by ${SITE.name}.`;
  setHead({ title, desc, canonical: classUrl(c, kind), image: SITE.url + "images/og-image.png" });
  injectLD(courseLD(c, kind), "ld-course");
  injectLD({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: kind === "special" ? "Special Classes" : "Classes", item: SITE.url + (kind === "special" ? "#special" : "#classes") },
    { "@type": "ListItem", position: 3, name: c.title.trim(), item: classUrl(c, kind) }] }, "ld-crumb");
}
function homeSEO() {
  if (INSTRUCTORS.length > 1) injectLD({ "@context": "https://schema.org", "@graph": INSTRUCTORS.slice(1).map((x, k) => ({ "@type": "Person", "@id": SITE.url + "#instructor-" + (k + 2), name: x.name, jobTitle: x.role, description: x.tagline, worksFor: { "@id": SITE.url + "#org" } })) }, "ld-people");
  const items = [...CLASSES.map(c => [c, "class"]), ...SPECIAL.map(c => [c, "special"])];
  injectLD({ "@context": "https://schema.org", "@type": "ItemList", name: "Online yoga classes by " + SITE.name,
    itemListElement: items.map(([c, k], i) => ({ "@type": "ListItem", position: i + 1, url: classUrl(c, k), name: c.title.trim() })) }, "ld-list");
}

/* ===== INSTRUCTORS: several profiles, matched to classes by name ===== */
const norm = (s) => String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
const shortBio = (p) => { const t = (p.bio && p.bio[0]) || ""; return t.length > 190 ? t.slice(0, 190).replace(/\s+\S*$/, "") + "…" : t; };
function instructorFor(c) {
  const nm = norm(c.instructor), p = nm ? INSTRUCTORS.find(x => norm(x.name) === nm) : INSTRUCTORS[0];
  if (p) return { name: p.name, role: p.role || "", tagline: nm ? (p.tagline || c.tagline || "") : (c.tagline || p.tagline || ""), image: nm ? (p.image || c.instructorImage) : (c.instructorImage || p.image),
    about: c.instructorBio || shortBio(p), languages: p.languages || [], profile: true };
  return { name: c.instructor, role: c.instructorRole || "", tagline: c.tagline || "", image: c.instructorImage || "",
    about: c.instructorBio || "", languages: [], profile: false };
}
function instructorBox(c) {
  const t = instructorFor(c);
  return `<div class="by"><div class="avatar">${img(t.image, t.name + " – yoga instructor")}</div>
    <div><span>Your instructor</span><b>${t.name}</b>${t.role ? `<em class="irole">${t.role}</em>` : ""}${t.tagline ? `<p>${t.tagline}</p>` : ""}
    ${t.about ? `<p class="iabout">${t.about}</p>` : ""}${t.languages.length ? `<p class="ilang">Teaches in: ${t.languages.join(", ")}</p>` : ""}
    ${t.profile ? `<a class="link" href="index.html#instructor">More about ${t.name} →</a>` : ""}</div></div>`;
}
function renderInstructors(sel) {
  const multi = INSTRUCTORS.length > 1, i = INSTRUCTORS[sel] || INSTRUCTORS[0];
  const tabs = multi ? `<div class="itabs" role="tablist">${INSTRUCTORS.map((x, k) => `<button type="button" role="tab" aria-selected="${k === sel}" class="${k === sel ? "on" : ""}" onclick="renderInstructors(${k})"><span class="tav">${img(x.image, "")}</span>${x.name}</button>`).join("")}</div>` : "";
  $("#instructor-box").innerHTML = `<div class="head"><h2>${multi ? "Meet Your Instructors" : "Meet Your Instructor"}</h2></div>${tabs}
    <div class="inst"><div class="portrait-wrap"><div class="portrait">${img(i.image, i.name + " – certified yoga and pranayama instructor")}</div></div>
    <div class="inst-text"><p class="role">${i.role}</p><h3 class="iname">${i.name}</h3>
      ${(i.bio || []).map(b => `<p>${b}</p>`).join("")}
      ${i.stats && i.stats.length ? `<div class="stats">${i.stats.map(s => `<div><b>${s.n}</b><span>${s.l}</span></div>`).join("")}</div>` : ""}
      ${i.languages && i.languages.length ? `<p class="ilang2">Teaches in: <b>${i.languages.join(", ")}</b></p>` : ""}
      <ul class="chips">${(i.credentials || []).map(c => `<li>${c}</li>`).join("")}</ul></div></div>`;
}
const LANGS = { english: "en", telugu: "te", hindi: "hi", tamil: "ta", kannada: "kn", malayalam: "ml", marathi: "mr", bengali: "bn", gujarati: "gu", odia: "or", punjabi: "pa" };
function langCodes(s) {
  const l = String(s || "English").split(/\s*(?:&|,|\/|\+|\band\b)\s*/i).filter(Boolean).map(x => LANGS[x.trim().toLowerCase()] || x.trim());
  return l.length > 1 ? l : l[0];
}
