// ===============================
// Smooth Scroll for Navbar Links
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ===============================
// Sticky Navbar on Scroll
// ===============================
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ===============================
// Fade-in Animation on Scroll
// ===============================
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// ===============================
// Contact Form (Formspree)
// ===============================
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);

    const result = document.createElement("p");
    result.style.marginTop = "10px";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      });

      if (res.ok) {
        result.textContent = "✅ Message sent successfully!";
        result.style.color = "green";
        form.reset();
      } else {
        result.textContent = "❌ Oops! Something went wrong.";
        result.style.color = "red";
      }
    } catch (err) {
      result.textContent = "⚠️ Network error, please try again.";
      result.style.color = "red";
    }

    form.appendChild(result);
  });
}
