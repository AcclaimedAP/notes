import { readFromLocalstorage } from "../functions";
import { postNewDocument } from "../services/documentsServices";
import { navbar } from "./universal";

function editDocument(dom) {
    navbar(dom);
    const form = document.createElement('form');
    const titleInput = document.createElement('input');
    const descInput = document.createElement('textarea');
    const textarea = document.createElement('textarea');
    const submit = document.createElement('button');
    textarea.setAttribute('id', 'textContent');
    form.appendChild(titleInput);
    form.appendChild(descInput);
    form.appendChild(textarea);
    form.appendChild(submit);
    dom.appendChild(form);
    submit.innerHTML = 'Save';
    tinymce.init({
        selector: '#textContent',

        setp: function (editor) {
            editor.on("change", function () {
                editor.save();
            })
        }
    })

    submit.addEventListener('click', async function (e) {
        e.preventDefault();
        var content = tinymce.get('textContent').getContent();
        const response = await postNewDocument(readFromLocalstorage("id"), titleInput.value, descInput.value, content);
        console.log(response);
        if (response.success) {
            form.remove();
        }
    });
}


export { editDocument }