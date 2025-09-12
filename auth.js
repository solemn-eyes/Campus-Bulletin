function isValidAdmission(adm) {
  // Example format: CI/00123/2025
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
