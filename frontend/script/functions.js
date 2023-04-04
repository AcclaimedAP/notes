
function saveToLocalstorage(key, string) {
    localStorage.setItem(key, string);
}
function readFromLocalstorage(key) {
    return localStorage.getItem(key);
}
function removeFromLocalstorage(key) {
    localStorage.removeItem(key);
}


export { saveToLocalstorage, readFromLocalstorage, removeFromLocalstorage }