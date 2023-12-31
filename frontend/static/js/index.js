import Home from "./views/Home.js";
import LocateNumber from "./views/LocateNumber.js";
import Add from "./views/Add.js";
import PageUpdate from "./PageUpdate.js";
import LocateOrigDest from "./views/LocateOrigDest.js";
import { getFlights, getAircraft, getSeatMap, getAircraftName } from "./Get.js";
import { addFlight } from "./Post.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: Home },
        { path: "/locate-flight-no", view: LocateNumber },
        { path: "/locate-orig-dest", view: LocateOrigDest },
        { path: "/add", view: Add }
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
                const { error_acName, acName } = await getAircraftName(ICAO);
                if (error_acName){
                    if (error_acName === 'Network error') {
                        PageUpdate.NetworkErrorUpdater(error_acName);
                    } else {
                        PageUpdate.ErrorUpdater(error_acName);
                    }
                } else {
                    PageUpdate.SeatMapUpdater(SeatMapLink, acName);
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
            const originIATA = document.getElementById("origin-iata").value
            const originName = document.getElementById("origin-name").value
            const destIATA = document.getElementById("dest-iata").value
            const destName = document.getElementById("dest-name").value
            
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

            const { inputError , postError, addedFlight } = await addFlight(FlightNo, originIATA, originName, destIATA, destName, acType);
            if (addedFlight) {
                PageUpdate.AddSuccessUpdater(addedFlight)
            } else if (postError) {
                PageUpdate.NetworkErrorUpdater()
            } else if (inputError) {
                PageUpdate.InputErrorUpdater(inputError)
            }

        }
        else if (e.target.matches("[number-form]")) {
            e.preventDefault();
            const FlightNo = document.getElementById("flight-no-input").value;
            const { error, flights } = await getFlights(FlightNo);
            if (error){
                if (error === 'Network error') {
                    PageUpdate.NetworkErrorUpdater(error);
                } else {
                    PageUpdate.ErrorUpdater(error);
                }
            } else {
                PageUpdate.FlightUpdater(flights);
            }
        }
    });
    router();
});