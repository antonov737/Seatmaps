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
            <h1>Showing seat map for ${AircraftName}</h1>
            <img src="${SeatMapLink}" alt="${AircraftName}">
        `
    }
    static ErrorUpdater (error) {
        const div = document.getElementById("flight-buttons");
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