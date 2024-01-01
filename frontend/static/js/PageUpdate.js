export default class {
    static NameUpdater (name) {
        const div = document.getElementById("app");
        div.innerHTML += `<h1>${name}</h1>`;
    }
    static FlightUpdater (flights) {
        const div = document.getElementById("flight-buttons");
        div.innerHTML = ``;
        for (let i = 0; i < flights.length; i++) {
            let origin = flights[i].origin;
            let dest = flights[i].destination;
            let details = flights[i].flightNo + " : " + origin.substring(0,3) + " to " + dest.substring(0,3)
            div.innerHTML += `<button id="${flights[i].flightNo}" type="button" class="btn btn-primary mt-1" get-ac>${details}</button>`;
        };
    }
    static FlightUpdater_edit (flights) {
        const div = document.getElementById("flight-buttons");
        div.innerHTML = ``;
        for (let i = 0; i < flights.length; i++) {
            let origin = flights[i].origin;
            let dest = flights[i].destination;
            let details = flights[i].flightNo + " : " + origin.substring(0,3) + " to " + dest.substring(0,3)
            div.innerHTML += `<button id="${flights[i].flightNo}" type="button" class="btn btn-primary mt-1" get-ac-edit>${details}</button>`;
        };
    }
    static AircraftUpdater (aircraft, FlightNo) {
        const div = document.getElementById("app");
        div.innerHTML = `
            <h1>Aircraft operating ${FlightNo}</h1>
            <div id='ac-buttons' class="btn-group-vertical"></div>
        `;
        const buttons = document.getElementById("ac-buttons");
        for (let i = 0; i < aircraft.length; i++) {
            buttons.innerHTML += `<button id="${aircraft[i].icao}" type="button" class="btn btn-primary mt-1" get-map>${aircraft[i].name}</button>`;
        };
    }
    static SeatMapUpdater (SeatMapLink, AircraftName) {
        const div = document.getElementById("app");
        div.innerHTML = `
            <div class="text-center">
                <h1>Showing seat map for ${AircraftName}</h1>
                <img src="${SeatMapLink}" alt="${AircraftName}" class="scaled-image">
            </div>
        `
    }
    static EditPromptUpdater (AircraftOperated, FlightNo) {
        const div = document.getElementById("app");
        div.innerHTML = `
            <div id="input-errors"></div>
            <h1>Edit ${FlightNo}</h1>
            <h3>Aircraft currently operating:</h3>
            <p id="current-ac"></p>
            <h3>Select updated aircraft types for this route:</h3>
            <form id="edit-ac" edit-flight>
                <div class="mb-3 dropdown">
                    <label class="form-label" for="dropdownMenuButton">Aircraft Type:</label>
                    <button class="form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        Select Aircraft Type
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div class="form-check">
                            <label class="form-check-label" for="A318">Airbus A318</label>
                            <input class="form-check-input" type="checkbox" id="A318" value="A318">
                        </div>
                        <div class="form-check">
                            <label class="form-check-label" for="A321">Airbus A321</label>
                            <input class="form-check-input" type="checkbox" id="A321" value="A321">
                        </div>
                        <div class="form-check">
                            <label class="form-check-label" for="B788">Boeing 787-8 Dreamliner</label>
                            <input class="form-check-input" type="checkbox" id="B788" value="B788">
                        </div>
                        <div class="form-check">
                            <label class="form-check-label" for="B789">Boeing 787-9 Dreamliner</label>
                            <input class="form-check-input" type="checkbox" id="B789" value="B789">
                        </div>
                        <div class="form-check">
                            <label class="form-check-label" for="B78X">Boeing 787-10 Dreamliner</label>
                            <input class="form-check-input" type="checkbox" id="B78X" value="B78X">
                        </div>
                        <div class="form-check">
                            <label class="form-check-label" for="B77L">Boeing 777-300ER</label>
                            <input class="form-check-input" type="checkbox" id="B77L" value="B77L">
                        </div>
                    </div>
                </div>
                <input type="submit" id="submit-edit" value="${FlightNo}" class="btn btn-primary"></input>
            </form>
        `;
        const para = document.getElementById("current-ac");
        para.innerHTML += `${AircraftOperated[0].name}`
        for (let i = 1; i < AircraftOperated.length; i++) {
            para.innerHTML += `, ${AircraftOperated[i].name}`
        }
    }
    static AddSuccessUpdater (flight) {
        const div = document.getElementById("app");
        div.innerHTML = `
        <div class="alert alert-success mt-2">
            <strong>Success!</strong> Flight added. Details below.
        </div>
        <p>Flight Number: ${flight.flightNo}</p>
        <p>Origin: ${flight.origin}</p>
        <p>Destination: ${flight.destination}</p>
        `
    }
    static ErrorUpdater (error) {
        const div = document.getElementById("input-errors");
        div.innerHTML = `
        <div class="alert alert-danger mt-2">
            <strong>Error!</strong> ${error}
        </div>
      `;
    }
    static NetworkErrorUpdater () {
        const div = document.getElementById("app");
        div.innerHTML = `
        <div class="alert alert-danger mt-2">
            <strong>Error!</strong> Network Error.
            <button href="/" type="button" class="btn btn-primary mt-1" data-link>Exit to Home Page</button>
        </div>
      `;
    }
}