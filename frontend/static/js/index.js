import Home from './views/Home.js';
import LocateNumber from './views/LocateNumber.js';
import Add from './views/Add.js';
import Edit from './views/Edit.js';
import PageUpdate from './PageUpdate.js';
import LocateOrigDest from './views/LocateOrigDest.js';
import { getFlights, getAircraft, getSeatMap, getAircraftName } from './Get.js';
import { addFlight, editFlight, getFlightsByAirport } from './Post.js';

const navigateTo = url => { // saves previous window using history API and calls router
    history.pushState(null, null, url);
    router();
};

const router = async () => { // taken from https://www.youtube.com/watch?v=6BozpmSjk-Y
    const routes = [
        { path: '/', view: Home },
        { path: '/locate-flight-no', view: LocateNumber },
        { path: '/locate-orig-dest', view: LocateOrigDest },
        { path: '/add', view: Add },
        { path: '/edit', view: Edit }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    };

    // eslint-disable-next-line new-cap
    const view = new match.route.view();

    document.querySelector('#app').innerHTML = await view.getHtml();
};

// clicking back button on browser
window.addEventListener('popstate', router);

// listening for specific actions
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', async e => {
        if (e.target.matches('[data-link]')) { // navbar buttons
            e.preventDefault();
            navigateTo(e.target.href);
        } else if (e.target.matches('[get-ac]')) { // calls getAircraft function for searching
            e.preventDefault();
            const FlightNo = e.target.id;
            const { error, AircraftOperated } = await getAircraft(FlightNo);
            if (error) {
                if (error === 'Network error') {
                    PageUpdate.NetworkErrorUpdater(error);
                } else {
                    PageUpdate.ErrorUpdater(error);
                }
            } else {
                PageUpdate.AircraftUpdater(AircraftOperated, FlightNo);
            }
        } else if (e.target.matches('[get-ac-edit]')) { // calls getAircraft function for editing
            e.preventDefault();
            const FlightNo = e.target.id;
            const { error, AircraftOperated } = await getAircraft(FlightNo);
            if (error) { // error handle
                if (error === 'Network error') {
                    PageUpdate.NetworkErrorUpdater(error);
                } else {
                    PageUpdate.ErrorUpdater(error);
                }
            } else { // successful fetch
                PageUpdate.EditPromptUpdater(AircraftOperated, FlightNo);
                sessionStorage.setItem('flightNo', FlightNo);
            }
        } else if (e.target.matches('[get-map]')) { // calls getSeatMap for particular aircraft
            e.preventDefault();
            const ICAO = e.target.id;
            const { errorSeatMap, SeatMapLink } = await getSeatMap(ICAO);
            if (errorSeatMap) { // error handle
                if (errorSeatMap === 'Network error') {
                    PageUpdate.NetworkErrorUpdater(errorSeatMap);
                } else {
                    PageUpdate.ErrorUpdater(errorSeatMap);
                }
            } else { // continue
                const { errorAircraftName, AircraftName } = await getAircraftName(ICAO);
                if (errorAircraftName) { // error handle
                    if (errorAircraftName === 'Network error') {
                        PageUpdate.NetworkErrorUpdater(errorAircraftName);
                    } else {
                        PageUpdate.ErrorUpdater(errorAircraftName);
                    }
                } else { // success
                    PageUpdate.SeatMapUpdater(SeatMapLink, AircraftName);
                }
            }
        }
    });
    router(); // once action performed
});
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('submit', async e => {
        if (e.target.id === 'add-flight') { // add flight form, calls addFlight function
            e.preventDefault();
            const FlightNo = document.getElementById('flightNo').value;
            const OriginIATA = document.getElementById('origin-iata').value;
            const OriginName = document.getElementById('origin-name').value;
            const DestIATA = document.getElementById('dest-iata').value;
            const DestName = document.getElementById('dest-name').value;

            const dropdownMenu = document.querySelector('.dropdown-menu');

            function getCheckedCheckboxes () {
                const checkboxes = dropdownMenu.querySelectorAll('.form-check-input');
                const checkedValues = [];

                checkboxes.forEach((checkbox) => {
                    if (checkbox.checked) {
                    checkedValues.push(checkbox.value);
                    }
                });

                return checkedValues;
            }
            const acType = getCheckedCheckboxes();

            const { inputError, postError, AddedFlight } = await addFlight(FlightNo, OriginIATA, OriginName, DestIATA, DestName, acType);
            if (AddedFlight) {
                PageUpdate.AddSuccessUpdater(AddedFlight);
            } else if (postError) { // POST error
                if (postError === 'Network error') {
                    PageUpdate.NetworkErrorUpdater();
                } else {
                    PageUpdate.ErrorUpdater(postError);
                }
            } else if (inputError) { // Input error
                PageUpdate.ErrorUpdater(inputError);
            }
        } else if (e.target.id === 'number-form') { // flight search by flight number, calls getFlights function
            e.preventDefault();
            const FlightNo = document.getElementById('flight-no-input').value;
            const { error, Flights } = await getFlights(FlightNo);
            if (error) {
                if (error === 'Network error') {
                    PageUpdate.NetworkErrorUpdater();
                } else {
                    PageUpdate.ErrorUpdater(error);
                }
            } else {
                PageUpdate.FlightUpdater(Flights);
            }
        } else if (e.target.id === 'number-orig-dest-form') { // flight search by origin/destination, calls getFlightByAirport function
            e.preventDefault();
            const origin = document.getElementById('origin-input').value;
            const destination = document.getElementById('dest-input').value;
            const { postError, Flights } = await getFlightsByAirport(origin, destination);
            if (Flights) { // success
                PageUpdate.FlightUpdater(Flights);
            } else if (postError) { // errors
                if (postError === 'Network error') {
                    PageUpdate.NetworkErrorUpdater();
                } else {
                    PageUpdate.ErrorUpdater(postError);
                }
            }
        } else if (e.target.id === 'number-edit-form') { // flight search by flight number, calls getFlights function (for editing flights)
            e.preventDefault();
            const FlightNo = document.getElementById('flight-no-input').value;
            const { error, Flights } = await getFlights(FlightNo);
            if (error) { // error
                if (error === 'Network error') {
                    PageUpdate.NetworkErrorUpdater();
                } else {
                    PageUpdate.ErrorUpdater(error);
                }
            } else { // success
                PageUpdate.FlightUpdater_edit(Flights);
            }
        } else if (e.target.id === 'edit-flight') { // edit flight form, calls editFlight function
            e.preventDefault();

            const dropdownMenu = document.querySelector('.dropdown-menu');

            function getCheckedCheckboxes () {
                const checkboxes = dropdownMenu.querySelectorAll('.form-check-input');
                const checkedValues = [];

                checkboxes.forEach((checkbox) => {
                    if (checkbox.checked) {
                    checkedValues.push(checkbox.value);
                    }
                });

                return checkedValues;
            }
            const acType = getCheckedCheckboxes();
            const FlightNo = sessionStorage.getItem('flightNo');
            console.log(acType);
            console.log(FlightNo);
            const { inputError, postError, EditedFlight } = await editFlight(FlightNo, acType);
            if (EditedFlight) { // success
                PageUpdate.EditSuccessUpdater(EditedFlight);
            } else if (postError) { // POST error
                if (postError === 'Network error') {
                    PageUpdate.NetworkErrorUpdater();
                } else {
                    PageUpdate.ErrorUpdater(postError);
                }
            } else if (inputError) { // Input error
                PageUpdate.ErrorUpdater(inputError);
            }
        }
    });
    router(); // once action performed
});
