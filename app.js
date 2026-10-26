/* Renders content from data.js. Rarely needs editing. */
const $ = (s) => document.querySelector(s);
const img = (src) => `<img src="${src}" alt="" loading="lazy" onerror="this.remove()">`;
const badge = (c) => c.type === "Paid" ? `<span class="badge paid">${c.price}</span>` : `<span class="badge free">Free</span>`;

function renderChrome(home) {
  const p = home ? "" : "index.html";
  $("#site-header").innerHTML = `
    <div class="wrap bar">
      <a class="logo" href="index.html">${SITE.name}</a>
      <button class="burger" aria-label="Menu" onclick="document.body.classList.toggle('nav-open')">☰</button>
      <nav>
        <a href="${p}#classes">Classes</a><a href="${p}#special">Special</a>
        <a href="${p}#membership">Membership</a><a href="${p}#instructor">Instructor</a>
        <a class="btn sm" href="${p}#contact">Contact</a>
      </nav>
    </div>`;
  $("#site-footer").innerHTML = `<div class="wrap"><p>© ${new Date().getFullYear()} ${SITE.name}. Free yoga for all.</p></div>`;
  document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => document.body.classList.remove("nav-open")));
}

function renderHome() {
  renderChrome(true);
  const h = SITE.hero;
  $("#hero").style.backgroundImage = `url('${h.image}')`;
  $("#hero").innerHTML = `<div class="wrap"><h1>${h.title}</h1><p>${h.text}</p><a class="btn" href="${h.buttonLink}">${h.buttonText}</a></div>`;

  $("#class-grid").innerHTML = CLASSES.map(c => `
    <a class="card" href="class.html?id=${c.id}">
      <div class="thumb">${img(c.thumb)}${badge(c)}</div>
      <div class="body"><h3>${c.title}</h3><p class="meta">${c.date} · ${c.time}</p><p>${c.short}</p><span class="link">View details</span></div>
    </a>`).join("");

  $("#special-grid").innerHTML = SPECIAL.map(s => `
    <a class="card" href="${s.link}"><div class="thumb">${img(s.image)}</div>
    <div class="body"><h3>${s.title}</h3><p>${s.text}</p></div></a>`).join("");

  $("#plan-grid").innerHTML = MEMBERSHIPS.map(m => `
    <div class="plan ${m.featured ? "featured" : ""}">
      <h3>${m.name}</h3><div class="price">${m.price}</div>
      <ul>${m.features.map(f => `<li>${f}</li>`).join("")}</ul>
      <a class="btn" href="${m.link}" target="_blank" rel="noopener">Join Now</a>
    </div>`).join("");

  const i = INSTRUCTOR;
  $("#instructor-box").innerHTML = `
    <div class="portrait">${img(i.image)}</div>
    <div><h3>${i.name}</h3><p class="meta">${i.role}</p>${i.bio.map(b => `<p>${b}</p>`).join("")}
    <ul class="ticks">${i.credentials.map(c => `<li>${c}</li>`).join("")}</ul></div>`;

  $("#contact-box").innerHTML = `
    <div><h3>Get in touch</h3>
      <p>📞 <a href="tel:${SITE.phone.replace(/\s/g, "")}">${SITE.phone}</a></p>
      <p>✉️ <a href="mailto:${SITE.email}">${SITE.email}</a></p>
      <p>📍 ${SITE.address}</p>
      <p><a class="btn" href="${SITE.whatsapp}" target="_blank" rel="noopener">Chat on WhatsApp</a></p>
      <p class="social"><a href="${SITE.instagram}">Instagram</a> <a href="${SITE.youtube}">YouTube</a> <a href="${SITE.facebook}">Facebook</a></p></div>
    <form action="mailto:${SITE.email}" method="post" enctype="text/plain">
      <input name="Name" placeholder="Your name" required>
      <input name="Email" type="email" placeholder="Your email" required>
      <textarea name="Message" rows="4" placeholder="Your message" required></textarea>
      <button class="btn" type="submit">Send message</button>
    </form>`;
}

function renderClass() {
  renderChrome(false);
  const c = CLASSES.find(x => x.id === new URLSearchParams(location.search).get("id"));
  if (!c) { $("#class-page").innerHTML = `<div class="wrap section"><h2>Class not found</h2><a class="btn" href="index.html#classes">Back to classes</a></div>`; return; }
  document.title = `${c.title} | ${SITE.name}`;
  $("#class-page").innerHTML = `
    <div class="class-banner">${img(c.banner)}</div>
    <div class="wrap detail">
      <div>
        <a class="link" href="index.html#classes">← All classes</a>
        <h1>${c.title}</h1><p>${c.about}</p>
        <h3>What you will gain</h3><ul class="ticks">${c.benefits.map(b => `<li>${b}</li>`).join("")}</ul>
        <h3>What to bring</h3><p>${c.bring}</p>
      </div>
      <aside class="side">
        ${badge(c)}
        <p><b>Date</b><br>${c.date}</p><p><b>Time</b><br>${c.time}</p><p><b>Mode</b><br>${c.mode}</p>
        <p><b>Fee</b><br>${c.type === "Paid" ? c.price : "Free"}</p>
        <a class="btn block" href="${c.registerLink}" target="_blank" rel="noopener">Register Now</a>
      </aside>
    </div>`;
}
