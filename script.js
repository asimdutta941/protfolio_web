document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle Logic
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const icon = themeToggle.querySelector("i");

  const savedTheme = localStorage.getItem("theme") || "light";
  body.setAttribute("data-theme", savedTheme);
  updateToggleIcon(savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateToggleIcon(newTheme);
  });

  function updateToggleIcon(theme) {
    if (theme === "dark") {
      icon.classList.replace("fa-moon", "fa-sun");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
    }
  }

  // Typing Effect for Hero Section
  const typingElement = document.getElementById("typing-text");
  const texts = [
    "Intern at YCSAS",
    "Frontend Enthusiast",
    "Creative Developer",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }
  type();

  // Intersection Observer for Fade-in Animations
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in").forEach((element) => {
    observer.observe(element);
  });

  // Form Validation
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }

      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Success Animation/Feedback
      const submitBtn = contactForm.querySelector("button");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Message Sent!";
      submitBtn.style.background = "#22c55e";
      contactForm.reset();

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = "";
      }, 3000);
    });
  }

  // Smooth Scroll for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
