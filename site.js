// I2C Logistic — shared header, footer and forms for every page.

// ---- Edit your business details here (used on every page) ----
const CONFIG = {
  brand: "I2C Logistic",
  legalName: "I2C Logistic",                 // registered business name for legal pages
  phone: "+91 92892 69144",                  // shown on the page
  whatsapp: "919289269144",                  // country code + number, digits only
  email: "info@i2clogistic.com",
  address: "Kirti Nagar,<br>New Delhi – 110015",
  city: "New Delhi",                          // courts' jurisdiction in Terms
  hours: "Mon–Sat, 10:00 am – 6:00 pm IST",
  gstin: "GSTIN to be added",
  iec: "IEC to be added",
  updated: "4 October 2026"                  // "last updated" date on legal pages
};
// ---------------------------------------------------------------

const SERVICES = [
  { slug: "sea-freight", code: "SVC-01", name: "Sea freight", blurb: "LCL and full-container shipping from every major Chinese port to Indian ports." },
  { slug: "air-freight", code: "SVC-02", name: "Air freight", blurb: "Air cargo and express for urgent, light or high-value goods, landed in 7–10 days." },
  { slug: "customs-clearance", code: "SVC-03", name: "Customs clearance", blurb: "HS classification, Bill of Entry, duty and IGST payment, and port release." },
  { slug: "sourcing", code: "SVC-04", name: "Sourcing & buying agent", blurb: "We find and verify suppliers, negotiate prices and pay them safely for you." },
  { slug: "inspection-warehousing", code: "SVC-05", name: "Inspection & warehousing", blurb: "Free China warehouse, carton checks, quality inspection and consolidation." },
  { slug: "door-delivery", code: "SVC-06", name: "Door-to-door delivery", blurb: "All-inclusive DDP pricing: one rate from supplier to any PIN code in India." }
];

const page = document.body.dataset.page || "";
const svcHref = s => "service-" + s.slug + ".html";
const cur = p => (page === p || (p === "services" && page.startsWith("service")) ? ' aria-current="page"' : "");
const LOGO = '<span class="logo-mark" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="3" y="7" width="18" height="11" rx="1"/><path d="M7 7v11M11 7v11M15 7v11M19 7v11"/></svg></span>' + CONFIG.brand;
const NAV = [["index.html", "home", "Home"], ["services.html", "services", "Services"], ["about.html", "about", "About us"], ["contact.html", "contact", "Contact"]];

const header = document.getElementById("site-header");
if (header) header.outerHTML = `
<header>
  <div class="wrap nav">
    <a class="logo" href="index.html">${LOGO}</a>
    <nav class="nav-links" aria-label="Main">${NAV.map(([h, p, t]) => `<a href="${h}"${cur(p)}>${t}</a>`).join("")}</nav>
    <div class="nav-cta">
      <a class="btn btn-ghost" data-tel href="#">Call now</a>
      <a class="btn btn-yellow" href="contact.html#quote">Get a free quote</a>
    </div>
  </div>
  <nav class="mnav" aria-label="Main (mobile)"><div class="wrap">${NAV.map(([h, p, t]) => `<a href="${h}"${cur(p)}>${t}</a>`).join("")}</div></nav>
</header>
<div class="strip"><div class="wrap">Trouble ordering from Alibaba? Need an agent in China? <span>Call us</span> <b data-phone></b></div></div>`;

const footer = document.getElementById("site-footer");
if (footer) footer.outerHTML = `
<footer>
  <div class="hazard"></div>
  <div class="wrap foot">
    <div>
      <a class="logo" href="index.html">${LOGO}</a>
      <p>Done-for-you imports from China for Indian sellers and businesses, from supplier to doorstep.</p>
      <p style="margin-top:10px">IEC registered · fully insured</p>
    </div>
    <div>
      <h4>Services</h4>
      <ul>${SERVICES.map(s => `<li><a href="${svcHref(s)}">${s.name}</a></li>`).join("")}</ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul>
        <li><a href="about.html">About us</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="privacy-policy.html">Privacy policy</a></li>
        <li><a href="terms.html">Terms &amp; conditions</a></li>
        <li><a href="shipping-refund-policy.html">Shipping &amp; refund policy</a></li>
      </ul>
    </div>
    <div>
      <h4>Get in touch</h4>
      <p data-phone></p>
      <p data-email></p>
      <address data-address style="margin-top:10px"></address>
    </div>
  </div>
  <div class="wrap legal"><span>© ${new Date().getFullYear()} ${CONFIG.legalName}. All rights reserved.</span><span>Door-to-door imports from China across India</span></div>
</footer>
<a class="btn btn-yellow float" href="${page === "home" ? "#callback" : "contact.html#quote"}">Get a call back</a>`;

