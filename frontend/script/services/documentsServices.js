

function getDocumentsByAuthor(id) {

    return fetch('http://localhost:3000/documents/author/' + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then (res => res.json())
        .then(res => {
            return res;
    })
}

export { getDocumentsByAuthor }