import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("About Us");
    }

    async getHtml() {
        return `
            <h1>The following is the locate by Origin/Destination page</h1>
        `;
    }
}