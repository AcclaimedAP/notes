import { readFromLocalstorage } from "../functions";
import { getDocumentsByAuthor } from "../services/documentsServices";


async function viewDocuments(dom) {
    const res = await getDocumentsByAuthor(readFromLocalstorage("id"));
    const container = document.createElement('div');
    const ul = document.createElement('ul');
    container.appendChild(ul);
    res.forEach(obj => {
        const li = document.createElement('li');
        li.innerHTML = `#${obj.documentID} - ${obj.title}: ${obj.description}`
        ul.appendChild(li);
    });
    console.log(res);
    dom.appendChild(container);
}

export { viewDocuments }