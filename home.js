// Check if a student is logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      // Redirect to login if not logged in
      window.location.href = "index.html";
    } else {
      // Show welcome message
      document.getElementById("welcomeMsg").textContent = `Welcome, ${currentUser.fullName}!`;
    }

    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
    
    