import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Home");
    }

    async getHtml() {
        return `
            <h1>Welcome to the unofficial British Airways seat map tool</h1>
            <h4 class="fst-italic">The bespoke tool for all BA flyers out there!</h4>
            <p>
                BLAH BLAH BLAH BLAH BLAH
            </p>
        `;
    }
}