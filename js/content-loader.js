// js/content-loader.js

// Determine base path
const basePath = location.pathname.includes('/pages/') ? '../' : '';

// Improved Frontmatter Parser
function parseFrontmatter(mdText) {
  const frontmatterMatch = mdText.match(/^---\s*([\s\S]*?)\s*---/);
  if (!frontmatterMatch) return {};

  const yaml = frontmatterMatch[1].trim();
  const lines = yaml.split('\n');
  const data = {};

  lines.forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length > 0) {
      data[key.trim()] = rest.join(':').trim();
    }
  });

  return data;
}

// === Load Homepage Intro ===
function loadHomeIntro() {
  fetch(`${basePath}data/homepage/intro.md`)
    .then(res => res.text())
    .then(md => {
      const data = parseFrontmatter(md);
      const headingEl = document.getElementById('home-heading');
      const subheadingEl = document.getElementById('home-subheading');

      if (headingEl && data.heading) headingEl.textContent = data.heading;
      if (subheadingEl && data.subheading) subheadingEl.textContent = data.subheading;
    })
    .catch(err => console.error("Failed to load homepage intro:", err));
}

// === Load Contact Info ===
function loadContactInfo() {
  fetch(`${basePath}data/contact/details.md`)
    .then(res => res.text())
    .then(md => {
      const data = parseFrontmatter(md);
      const emailEl = document.getElementById('contact-email');
      const phoneEl = document.getElementById('contact-phone');
      const whatsappEl = document.getElementById('contact-whatsapp');

      if (emailEl && data.email) emailEl.textContent = data.email;
      if (phoneEl && data.phone) phoneEl.textContent = data.phone;
      if (whatsappEl && data.whatsapp) {
        whatsappEl.href = data.whatsapp;
        whatsappEl.textContent = "Chat on WhatsApp";
      }
    })
    .catch(err => console.error("Failed to load contact info:", err));
}
