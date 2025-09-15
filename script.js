// Sticky Header
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if(window.scrollY > 50) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});

// Fade-in sections
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold:0.2, rootMargin:"0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
hamburger.addEventListener("click", ()=> nav.classList.toggle("active"));

// Smooth scroll for Hire Me button
document.querySelectorAll('.btn-outline').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
    contactSection.querySelector('input[name="email"]').focus();
  });
});

// Formspree
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
form.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const formData = new FormData(form);
  try{
    const response = await fetch(form.action,{
      method: form.method,
      body: formData,
      headers:{'Accept':'application/json'}
    });
    if(response.ok){
      formMessage.style.display="block";
      formMessage.style.color="#4BB543";
      formMessage.textContent="Thank you! Your message has been sent.";
      form.reset();
    } else {
      formMessage.style.display="block";
      formMessage.style.color="#e50914";
      formMessage.textContent="Oops! Something went wrong. Please try again.";
    }
  } catch(err){
    formMessage.style.display="block";
    formMessage.style.color="#e50914";
    formMessage.textContent="Oops! Something went wrong. Please try again.";
  }
});

// Mobile Profile Image Animation
window.addEventListener("load", ()=>{
  if(window.innerWidth <= 768){
    const mobileImg = document.querySelector(".hero-img.mobile-top");
    mobileImg.classList.add("animate-mobile-img");
  }
});

// Footer Year
document.getElementById("year").textContent = new Date().getFullYear();


