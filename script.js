document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Selection & Variables ---
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");
  const loginForm = document.getElementById("loginForm");
  const forgotForm = document.getElementById("forgotForm");
  const forgotLink = document.getElementById("forgotPassLink");
  const backToLoginBtn = document.getElementById("backToLogin");

  // --- 2. Panel Sliding Animation ---
  signUpButton.addEventListener("click", () =>
    container.classList.add("right-panel-active"),
  );
  signInButton.addEventListener("click", () =>
    container.classList.remove("right-panel-active"),
  );

  // --- 3. Forgot Password Switch ---
  forgotLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    forgotForm.classList.remove("hidden-form");
    forgotForm.style.display = "flex";
  });

  backToLoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    forgotForm.style.display = "none";
    loginForm.style.display = "flex";
  });

  // --- 4. Password Show/Hide Toggle (Fixed) ---
  const toggleIcons = document.querySelectorAll(".toggle-password");

  toggleIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      // Get the target input ID from data-target
      const targetId = this.getAttribute("data-target");
      const input = document.getElementById(targetId);

      if (input) {
        // Toggle type
        const type =
          input.getAttribute("type") === "password" ? "text" : "password";
        input.setAttribute("type", type);

        // Toggle icon class
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
      }
    });
  });

  // --- 5. Password Strength Meter ---
  const strengthMeter = document.getElementById("strengthMeter");
  const strengthText = document.getElementById("strengthText");
  const signUpPassInput = document.getElementById("signUpPass");

  // Only run if elements exist (in case you remove sign up form later)
  if (signUpPassInput && strengthMeter) {
    signUpPassInput.addEventListener("input", () => {
      const val = signUpPassInput.value;
      let score = 0;

      // Reset classes
      strengthMeter.className = "strength-meter";
      strengthText.innerText = "";

      if (val.length > 0) {
        // Criteria 1: Length >= 6
        if (val.length >= 6) score++;
        // Criteria 2: Contains numbers
        if (/\d/.test(val)) score++;
        // Criteria 3: Contains special chars or uppercase
        if (/[A-Z]/.test(val) || /[!@#$%^&*]/.test(val)) score++;

        // Update UI based on score
        if (score === 1) {
          strengthMeter.classList.add("weak");
          strengthText.innerText = "Weak";
          strengthText.style.color = "#ff4b47";
        } else if (score === 2) {
          strengthMeter.classList.add("medium");
          strengthText.innerText = "Medium";
          strengthText.style.color = "#f9bc00";
        } else if (score >= 3) {
          strengthMeter.classList.add("strong");
          strengthText.innerText = "Strong";
          strengthText.style.color = "#2ecc71";
        }
      }
    });
  }

  // --- 6. Form Validation ---
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Sign Up Validation
  const signUpFormElement = document.querySelector(".sign-up-container form");
  if (signUpFormElement) {
    signUpFormElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = signUpFormElement
        .querySelector('input[type="text"]')
        .value.trim();
      const email = signUpFormElement
        .querySelector('input[type="email"]')
        .value.trim();
      const password = signUpPassInput.value.trim();

      if (!name) return alert("Name required");
      if (!validateEmail(email)) return alert("Invalid Email");
      if (password.length < 6) return alert("Password too short");

      alert("Account Created!");
    });
  }

  // Sign In Validation
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('input[type="email"]').value.trim();
      const password = document.getElementById("signInPass").value.trim();

      if (!validateEmail(email)) return alert("Invalid Email");
      if (!password) return alert("Password required");

      alert("Logged In!");
    });
  }
});
