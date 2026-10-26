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

  $("#plan-grid").innerHTML = MEMBERSHIPS.map(m => `
    <div class="plan ${m.featured ? "featured" : ""}">
      ${m.featured ? '<span class="tag">Most popular</span>' : ""}
      <h3>${m.name}</h3><div class="price">${m.price}</div>
      <ul>${m.features.map(f => `<li>${f}</li>`).join("")}</ul>
      <a class="btn" href="${m.link}" target="_blank" rel="noopener">Join Now</a>
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
    <form action="mailto:${SITE.email}" method="post" enctype="text/plain">
      <input name="Name" placeholder="Your name" required>
      <input name="Email" type="email" placeholder="Your email" required>
      <textarea name="Message" rows="4" placeholder="Your message" required></textarea>
      <button class="btn" type="submit">Send message</button>
    </form>`;
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
        <a class="btn gold block" href="${c.registerLink}" target="_blank" rel="noopener">Register Now</a>
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
