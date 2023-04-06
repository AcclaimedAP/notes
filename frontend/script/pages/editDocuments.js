import { readFromLocalstorage } from "../functions";
import { getDocumentsByDocumentId, postNewDocument, updateDocument } from "../services/documentsServices";
import { navbar } from "./universal";

function createDocument(dom) {
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
            tinymce.remove('#textContent');
            form.remove();
        }
    });
}
async function editDocument(dom, id) {
    const res = await getDocumentsByDocumentId(id);
    console.log(res);
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
    textarea.value = res[0].content;
    tinymce.init({
        selector: '#textContent',

        setp: function (editor) {
            editor.on("change", function () {
                editor.save();
            })
        }
    })
    titleInput.value = res[0].title;
    descInput.value = res[0].description;
    //tinymce.get('textContent').setContent(res[0].content);
    submit.addEventListener('click', async function (e) {
        e.preventDefault();
        var content = tinymce.get('textContent').getContent();
        const response = await updateDocument(res[0].documentID, titleInput.value, descInput.value, content);
        console.log(response);
        if (response.success) {
            tinymce.remove('#textContent');
            form.remove();
        }
    });
}



export { createDocument, editDocument }