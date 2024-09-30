let countBtn = document.getElementById("btn");

let count = 0;

countBtn.addEventListener("click", () => {
	count++;
	countBtn.innerHTML = "Count: " + count;
});
