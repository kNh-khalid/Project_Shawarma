function toggleMenu() {
    var menuElement = document.getElementById("header-right-menu");
    if (menuElement.style.display === "block") {
        menuElement.style.display = "none";
    } else {
        menuElement.style.display = "block";
    }
}

document.querySelector('form').addEventListener('submit', function(event) {
event.preventDefault(); // Prevent the form from submitting
alert('Your message has been submitted!');
});
