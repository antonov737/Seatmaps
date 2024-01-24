import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor () {
        super();
        this.setTitle('BA Seatmaps');
    }

    // HTML for landing page
    async getHtml () {
        return `
            <h1>Welcome to the unofficial British Airways seat map tool</h1>
            <h4 class="fst-italic">The bespoke tool for all BA flyers out there!</h4>
            <div class="text-center">
            </div>
            <div class="row">
                <div class="col-lg-3">
                    <h3>What is this?</h3>
                    <p>
                        This tool allows you to see the seating layout of your aircraft before you board, allowing you to pick the most
                        optimal seat and maximise the fun of flying wherever possible!
                    </p>
                    <h3>How to use?</h3>
                    <p>
                        On the Locate Aircraft page, enter your flight number and find your flight, and click on appropriate seat map.
                        If you do not know your flight number, then Locate by Origin and Destination!
                    <p>
                    <h3>Advanced user?</h3>
                    <p>
                        Noticed a new flight being introduced? Simply add a new flight! Has an existing flight changed the aircraft operated?
                        Edit that flight! Your proactivity will be highly appreciated!
                    <p>
                    <h3>Get Started!</h3>
                    <div class="btn-group-vertical w-100">
                        <a href="/locate-flight-no" class="btn btn-primary mt-1" data-link>Locate Flight</a>
                        <a href="/add" class="btn btn-primary mt-1" data-link>Add Flight</a>
                        <a href="/edit" class="btn btn-primary mt-1" data-link>Edit Flight</a>
                    </div>
                </div>
                <div class="col-lg-5">
                    <img src="./img/home1.jpg" class="img-fluid mt-3" alt="IMAGE FAILED TO LOAD.">
                    <img src="./img/home2.jpg" class="img-fluid" alt="IMAGE FAILED TO LOAD">
                </div>
                <div class="col-lg-4 text-center">
                    <img src="./img/home3.png" class="img-fluid" alt="IMAGE FAILED TO LOAD">
                </div>
            </div>
        `;
    }
}
