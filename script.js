// Inicializa a lista de usuários no Local Storage
let users = JSON.parse(localStorage.getItem('users')) || [];

function toggleRegistration() {
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    loginContainer.style.display = loginContainer.style.display === 'none' ? 'block' : 'none';
    registerContainer.style.display = registerContainer.style.display === 'none' ? 'block' : 'none';
}

function registerUser() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (users.some(user => user.username === username)) {
        document.getElementById('register-error').textContent = 'Usuário já existe!';
    } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Usuário registrado com sucesso!');
        toggleRegistration();  // Volta para a tela de login
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
    } else {
        document.getElementById('login-error').textContent = 'Usuário ou senha incorretos!';
    }
}
