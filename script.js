const categories = document.querySelectorAll("aside li");
const cards = document.querySelectorAll(".announcement-card");

categories.forEach(cat => {
    cat.addEventListener("click", () => {
        const selected = cat.getAttribute("data-category");

        cards.forEach(card => {
            if (selected === "all" || card.dataset.category === selected) {
                card.style.display = "block";
                card.style.opacity = "0";
                setTimeout(() => {
                    card.style.opacity = "1";
                }, 100);
            } else {
                card.style.display = "none";
            }
        });
    });
});

// Check if a student is logged in
if (users[admissionNumber] && users[admissionNumber].password === password) {
    // Save current user to localStorage
    localStorage.setItem("currentUser", JSON.stringify(users[admissionNumber]));
    // Redirect to home page
    window.location.href = "home.html";
}