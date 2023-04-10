import { readFromLocalstorage } from "../functions";

function getDocumentsByDocumentId(id) {
    console.log(id);
    return fetch('http://localhost:3000/documents/doc/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(res => {
            return res;
        });
}

function getDocumentsByAuthor() {
    const session = { sessionKey: readFromLocalstorage('sessionKey')}
    return fetch('http://localhost:3000/documents/author', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(session)
    }).then (res => res.json())
        .then(res => {
            return res;
    })
}

function postNewDocument(key, docTitle = "New document", docDesc = "", docContent = "") {
    const doc = {
        sessionKey: key,
        title: docTitle,
        description: docDesc,
        content: docContent
    };
    return fetch('http://localhost:3000/documents/new', {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doc)
    }).then (res => res.json())
        .then(res => {
            return res;
    })
}

function updateDocument(docid, docTitle = "New document", docDesc = "", docContent = "") {
    const doc = {
        id: docid,
        title: docTitle,
        description: docDesc,
        content: docContent
    };
    return fetch('http://localhost:3000/documents/edit', {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doc)
    }).then (res => res.json())
        .then(res => {
            return res;
    })
}

export { getDocumentsByDocumentId, getDocumentsByAuthor, postNewDocument, updateDocument }