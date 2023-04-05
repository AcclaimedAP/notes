import { navbar } from "./universal";

function editDocument(dom) {
    navbar(dom);
    const form = document.createElement('form');
    const titleInput = document.createElement('input');
    const descInput = document.createElement('textarea');
    const textarea = document.createElement('textarea');
    textarea.setAttribute('id', 'textContent');
    form.appendChild(titleInput);
    form.appendChild(descInput);
    form.appendChild(textarea);
    dom.appendChild(form);
    tinymce.init({
        selector: '#textContent'
    })
}


export { editDocument }