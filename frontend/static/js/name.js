export default class {
    static NameUpdater (name) {
        const div = document.getElementById("app")
        div.innerHTML += `<h1>${name}</h1>`
    }
}