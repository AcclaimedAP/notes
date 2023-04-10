import { readFromLocalstorage } from "../functions";
import { getDocumentsByAuthor, getDocumentsByDocumentId } from "../services/documentsServices";
import { editDocument } from "./editDocuments";
import { navbar } from "./universal";


async function viewDocuments(dom) {
    navbar(dom);
    const res = await getDocumentsByAuthor(readFromLocalstorage("id"));
    const container = document.createElement('div');
    container.classList.add('documentList')
    const ul = document.createElement('ul');
    container.appendChild(ul);
    //res.forEach(obj => {
    for (let obj of res) {
        console.log(obj);
        const li = document.createElement('li');
        const editLink = document.createElement('a');
        li.innerHTML = `#${obj.documentID} - ${obj.title}: ${obj.description}`
        editLink.innerHTML = "Edit"
        ul.appendChild(li);
        ul.appendChild(editLink);

        editLink.addEventListener('click', function () {
            dom.innerHTML = "";
            navbar(dom);
            editDocument(dom, obj.documentID);
            
            
        });
        li.addEventListener('click', function () {
            dom.innerHTML = "";
            navbar(dom);
            showDocument(dom, obj.documentID);
            
        });
    };
    console.log(res);
    dom.appendChild(container);
}

async function showDocument(dom, id) {
    console.log(id);
    const res = await getDocumentsByDocumentId(id);
    console.log(res);
    const container = document.createElement('div');
    container.classList.add('showDocument');
    const title = document.createElement('h1');
    title.classList.add('title');
    const description = document.createElement('p');
    description.classList.add('description');
    const docContent = document.createElement('div');

    title.innerHTML = res[0].title;
    description.innerHTML = res[0].description;
    docContent.innerHTML = res[0].content;


    container.appendChild(title);
    container.appendChild(description);
    container.appendChild(docContent);
    dom.appendChild(container);
}

export { viewDocuments, showDocument }