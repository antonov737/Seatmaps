import Home from "./views/Home.js";
import LocateNumber from "./views/LocateNumber.js";
import Add from "./views/Add.js";
import PageUpdate from "./PageUpdate.js";
import LocateOrigDest from "./views/LocateOrigDest.js";
import { getFlights, getAircraft, getSeatMap, getAircraftName } from "./Get.js";

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
            console.log(FlightNo);
            const AircraftOperated = await getAircraft(FlightNo);
            console.log(AircraftOperated);
            PageUpdate.AircraftUpdater(AircraftOperated, FlightNo);
        }
        else if (e.target.matches("[get-map]")) {
            e.preventDefault();
            const ICAO = e.target.id;
            console.log(ICAO);
            const SeatMapLink = await getSeatMap(ICAO);
            PageUpdate.SeatMapUpdater(SeatMapLink, await getAircraftName(ICAO));
        }
    });

    router();
});
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("submit", async e => {
        if (e.target.matches("[name-form]")) {
            e.preventDefault();
            console.log(document.getElementById("name-input").value);
            PageUpdate.NameUpdater(document.getElementById("name-input").value);
        }
        else if (e.target.matches("[number-form]")) {
            e.preventDefault();
            const FlightNo = document.getElementById("flight-no-input").value;
            console.log("Sending request to server to fetch " + FlightNo);
            const { error, flights } = await getFlights(FlightNo);
            console.log(flights);
            if (error){
                if (error === 'Network error') {
                    PageUpdate.NetworkErrorUpdater(error)
                } else {
                    PageUpdate.ErrorUpdater(error)
                }
            } else {
                PageUpdate.FlightUpdater(flights)
            }
        }
    });
});