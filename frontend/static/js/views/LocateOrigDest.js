import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor () {
        super();
        this.setTitle('Locate Seatmap by Origin/Destination');
    }

    async getHtml () {
        return `
            <h1>The following is the locate by Origin/Destination page</h1>
            <form id="name" number-orig-dest-form>
                <div class="mb-3 mt-3">
                    <label class="form-label" for="origin-input">Origin Airport:</label>
                    <input class="form-control" id="origin-input" type="text" placeholder="Example: London Heathrow" required>
                    <label class="form-label mt-3" for="dest-input">Destination Airport:</label>
                    <input class="form-control" id="dest-input" type="text" placeholder="Example: Tokyo Narita" required>
                </div>
                <input type="submit" class="btn btn-primary">
            </form>
        <div id='input-errors'></div>
        <div id='flight-buttons' class="btn-group-vertical"></div>
        `;
    }
}
