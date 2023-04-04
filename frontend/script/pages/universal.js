import { removeFromLocalstorage } from "../functions";
import { viewDocuments } from "./viewDocuments";

function navbar(dom) {
    const navbar = document.createElement('nav');
    const ul = document.createElement('ul');
    const createDocument = document.createElement('li');
    const viewDocs = document.createElement('li');
    const logout = document.createElement('li');
    ul.appendChild(createDocument);
    ul.appendChild(viewDocs);
    ul.appendChild(logout);
    navbar.appendChild(ul);

    createDocument.innerHTML = "Create new document";
    viewDocs.innerHTML = "View your documents";
    logout.innerHTML = "Logout";
    createDocument.addEventListener('click', function () {
        
    });
    viewDocs.addEventListener('click', function () {
        viewDocuments(dom);
    });
    logout.addEventListener('click', function () {
        removeFromLocalstorage('id');
        location.reload();
    });
    dom.appendChild(navbar);
}

export { navbar }