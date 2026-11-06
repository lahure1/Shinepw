const intro = document.querySelector("#wash-intro");
const introSkip = document.querySelector("#intro-skip");
const navToggle = document.querySelector("#nav-toggle");
const primaryNav = document.querySelector("#primary-nav");
const quoteForm = document.querySelector("#quote-form");

const finishIntro = () => {
  if (!intro || intro.dataset.finished === "true") return;
  intro.dataset.finished = "true";
  intro.classList.add("is-skipped");
  document.body.classList.remove("intro-active");
  window.setTimeout(() => intro.remove(), 400);
};

if (intro && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.body.classList.add("intro-active");
  introSkip?.addEventListener("click", finishIntro);
  window.setTimeout(finishIntro, 4100);
} else {
  intro?.remove();
}

const closeNavigation = () => {
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Open navigation");
  primaryNav?.classList.remove("is-open");
};

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  primaryNav?.classList.toggle("is-open", !isOpen);
});

primaryNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavigation();
    finishIntro();
  }
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!quoteForm.reportValidity()) return;

  const formData = new FormData(quoteForm);
  const name = String(formData.get("name") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const details = String(formData.get("details") || "").trim();

  const subject = `Quote request: ${service}`;
  const body = [
    "Hi Shine Pressure Wash,",
    "",
    `My name is ${name}${company ? ` from ${company}` : ""}.`,
    `My email is ${email}.`,
    "",
    `Service needed: ${service}`,
    "",
    "Job details:",
    details,
    "",
    "Please contact me to discuss a quote.",
  ].join("\n");

  window.location.href = `mailto:robin@shinepw.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelector("#year").textContent = String(new Date().getFullYear());
