import { removeFromLocalstorage } from "../functions";
import { logoutRequest } from "../services/userServices";
import { createDocument } from "./editDocuments";
import { viewDocuments } from "./viewDocuments";

function navbar(dom) {
    const navbar = document.createElement('nav');
    const ul = document.createElement('ul');
    const createDoc = document.createElement('li');
    const viewDocs = document.createElement('li');
    const logout = document.createElement('li');
    ul.appendChild(createDoc);
    ul.appendChild(viewDocs);
    ul.appendChild(logout);
    navbar.appendChild(ul);

    createDoc.innerHTML = "Create new document";
    viewDocs.innerHTML = "View your documents";
    logout.innerHTML = "Logout";
    createDoc.addEventListener('click', function () {
        tinymce.remove('#textContent');
        dom.innerHTML = "";
        createDocument(dom);
    });
    viewDocs.addEventListener('click', function () {
        tinymce.remove('#textContent');
        dom.innerHTML = "";
        viewDocuments(dom);

    });
    logout.addEventListener('click', async function () {
        tinymce.remove('#textContent');
        const res = await logoutRequest();
        if (res.loggedOut){
            removeFromLocalstorage('sessionKey');
            location.reload();
        }
    });
    dom.appendChild(navbar);
}

function popupBox(content, closeText = "Ok") {
    const container = document.getElementById('popupContainer');
    const popup = document.createElement('div');
    const text = document.createElement('p');
    const closeButton = document.createElement('button');
    text.innerHTML = content;
    closeButton.innerHTML = closeText;
    popup.appendChild(text);
    popup.appendChild(closeButton);
    container.appendChild(popup);

    closeButton.addEventListener('click', function () {
        popup.remove();
    });
    setTimeout(() => {
        popup.remove();
    }, 10000);
}

export { navbar, popupBox }