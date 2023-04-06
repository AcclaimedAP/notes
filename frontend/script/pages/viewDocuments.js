import { readFromLocalstorage } from "../functions";
import { getDocumentsByAuthor } from "../services/documentsServices";
import { editDocument } from "./editDocuments";
import { navbar } from "./universal";


async function viewDocuments(dom) {
    navbar(dom);
    const res = await getDocumentsByAuthor(readFromLocalstorage("id"));
    const container = document.createElement('div');
    const ul = document.createElement('ul');
    container.appendChild(ul);
    res.forEach(obj => {
        const li = document.createElement('li');
        li.innerHTML = `#${obj.documentID} - ${obj.title}: ${obj.description}`
        
        ul.appendChild(li);

        li.addEventListener('click', function () {
            editDocument(dom, obj.documentID);
            container.remove();
        });
    });
    console.log(res);
    dom.appendChild(container);
}

export { viewDocuments }