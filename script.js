// // Typing animation
// const typed = new Typed(".typing", {
//   strings: ["Frontend Developer", "Learner", "Coder"],
//   typeSpeed: 80,
//   backSpeed: 40,
//   loop: true,
// });


// // Simple contact form
// const form = document.getElementById("contact-form");
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   document.getElementById("form-msg").textContent = "Message sent successfully!";
//   form.reset();
// });

// Typing animation
const typed = new Typed(".typing", {
  strings: ["Frontend Developer", "Learner", "Coder"],
  typeSpeed: 80,
  backSpeed: 40,
  loop: true,
});

// Contact form (Formspree version)
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", () => {
    // Success message IF Formspree redirects back
    const msg = document.getElementById("form-msg");
    if (msg) {
      msg.textContent = "Sending...";
    }
    // ❗IMPORTANT: NO preventDefault() HERE
    // Allow the form to submit normally to Formspree
  });
}

// Skills animation
const skills = document.querySelectorAll(".skill");
if (skills.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  skills.forEach((skill) => observer.observe(skill));
}



