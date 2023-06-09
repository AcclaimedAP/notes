import { readFromLocalstorage } from "../functions";


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
            return res;
    })
}

function registerRequest(name, pass) {
    const user = {
        username: name,
        password: pass
    }
    return fetch('http://localhost:3000/users/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then (res => res.json())
        .then(res => {
            return res;
    })
}

function logoutRequest() {
    const session = { sessionKey: readFromLocalstorage('sessionKey')}
    return fetch('http://localhost:3000/users/logout', {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(session)
    }).then (res => res.json())
        .then(res => {
            return res;
    })
}

export { loginRequest, registerRequest, logoutRequest }