/* Renders content from data.js. Rarely needs editing. */
const $ = (s) => document.querySelector(s);
const img = (src) => `<img src="${src}" alt="" loading="lazy" onerror="this.remove()">`;
const badge = (c) => c.type === "Paid" ? `<span class="badge paid">${c.price}</span>` : `<span class="badge free">Free</span>`;
const WA = `<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path fill="#fff" d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z"/><path fill="#25d366" d="M8.4 7.4c-.3.3-.6.9-.5 1.6.3 2.6 3.500 6.200 7.200 6.600.7.1 1.300-.3 1.600-.7l.200-.9-2.200-1-.9.900c-1-.4-2.500-1.900-2.900-2.900l.9-.9-1-2.200z"/></svg>`;

function renderChrome(home) {
  const p = home ? "" : "index.html";
  $("#site-header").innerHTML = `
    <div class="wrap bar">
      <a class="logo" href="index.html">${SITE.name}</a>
      <button class="burger" aria-label="Menu" onclick="document.body.classList.toggle('nav-open')">☰</button>
      <nav>
        <a href="${p}#classes">Classes</a><a href="${p}#special">Special</a>
        <a href="${p}#membership">Membership</a><a href="${p}#instructor">Instructor</a><a href="${p}#faq">FAQ</a>
        <a class="btn sm" href="${p}#contact">Contact</a>
      </nav>
    </div>`;
  $("#site-footer").innerHTML = `<div class="wrap"><p class="logo">${SITE.name}</p><p>© ${new Date().getFullYear()} ${SITE.name}. Free yoga for all.</p></div>`;
  document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => document.body.classList.remove("nav-open")));
  waPopup();
  document.body.insertAdjacentHTML("beforeend", `<a class="wa" href="${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${WA}</a>`);
}

