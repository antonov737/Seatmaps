import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor () {
        super();
        this.setTitle('Add Route');
    }

    // HTML for /add
    async getHtml () {
        return `
            <h1>Add new flight</h1>
            <div id='input-errors'></div>
            <form id="add-flight">
                <div class="mb-3 mt-3">
                    <label class="form-label" for="flightNo">Flight Number (starts with BA):</label>
                    <input class="form-control" id="flightNo" placeholder="Example: BA1" required>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="origin-iata">Origin Airport IATA Code:</label>
                    <input class="form-control" id="origin-iata" placeholder="Example: LHR" required>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="origin-name">Origin Airport Name:</label>
                    <input class="form-control" id="origin-name" placeholder="Example: London Heathrow" required>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="dest-iata">Destination Airport IATA Code:</label>
                    <input class="form-control" id="dest-iata" placeholder="Example: JFK" required>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="dest-name">Origin Airport Name:</label>
                    <input class="form-control" id="dest-name" placeholder="Example: New York John F Kennedy" required>
                </div>
                <div class="mb-3 dropdown">
                    <label class="form-label" for="dropdownMenuButton">Aircraft Type:</label>
                    <button class="form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Select Aircraft Type
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="A318" value="A318">
                            <label class="form-check-label" for="A318">Airbus A318</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="A321" value="A321">
                            <label class="form-check-label" for="A321">Airbus A321</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="B788" value="B788">
                            <label class="form-check-label" for="B788">Boeing 787-8 Dreamliner</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="B789" value="B789">
                            <label class="form-check-label" for="B789">Boeing 787-9 Dreamliner</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="B78X" value="B78X">
                            <label class="form-check-label" for="B78X">Boeing 787-10 Dreamliner</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="B77L" value="B77L">
                            <label class="form-check-label" for="B77L">Boeing 777-300ER</label>
                        </div>
                    </div>
                </div>

                <input type="submit" class="btn btn-primary">
            </form>
        `;
    }
}
