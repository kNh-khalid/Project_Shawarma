function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.src = "/img/eye_open.png"; 
        eyeIcon.alt = "Hide Password";
       
    } else {
        passwordInput.type = 'password';
        eyeIcon.src = "/img/eye_close.png"; // Switch back to eye-open image
        eyeIcon.alt = "Show Password";
        
    }
}
function redirectHome(){
    window.location.href = '/HTML/redirect-home.html';
}