// "Other services" cards on service pages
const more = document.getElementById("more-services");
if (more) more.innerHTML = SERVICES.filter(s => s.slug !== more.dataset.current).slice(0, 3)
  .map(s => `<a class="svc" href="${svcHref(s)}"><span class="code">${s.code}</span><h3>${s.name}</h3><p>${s.blurb}</p><span class="more">Read more</span></a>`).join("");

// Fill business details
const digits = s => s.replace(/\D/g, "");
const waLink = text => "https://wa.me/" + CONFIG.whatsapp + (text ? "?text=" + encodeURIComponent(text) : "");
const fill = (sel, fn) => document.querySelectorAll(sel).forEach(fn);
fill("[data-phone]", el => el.textContent = CONFIG.phone);
fill("[data-email]", el => el.textContent = CONFIG.email);
fill("[data-address]", el => el.innerHTML = CONFIG.address);
fill("[data-brand]", el => el.textContent = CONFIG.brand);
fill("[data-legal]", el => el.textContent = CONFIG.legalName);
fill("[data-city]", el => el.textContent = CONFIG.city);
fill("[data-hours]", el => el.textContent = CONFIG.hours);
fill("[data-gstin]", el => el.textContent = CONFIG.gstin);
fill("[data-iec]", el => el.textContent = CONFIG.iec);
fill("[data-updated]", el => el.textContent = CONFIG.updated);
fill("[data-tel]", el => el.href = "tel:+" + digits(CONFIG.phone));
fill("[data-wa]", el => el.href = waLink(el.dataset.wa || "Hi, I want to import goods from China to India."));
fill("[data-mailto]", el => el.href = "mailto:" + CONFIG.email);

// CBM calculator
const cbmInputs = ["c-l", "c-w", "c-h", "c-n"].map(id => document.getElementById(id));
const cbmOut = document.getElementById("c-out");
function cbm() {
  if (!cbmOut) return 0;
  const [l, w, h, n] = cbmInputs.map(i => Math.max(0, parseFloat(i.value) || 0));
  const v = (l * w * h * n) / 1e6;
  cbmOut.textContent = v.toFixed(2) + " CBM";
  return v;
}
if (cbmOut) { cbmInputs.forEach(i => i.addEventListener("input", cbm)); cbm(); }

// Call-back form
const cb = document.getElementById("callback");
if (cb) cb.addEventListener("submit", e => {
  e.preventDefault();
  const n = digits(document.getElementById("cb-phone").value);
  const msg = document.getElementById("cb-msg");
  msg.hidden = false;
  if (!/^[6-9]\d{9}$/.test(n)) { msg.textContent = "Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9."; return; }
  msg.innerHTML = 'Number noted. <a href="' + waLink("Please call me back on +91 " + n + " about importing from China.") + '" target="_blank" rel="noopener">Send it to us on WhatsApp</a> and we will call you.';
});

// Quote form
const qf = document.getElementById("quote-form");
if (qf) qf.addEventListener("submit", e => {
  e.preventDefault();
  const v = id => (document.getElementById(id) || { value: "" }).value.trim();
  const req = ["q-name", "q-phone", "q-item"];
  req.forEach(id => document.getElementById(id).classList.toggle("bad", !v(id)));
  const missing = req.filter(id => !v(id));
  if (missing.length) { document.getElementById(missing[0]).focus(); return; }
  const text = [
    "Quotation request",
    "Name: " + v("q-name"),
    "Mobile: +91 " + digits(v("q-phone")),
    "Item: " + v("q-item"),
    "Service: " + (v("q-service") || "-"),
    "Delivery city: " + (v("q-city") || "-"),
    "Invoice value: " + (v("q-value") || "-"),
    "Mode: " + v("q-mode"),
    "Volume: " + cbm().toFixed(2) + " CBM"
  ].join("\n");
  document.getElementById("q-send").href = waLink(text);
  document.getElementById("q-result").hidden = false;
});

// Pre-select a service on the contact form from a link like contact.html#quote-sea-freight
const svcSel = document.getElementById("q-service");
if (svcSel) {
  svcSel.innerHTML = '<option value="">Not sure yet</option>' + SERVICES.map(s => `<option>${s.name}</option>`).join("");
  const m = location.hash.match(/^#quote-(.+)$/);
  const hit = m && SERVICES.find(s => s.slug === m[1]);
  if (hit) { svcSel.value = hit.name; document.getElementById("quote").scrollIntoView(); }
}
