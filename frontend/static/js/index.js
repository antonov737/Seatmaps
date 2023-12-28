import Home from "./views/Home.js";
import LocateNumber from "./views/LocateNumber.js";
import Add from "./views/Add.js";
import name from "./name.js";
import LocateOrigDest from "./views/LocateOrigDest.js";

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
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("submit", e => {
        if (e.target.matches("[name-form]")) {
            e.preventDefault();
            console.log(document.getElementById("name-input").value)
            name.NameUpdater(document.getElementById("name-input").value)
        }
    });
});