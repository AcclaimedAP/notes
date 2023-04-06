async function getDocumentsByDocumentId(id) {
    const res = await fetch('http://localhost:3000/documents/doc/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const res_1 = await res.json();
    return res_1;
}

async function getDocumentsByAuthor(id) {

    const res = await fetch('http://localhost:3000/documents/author/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const res_1 = await res.json();
    return res_1;
}

async function postNewDocument(id, docTitle = "New document", docDesc = "", docContent = "") {
    const doc = {
        authorId: id,
        title: docTitle,
        description: docDesc,
        content: docContent
    };
    const res = await fetch('http://localhost:3000/documents/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doc)
    });
    const res_1 = await res.json();
    return res_1;
}

async function updateDocument(docid, docTitle = "New document", docDesc = "", docContent = "") {
    const doc = {
        id: docid,
        title: docTitle,
        description: docDesc,
        content: docContent
    };
    const res = await fetch('http://localhost:3000/documents/edit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(doc)
    });
    const res_1 = await res.json();
    return res_1;
}

export { getDocumentsByDocumentId, getDocumentsByAuthor, postNewDocument, updateDocument }