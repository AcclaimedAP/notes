import { readFromLocalstorage } from "../functions";
import { getDocumentsByDocumentId, postNewDocument, updateDocument } from "../services/documentsServices";
import { navbar } from "./universal";

function createDocument(dom) {
    navbar(dom);
    const form = document.createElement('form');
    form.classList.add('documentEditor');
    const titleLabel = document.createElement('label');
    titleLabel.innerHTML = "Title"
    const titleInput = document.createElement('input');
    const descLabel = document.createElement('label');
    descLabel.innerHTML = "Description";
    const descInput = document.createElement('input');
    const textarea = document.createElement('textarea');
    const submit = document.createElement('button');
    submit.classList.add('save');
    textarea.setAttribute('id', 'textContent');
    titleLabel.appendChild(titleInput);
    descLabel.appendChild(descInput);
    form.appendChild(titleLabel);
    form.appendChild(descLabel);
    form.appendChild(textarea);
    form.appendChild(submit);
    dom.appendChild(form);
    submit.innerHTML = 'Save';
    tinymce.init({
        selector: '#textContent',
        plugins: "code",
        toolbar: "undo redo | forecolor backcolor | styleselect bold italic | alignleft aligncenter alignright | code",
        setup: function (editor) {
            editor.on("change", function () {
                editor.save();
            })
        }
    })

    submit.addEventListener('click', async function (e) {
        e.preventDefault();
        var content = tinymce.get('textContent').getContent();
        const response = await postNewDocument(readFromLocalstorage("sessionKey"), titleInput.value, descInput.value, content);
        console.log(response);
        if (response.success) {
            tinymce.remove('#textContent');
            form.remove();
        }
    });
}
async function editDocument(dom, id) {
    const res = await getDocumentsByDocumentId(id);
    const form = document.createElement('form');
    form.classList.add('documentEditor');
    const titleLabel = document.createElement('label');
    titleLabel.innerHTML = "Title"
    const titleInput = document.createElement('input');
    const descLabel = document.createElement('label');
    descLabel.innerHTML = "Description";
    const descInput = document.createElement('input');
    const textarea = document.createElement('textarea');
    const submit = document.createElement('button');
    submit.classList.add('save');
    textarea.setAttribute('id', 'textContent');
    titleLabel.appendChild(titleInput);
    descLabel.appendChild(descInput);
    form.appendChild(titleLabel);
    form.appendChild(descLabel);
    form.appendChild(textarea);
    form.appendChild(submit);
    dom.appendChild(form);
    submit.innerHTML = 'Save';
    textarea.value = res[0].content;
    tinymce.init({
        selector: '#textContent',
        plugins: "code",
        toolbar: "undo redo | forecolor backcolor | styleselect bold italic | alignleft aligncenter alignright | code",
        setup: function (editor) {
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
        if (response.success) {
            tinymce.remove('#textContent');
            form.remove();
        }
    });
}



export { createDocument, editDocument }