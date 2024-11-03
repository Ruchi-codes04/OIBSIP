const registerForm = document.getElementById('registerForm'); 
const loginForm = document.getElementById('loginForm');
const securedPage = document.getElementById('securedPage');
const welcomeMessage = document.getElementById('welcomeMessage');
const logoutButton = document.getElementById('logoutButton');
const authDiv = document.getElementById('auth');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

//Register form
showRegister.addEventListener('click', function(e) {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});

//Login form
showLogin.addEventListener('click', function(e) {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});

// registration
registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    //localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
        alert('User already exists!');
    } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! You can now log in.');
        registerForm.reset();
        // Switch back to the login form after registration
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    }
});

// login
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Login successful!');
        authDiv.classList.add('hidden');
        securedPage.classList.remove('hidden');
        welcomeMessage.textContent = username;
    } else {
        alert('Invalid username or password!');
    }
});

// logout
logoutButton.addEventListener('click', function () {
    securedPage.classList.add('hidden');
    authDiv.classList.remove('hidden');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
});
