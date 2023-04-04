

function loginRequest(name, pass) {
    const user = {
        username: name,
        password: pass
    }
    return fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then (res => res.json())
        .then(res => {
            console.log(res);
            return res;
    })
}

export { loginRequest }