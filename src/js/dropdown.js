const avatar = document.querySelector(".avatar");
const dropdown = document.querySelector(".dropdown-content");

// Toggle dropdown visibility
avatar.addEventListener("click", () => {
	dropdown.classList.toggle("show");
});

// Close the dropdown when clicking outside the dropdown menu
document.addEventListener("click", (event) => {
	if (!avatar.contains(event.target) && !dropdown.contains(event.target)) {
		dropdown.classList.remove("show");
	}
});
