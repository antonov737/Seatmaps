import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor () {
        super();
        this.setTitle('Edit Route Aircraft');
    }

    // HTML for /edit
    async getHtml () {
        return `
            <h1>Edit aircraft operating route</h1>
            <div id='input-errors'></div>
            <form id="number-edit-form">
                <div class="mb-3 mt-3">
                    <label class="form-label" for="flight-no-input">Flight Number (starts with BA):</label>
                    <input class="form-control" id="flight-no-input" type="text" placeholder="Example: BA1" required>
                </div>
                <input type="submit" class="btn btn-primary">
            </form>
            <div id='flight-buttons' class="btn-group-vertical"></div>
        `;
    }
}
