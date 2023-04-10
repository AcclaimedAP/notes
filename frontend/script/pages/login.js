import { readFromLocalstorage, saveToLocalstorage } from "../functions";
import { loginRequest, registerRequest } from "../services/userServices";
import { navbar } from "./universal";

function loginPage(container) {
    const form = document.createElement('form');
    form.classList.add('login');
    const loginLabel = document.createElement('label');
    const usernameField = document.createElement('input');
    const passwordLabel = document.createElement('label');
    const passwordField = document.createElement('input');
    const submitButton = document.createElement('button');
    const register = document.createElement('p');
    register.innerHTML = "Register a new account";
    usernameField.setAttribute('type', 'text');
    passwordField.setAttribute('type', 'password');
    submitButton.innerHTML = 'Logga in';
    loginLabel.innerHTML = "Username";
    passwordLabel.innerHTML = "Password";
    loginLabel.appendChild(usernameField);
    passwordLabel.appendChild(passwordField);
    form.appendChild(loginLabel);
    form.appendChild(passwordLabel);
    form.appendChild(submitButton);
    form.appendChild(register);
    container.appendChild(form);
    
    submitButton.addEventListener('click', async function (e) {
        e.preventDefault();
        const res = await loginRequest(usernameField.value, passwordField.value);
        if (res.loginSuccessful) {
            saveToLocalstorage("sessionKey", res.sessionKey);
            form.remove();
            navbar(container);

        }
    });
    register.addEventListener('click', function () {
        form.remove();
        registerForm(container);
    });
}

function registerForm(container) {
    const form = document.createElement('form');
    form.classList.add('login');
    const loginLabel = document.createElement('label');
    const usernameField = document.createElement('input');
    const passwordLabel = document.createElement('label');
    const passwordField = document.createElement('input');
    const submitButton = document.createElement('button');
    const login = document.createElement('p');
    login.innerHTML = "Login instead";
    usernameField.setAttribute('type', 'text');
    passwordField.setAttribute('type', 'password');
    submitButton.innerHTML = 'Registrera';
    loginLabel.innerHTML = "Username";
    passwordLabel.innerHTML = "Password";
    loginLabel.appendChild(usernameField);
    passwordLabel.appendChild(passwordField);
    form.appendChild(loginLabel);
    form.appendChild(passwordLabel);
    form.appendChild(submitButton);
    form.appendChild(login);
    container.appendChild(form);
    
    submitButton.addEventListener('click', async function (e) {
        e.preventDefault();
        const res = await registerRequest(usernameField.value, passwordField.value);
        if (res.success) {
            form.remove();
            loginPage(container);

        }
    });
    login.addEventListener('click', function () {
        form.remove();
        loginPage(container);
    });
}

export { loginPage }