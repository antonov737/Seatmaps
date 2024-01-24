import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor () {
        super();
        this.setTitle('Locate Seatmap');
    }

    async getHtml () {
        return `
        <h1>This is the Locator Page</h1>
        <p>Find the flight number on your British Airways booking and enter it here.</p>
        <p>Having trouble finding flight number? <a href="/locate-orig-dest" data-link>Search by Destination/Origin</a></p>
        <form id="name" number-form>
                <div class="mb-3 mt-3">
                    <label class="form-label" for="flight-no-input">Flight Number (starts with BA):</label>
                    <input class="form-control" id="flight-no-input" type="text" placeholder="Example: BA1" required>
                </div>
                <input type="submit" class="btn btn-primary">
            </form>
        <div id='input-errors'></div>
        <div id='flight-buttons' class="btn-group-vertical"></div>
        `;
    }
}
