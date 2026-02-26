// Main Logic

// 1. Render Content
function renderProjects() {
  const container = document.getElementById("projects-container");
  PROJECTS.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-img">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
                </div>
                <a href="${project.link}" class="project-link">View Project →</a>
            </div>
        `;
    container.appendChild(card);
  });
}

function renderInternship() {
  const container = document.getElementById("internship-container");
  INTERNSHIP.forEach((exp, index) => {
    const item = document.createElement("div");
    item.className = "project-card";
    item.innerHTML = `
            <div class="project-info">
                <h3>${exp.role}</h3>
                <h4 style="color: var(--text-color); margin-bottom: 0.5rem; font-weight: 500;">${exp.company}</h4>
                <span style="display: block; font-size: 0.85rem; color: var(--primary-color); margin-bottom: 1rem;">${exp.date}</span>
                <p>${exp.description}</p>
            </div>
        `;
    container.appendChild(item);
  });
}

function renderEducation() {
  const container = document.getElementById("education-container");
  EDUCATION.forEach((edu, index) => {
    const item = document.createElement("div");
    item.className = "project-card";
    item.innerHTML = `
            <div class="project-info">
                <h3 style="font-size: 1.3rem;">${edu.degree}</h3>
                <h4 style="color: var(--text-color); margin-bottom: 0.5rem; font-weight: 500;">${edu.institution}</h4>
                <span style="display: block; font-size: 0.85rem; color: var(--primary-color); margin-bottom: 1rem;">${edu.date}</span>
                <p style="margin-bottom: 0.5rem;">${edu.board}</p>
                <div class="tech-stack" style="margin-bottom: 0;">
                    <span class="tech-tag" style="background: rgba(168, 85, 247, 0.2); font-weight: 600;">Score: ${edu.percentage}</span>
                </div>
            </div>
        `;
    container.appendChild(item);
  });
}

function renderSkills() {
  const container = document.getElementById("skills-container");

  // Group skills by category
  const grouped = {};
  SKILLS.forEach((skill) => {
    if (!grouped[skill.category]) grouped[skill.category] = [];
    grouped[skill.category].push(skill);
  });

  Object.entries(grouped).forEach(([category, skills]) => {
    // Category label
    const label = document.createElement("div");
    label.className = "skills-category-label";
    label.textContent = category;
    container.appendChild(label);

    // Skills row for this category
    const row = document.createElement("div");
    row.className = "skills-row";

    skills.forEach((skill) => {
      const card = document.createElement("div");
      card.className = "skill-card";
      card.innerHTML = `
                <img src="${skill.icon}" alt="${skill.name}" class="skill-icon">
                <span class="skill-name">${skill.name}</span>
            `;
      row.appendChild(card);
    });

    container.appendChild(row);
  });
}

function renderContact() {
  const container = document.getElementById("contact-container");
  const { email, linkedin, github, phone } = USER_DATA.social;

  const contacts = [
    { icon: "✉️", info: email, link: `mailto:${email}` },
    { icon: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-1.4 0-2.1.75-2.5 1.34V9H10v9h3v-4.92c0-1.28.24-2.52 1.84-2.52c1.58 0 1.6 1.48 1.6 2.6V18.5h3ZM6.5 7.9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM8 18.5V9H5v9h3Z"/></svg>`, info: "LinkedIn", link: linkedin },
    { icon: "💻", info: "GitHub", link: github },
    { icon: "📞", info: phone, link: `tel:${phone}` },
  ];

  contacts.forEach((contact) => {
    if (contact.info) {
      const item = document.createElement("a");
      item.href = contact.link;
      item.className = "contact-item";
      item.innerHTML = `
                <div class="contact-icon">${contact.icon}</div>
                <div class="contact-info">${contact.info}</div>
            `;
      container.appendChild(item);
    }
  });
}

function renderHero() {
  document.querySelector(".highlight-name").textContent = USER_DATA.name;
  document.querySelector(".hero-bio").textContent = USER_DATA.bio;
  document.getElementById("resume-btn").href = USER_DATA.resumeLink;

  // Code block typing simulation
  const codeBlock = document.getElementById("code-block");
  const codeText = `const developer = {
    name: "${USER_DATA.name}",
    role: "${USER_DATA.role}",
    skills: ["Code", "Design", "Solve"],
    hardWorker: true
};`;
  codeBlock.textContent = codeText;
}

// 2. Animations & Interactivity
function typeEffect(element, text, speed = 100) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

function initAnimations() {
  // Typing effect for Hero Title
  const typingText = document.querySelector(".typing-text");
  typeEffect(typingText, USER_DATA.role, 100);

  // Loader
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    loader.classList.add("hidden");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  });

  // Mobile Menu
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    // Animate hamburger lines if needed
  });

  // Smooth Scroll & Active Link
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      navLinks.classList.remove("active"); // Close mobile menu
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Scroll Observer for Fade In
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 },
  );

  // Apply observer to sections
  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.6s ease-out";
    observer.observe(section);
  });
}

function renderCertifications() {
  const container = document.getElementById("certifications-container");
  CERTIFICATIONS.forEach((cert) => {
    const card = document.createElement("div");
    card.className = "cert-card";
    card.innerHTML = `
            <h3 class="cert-title">${cert.title}</h3>
            <span class="cert-issuer">${cert.issuer} | ${cert.date}</span>
            <p class="cert-desc">${cert.description}</p>
        `;
    container.appendChild(card);
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderProjects();
  renderInternship();
  renderEducation();
  renderCertifications();
  renderSkills();
  renderContact();
  initAnimations();
});
