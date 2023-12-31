import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Locate Seatmap by Origin/Destination");
    }

    async getHtml() {
        return `
            <h1>The following is the locate by Origin/Destination page</h1>
        `;
    }
}