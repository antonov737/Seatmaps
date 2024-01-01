import Home from "./views/Home.js";
import LocateNumber from "./views/LocateNumber.js";
import Add from "./views/Add.js";
import Edit from "./views/Edit.js";
import PageUpdate from "./PageUpdate.js";
import LocateOrigDest from "./views/LocateOrigDest.js";
import { getFlights, getAircraft, getSeatMap, getAircraftName } from "./Get.js";
import { addFlight, editFlight } from "./Post.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Home },
        { path: "/locate-flight-no", view: LocateNumber },
        { path: "/locate-orig-dest", view: LocateOrigDest },
        { path: "/add", view: Add },
        { path: "/edit", view: Edit}
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
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

    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", async e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
        else if (e.target.matches("[get-ac]")) {
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
        }
        else if (e.target.matches("[get-ac-edit]")) {
            e.preventDefault();
            const FlightNo = e.target.id;
            console.log(FlightNo)
            const { error, AircraftOperated } = await getAircraft(FlightNo);
            console.log(AircraftOperated);
            if (error) {
                if (error === 'Network error') {
                    PageUpdate.NetworkErrorUpdater(error);
                } else {
                    PageUpdate.ErrorUpdater(error);
                }
            } else {
                PageUpdate.EditPromptUpdater(AircraftOperated, FlightNo);
            }
        }
        else if (e.target.matches("[get-map]")) {
            e.preventDefault();
            const ICAO = e.target.id;
            const { error_SeatMap, SeatMapLink } = await getSeatMap(ICAO);
            if (error_SeatMap){
                if (error_SeatMap === 'Network error') {
                    PageUpdate.NetworkErrorUpdater(error_SeatMap);
                } else {
                    PageUpdate.ErrorUpdater(error_SeatMap);
                }
            } else {
                const { error_AircraftName, AircraftName } = await getAircraftName(ICAO);
                if (error_AircraftName){
                    if (error_AircraftName === 'Network error') {
                        PageUpdate.NetworkErrorUpdater(error_AircraftName);
                    } else {
                        PageUpdate.ErrorUpdater(error_AircraftName);
                    }
                } else {
                    PageUpdate.SeatMapUpdater(SeatMapLink, AircraftName);
                }
            }
        }
    });
    router();
});
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("submit", async e => {
        if (e.target.matches("[add-flight]")) {
            e.preventDefault();
            const FlightNo = document.getElementById("flightNo").value
            const OriginIATA = document.getElementById("origin-iata").value
            const OriginName = document.getElementById("origin-name").value
            const DestIATA = document.getElementById("dest-iata").value
            const DestName = document.getElementById("dest-name").value
            
            const dropdownMenu = document.querySelector('.dropdown-menu');

            function getCheckedCheckboxes() {
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

            const { inputError , postError, AddedFlight } = await addFlight(FlightNo, OriginIATA, OriginName, DestIATA, DestName, acType);
            if (AddedFlight) {
                PageUpdate.AddSuccessUpdater(AddedFlight)
            } else if (postError) {
                if (postError === 'Network error') {
                    PageUpdate.NetworkErrorUpdater()
                } else {
                    PageUpdate.ErrorUpdater(postError)
                }
            } else if (inputError) {
                PageUpdate.ErrorUpdater(inputError)
            }

        }
        else if (e.target.matches("[number-form]")) {
            e.preventDefault();
            const FlightNo = document.getElementById("flight-no-input").value;
            const { error, Flights } = await getFlights(FlightNo);
            if (error){
                if (error === 'Network error') {
                    PageUpdate.NetworkErrorUpdater();
                } else {
                    PageUpdate.ErrorUpdater(error);
                }
            } else {
                PageUpdate.FlightUpdater(Flights);
            }
        } else if (e.target.matches("[number-edit-form]")) {
            e.preventDefault();
            const FlightNo = document.getElementById("flight-no-input").value;
            const { error, Flights } = await getFlights(FlightNo);
            if (error){
                if (error === 'Network error') {
                    PageUpdate.NetworkErrorUpdater();
                } else {
                    PageUpdate.ErrorUpdater(error);
                }
            } else {
                PageUpdate.FlightUpdater_edit(Flights);
            }
        } else if (e.target.matches("[edit-flight]")) {
            e.preventDefault();
            
            const dropdownMenu = document.querySelector('.dropdown-menu');

            function getCheckedCheckboxes() {
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
            const FlightNo = document.getElementById("submit-edit").value
            console.log(acType);
            console.log(FlightNo);
            const { inputError, postError, EditedFlight } = await editFlight(FlightNo, acType);
            if (EditedFlight) {
                PageUpdate.AddSuccessUpdater(EditedFlight)
            } else if (postError) {
                if (postError === 'Network error') {
                    PageUpdate.NetworkErrorUpdater()
                } else {
                    PageUpdate.ErrorUpdater(postError)
                }
            } else if (inputError) {
                PageUpdate.ErrorUpdater(inputError)
            }
        }
    });
    router();
});