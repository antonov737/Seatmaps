import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Add Seatmap");
    }

    async getHtml() {
        return `
            <h1>Enter name</h1>
            <form id="name" name-form>
                <input id="name-input" type="text" required>Enter name</input>
                <input type="submit"></input>
            </form>
        `
    }
}