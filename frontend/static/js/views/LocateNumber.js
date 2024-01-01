import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Locate Seatmap");
    }

    async getHtml() {
        return `
        <h1>This is the Locator Page</h1>
        <p>Add forms for both flight number search and destination search</p>
        <p>Append dropdown of available A/C, then append images on top of those.</p>
        <p>Having trouble finding flight number? <a href="/locate-orig-dest" data-link>Search by Destination/Origin</a></p>
        <form id="locate-number" number-form>
            <input id="flight-no-input" type="text" placeholder="Enter Flight Number" required>
            <input type="submit"></input>
        </form>
        <div id='input-errors'></div>
        <div id='flight-buttons' class="btn-group-vertical"></div>
        `
    }
}