function card(c, kind) {
  return `<a class="card" href="class.html?t=${kind}&id=${c.id}">
    <div class="thumb">${img(c.thumb)}${badge(c)}</div>
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
    <div class="hero-art"><div class="arch">${img(h.image)}</div><div class="ring"></div></div></div>`;

  $("#class-grid").innerHTML = CLASSES.map(c => card(c, "class")).join("");
  $("#special-grid").innerHTML = SPECIAL.map(c => card(c, "special")).join("");

  $("#plan-grid").innerHTML = MEMBERSHIPS.map((m, i) => `
    <div class="plan ${m.featured ? "featured" : ""}">
      ${m.featured ? '<span class="tag">Most popular</span>' : ""}
      <h3>${m.name}</h3><div class="price">${m.price}</div>
      <ul>${m.features.map(f => `<li>${f}</li>`).join("")}</ul>
      <button class="btn" onclick="openJoin(${i})">Join Now</button>
    </div>`).join("");

  const i = INSTRUCTOR;
  $("#instructor-box").innerHTML = `
    <div class="portrait-wrap"><div class="portrait">${img(i.image)}</div></div>
    <div class="inst-text"><p class="role">${i.role}</p><h2>${i.name}</h2>
      ${i.bio.map(b => `<p>${b}</p>`).join("")}
      <div class="stats">${i.stats.map(s => `<div><b>${s.n}</b><span>${s.l}</span></div>`).join("")}</div>
      <ul class="chips">${i.credentials.map(c => `<li>${c}</li>`).join("")}</ul></div>`;

  $("#faq-list").innerHTML = FAQ.map(f => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join("");

  $("#contact-box").innerHTML = `
    <div class="info"><h3>Get in touch</h3>
      <p><b>Phone</b><br><a href="tel:${SITE.phone.replace(/\s/g, "")}">${SITE.phone}</a></p>
      <p><b>Email</b><br><a href="mailto:${SITE.email}">${SITE.email}</a></p>
      <p><b>Location</b><br>${SITE.address}</p>
      <p><a class="btn" href="${SITE.whatsapp}" target="_blank" rel="noopener">Chat on WhatsApp</a></p>
      <p class="social"><a href="${SITE.instagram}">Instagram</a><a href="${SITE.youtube}">YouTube</a><a href="${SITE.facebook}">Facebook</a></p></div>
    ${contactForm()}`;
}

function renderClass() {
  renderChrome(false);
  const q = new URLSearchParams(location.search), kind = q.get("t") === "special" ? "special" : "class";
  const c = (kind === "special" ? SPECIAL : CLASSES).find(x => x.id === q.get("id"));
  if (!c) { $("#class-page").innerHTML = `<div class="wrap section"><h2>Class not found</h2><br><a class="btn" href="index.html#classes">Back to classes</a></div>`; return; }
  document.title = `${c.title} | ${SITE.name}`;
  const back = kind === "special" ? ["#special", "All special classes"] : ["#classes", "All classes"];
  $("#class-page").innerHTML = `
    <div class="class-banner">${img(c.banner)}<div class="shade"></div></div>
    <div class="wrap detail">
      <div class="main">
        <a class="link" href="index.html${back[0]}">← ${back[1]}</a>
        <h1>${c.title}</h1><p class="lead">${c.about}</p>
        <h3>What you will gain</h3><ul class="ticks">${c.benefits.map(b => `<li>${b}</li>`).join("")}</ul>
        <h3>What to bring</h3><p>${c.bring}</p>
        <div class="by"><div class="avatar">${img(c.instructorImage || INSTRUCTOR.image)}</div>
          <div><span>Your instructor</span><b>${c.instructor || INSTRUCTOR.name}</b><p>${c.tagline || INSTRUCTOR.tagline}</p></div></div>
      </div>
      <aside class="side">
        ${badge(c)}
        <dl><dt>Date</dt><dd>${c.date}</dd><dt>Time</dt><dd>${c.time}</dd><dt>Mode</dt><dd>${c.mode}</dd>
        <dt>Fee</dt><dd>${c.type === "Paid" ? c.price : "Free"}</dd></dl>
        <a class="btn gold block" href="#register">Register Now</a>
      </aside>
    </div>
    <div class="wrap reg" id="register"><div class="head"><h2>Register for this class</h2><p>Fill in your details and we will confirm on WhatsApp.</p></div>${classForm(c.id)}</div>`;
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

/* TYPE 1: class + special class registration */
function classForm(selId) {
  const opt = (c) => `<option value="${c.title} (${c.date})"${c.id === selId ? " selected" : ""}>${c.title} – ${c.date} ${c.type === "Paid" ? "(" + c.price + ")" : "(Free)"}</option>`;
  const sel = `<select name="class" required><option value="">Select a class</option><optgroup label="Upcoming Classes">${CLASSES.map(opt).join("")}</optgroup><optgroup label="Special Classes">${SPECIAL.map(opt).join("")}</optgroup></select>`;
  return `<form class="rform" onsubmit="submitForm(event,'class')">${personal()}${fld("Select the class", "class", { req: 1, html: sel, full: 1 })}${HP}
    <button class="btn" type="submit">Submit Registration</button><p class="fmsg" role="status"></p></form>`;
}

/* TYPE 2: membership + payment link + UTR (pop-up opened by Join Now) */
function membershipForm(i) {
  const m = MEMBERSHIPS[i];
  const sel = `<select name="membership" required onchange="setPlan(this)">${MEMBERSHIPS.map((x, j) => `<option value="${x.name} – ${x.price}" data-link="${x.link}" data-price="${x.price}"${j === i ? " selected" : ""}>${x.name} – ${x.price}</option>`).join("")}</select>`;
  return `<form class="rform" onsubmit="submitForm(event,'membership')">${personal()}${fld("Select Membership", "membership", { req: 1, html: sel, full: 1 })}
    <div class="pay"><p><b>Step 1.</b> Pay <b class="pamt">${m.price}</b> using this payment link:</p>
    <a class="btn gold pl" href="${m.link}" target="_blank" rel="noopener">Open Payment Link</a>
    <p class="small"><b>Step 2.</b> After paying, enter your UTR / transaction ID below.</p></div>
    ${fld("UTR / Transaction ID", "utr", { req: 1, full: 1, attr: 'minlength="6"' })}${HP}
    <button class="btn" type="submit">Submit Membership Details</button><p class="fmsg" role="status"></p></form>`;
}
function setPlan(s) { const o = s.selectedOptions[0], f = s.form; f.querySelector(".pl").href = o.dataset.link; f.querySelector(".pamt").textContent = o.dataset.price; }
function openJoin(i) {
  let d = $("#join");
  if (!d) {
    document.body.insertAdjacentHTML("beforeend", `<dialog id="join"><div class="dh"><h3>Membership Registration</h3><button aria-label="Close" onclick="this.closest('dialog').close()">×</button></div><div class="db"></div></dialog>`);
    d = $("#join"); d.addEventListener("click", (e) => { if (e.target === d) d.close(); });
  }
  d.querySelector(".db").innerHTML = membershipForm(i);
  d.showModal();
}

/* TYPE 3: contact us */
function contactForm() {
  return `<form class="rform one" onsubmit="submitForm(event,'contact')">${fld("Name", "name", { req: 1 })}${fld("Email ID", "email", { req: 1, type: "email" })}
    ${fld("Message", "message", { req: 1, html: '<textarea name="message" rows="4" required></textarea>' })}${HP}
    <button class="btn" type="submit">Send message</button><p class="fmsg" role="status"></p></form>`;
}

async function submitForm(ev, type) {
  ev.preventDefault();
  const f = ev.target, btn = f.querySelector("button[type=submit]"), msg = f.querySelector(".fmsg");
  if (f.website.value) return;                       // spam trap
  if (!SITE.formsUrl || SITE.formsUrl.includes("PASTE")) { msg.className = "fmsg err"; msg.textContent = "Form is not connected yet. Paste your Apps Script URL in data.js (SITE.formsUrl)."; return; }
  const label = btn.textContent; btn.disabled = true; btn.textContent = "Sending...";
  const body = new URLSearchParams(new FormData(f)); body.set("formType", type);
  try {
    await fetch(SITE.formsUrl, { method: "POST", mode: "no-cors", body });
    f.outerHTML = `<div class="thanks"><h3>${FORM.thanksTitle}</h3><p>${FORM.thanks[type]}</p></div>`;
  } catch (e) {
    msg.className = "fmsg err"; msg.textContent = "Could not send. Please check your internet and try again.";
    btn.disabled = false; btn.textContent = label;
  }
}
