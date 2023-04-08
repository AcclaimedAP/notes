import { readFromLocalstorage, saveToLocalstorage } from "../functions";
import { loginRequest } from "../services/userServices";
import { navbar } from "./universal";

function loginPage(container) {
    const form = document.createElement('form');
    form.classList.add('login');
    const loginLabel = document.createElement('label');
    const usernameField = document.createElement('input');
    const passwordLabel = document.createElement('label');
    const passwordField = document.createElement('input');
    const submitButton = document.createElement('button');
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
    container.appendChild(form);

    submitButton.addEventListener('click', async function (e) {
        e.preventDefault();
        const res = await loginRequest(usernameField.value, passwordField.value);
        console.log(res);
        if (res.loginSuccessful) {
            saveToLocalstorage("id", res.id);
            form.remove();
            navbar(container);

        }
    });
}

export { loginPage }