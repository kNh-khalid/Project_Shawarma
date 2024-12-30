// Select the checkbox
const darkModeToggle = document.getElementById('darkModeToggle');
const topnav = document.getElementById('topnav');
// Add event listener to toggle dark mode
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', darkModeToggle.checked);
    topnav.classList.toggle('dark-mode',darkModeToggle.checked);
});
