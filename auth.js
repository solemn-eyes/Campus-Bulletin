// Making it interactable with some mock data
const formTitle = document.getElementById("formTitle");
const fullNameInput = document.getElementById("fullName");
const submitBtn = document.getElementById("submitBtn");
const toggleForm = document.getElementById("toggleForm");
let isLogin = true;

// Toggle between Login and Signup
toggleForm.addEventListener("click", () => {
  isLogin = !isLogin;
  if (isLogin) {
    formTitle.textContent = "Login";
    submitBtn.textContent = "Login";
    fullNameInput.style.display = "none";
    toggleForm.textContent = "Don't have an account? Sign Up";
  } else {
    formTitle.textContent = "Signup";
    submitBtn.textContent = "Sign Up";
    fullNameInput.style.display = "block";
    toggleForm.textContent = "Already have an account? Login";
  }
});

// Validate Admission

function isValidAdmission(adm) {
  
  const pattern = /^[A-Z]{3}\/\d{3,5}\/\d{3}$/;
  return pattern.test(adm);
}

document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const adm = e.target.querySelector("input[type='text']").value;

  if (!isValidAdmission(adm)) {
    alert("Invalid Admission Number! Use format: CI/00123/2025");
    return;
  }

  // Pretend login works
  window.location.href = "index.html";
});

document.getElementById("signupForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const adm = e.target.querySelectorAll("input")[1].value;

  if (!isValidAdmission(adm)) {
    alert("Invalid Admission Number! Use format: CI/00123/2025");
    return;
  }

  alert("Account created! Please log in.");
  window.location.href = "login.html";
});

// Handling the form submission
submitBtn.addEventListener("click", () => {
  const admissionNumber = document.getElementById("admissionNumber").value.trim();
  const password = document.getElementById("password").value.trim();
  const fullName = fullNameInput.value.trim();

  if (!admissionNumber || !password || (!isLogin && !fullName)) {
    alert("Please fill in all required fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");

  if(isLogin) {
    // Login flow
    if (users[admissionNumber] && users[admissionNumber].password === password) {
      alert(`Welcome back, ${users[admissionNumber].fullName}!`);
      window.location.href = "home.html";
    } else {
      alert("Invalid admission number or password.");
    }
  } else {
    // Signup flow
    if (users[admissionNumber]) {
      alert("Admission number already registered.");
    } else {
      users[admissionNumber] = { fullName, password };
      localStorage.setItem("users", JSON.stringify(users));
      alert("Account created successfully! You can now log in.");
      // Switch to login mode
      isLogin = true;
      formTitle.textContent = "Login";
      submitBtn.textContent = "Login";
      fullNameInput.style.display = "none";
      toggleForm.textContent = "Don't have an account? Sign Up";
    }
  }
});