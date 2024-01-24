const express = require('express');
const fs = require('fs');

const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:8090'
}));

app.use(express.json());

const flights = JSON.parse(fs.readFileSync('backend/flights.json'));
const aircraft = JSON.parse(fs.readFileSync('backend/aircraft.json'));

app.get('/flights', (req, res) => {
    res.send(flights);
});

app.get('/flights/:flightNo', (req, res) => {
    const FlightNo = req.params.flightNo;
    console.log('Searching for flights corresponding to ' + FlightNo);
    const matches = [];
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].flightNo.includes(FlightNo)) {
            matches.push(flights[i]);
        };
    };
    if (matches.length === 0) {
        res.status(404);
    }
    res.send(matches);
});

app.get('/aircraft', (req, res) => {
    res.send(aircraft);
});

app.get('/aircraft/:flightNo', (req, res) => {
    const FlightNo = req.params.flightNo;
    let ICAOFound = [];
    console.log('Finding aircraft operating flight: ' + FlightNo);
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].flightNo === FlightNo) {
            ICAOFound = flights[i].acType;
        };
    };
    const AircraftToReturn = [];
    for (let i = 0; i < ICAOFound.length; i++) {
        for (let k = 0; k < aircraft.length; k++) {
            if (ICAOFound[i] === aircraft[k].icao) {
                AircraftToReturn.push({
                    icao: ICAOFound[i],
                    name: aircraft[k].name
                });
            }
        }
    }
    if (AircraftToReturn.length === 0) {
        res.status(404);
    }
    res.send(AircraftToReturn);
});

app.get('/seatmap/:icao', (req, res) => {
    const ICAO = req.params.icao;
    let Found = 0;
    console.log('Finding seatmap for following aircraft: ' + ICAO);
    for (let i = 0; i < aircraft.length; i++) {
        if (ICAO === aircraft[i].icao) {
            res.send(aircraft[i].seatmap);
            Found = 1;
        }
    } if (Found === 0) {
        res.status(404).send('Not Found');
    }
});

app.get('/name/:icao', (req, res) => {
    const ICAO = req.params.icao;
    let Found = 0;
    console.log('Finding full name for following aircraft: ' + ICAO);
    for (let i = 0; i < aircraft.length; i++) {
        if (ICAO === aircraft[i].icao) {
            res.send(aircraft[i].name);
            Found = 1;
        }
    } if (Found === 0) {
        res.status(404).send('Not Found');
    }
});

app.post('/flights-orig-dest', (req, res) => {
    try {
        const { origin, destination } = req.body;
        console.log('Recieved data: ', { origin, destination });
        const matches = [];
        for (let i = 0; i < flights.length; i++) {
            if (flights[i].origin.toUpperCase().includes(origin.toUpperCase()) && flights[i].destination.toUpperCase().includes(destination.toUpperCase())) {
                matches.push(flights[i]);
            };
        };
        if (matches.length === 0) {
            res.status(404).send({
                error: 'No matches for queried origin/destination'
            });
        } else {
            res.send(matches);
        };
    } catch {
        res.status(400).send({
            error: 'Incorrect arguments passed!'
        });
    }
});

app.post('/addflight', (req, res) => {
    try {
        const { flightNo, origin, destination, acType } = req.body;
        console.log('Recieved data: ', { flightNo, origin, destination, acType });
        if (flightNo && origin && destination && acType) {
            flights.push({ flightNo, origin, destination, acType });
            const data = JSON.stringify(flights, null, 4);
            fs.writeFileSync('backend/flights.json', data, (error) => {
                if (error) { // status 500
                    console.error(error);
                    throw error;
                }
            });
            console.log('Written successfully');
            res.send({ flightNo, origin, destination, acType }); // status 200
        } else {
            throw new Error();
        }
    } catch { // status 400
        res.status(400).send({
            error: 'Incorrect arguments passed!'
        });
    }
});

app.post('/editflight', (req, res) => {
    try {
        const { flightNo, acType } = req.body;
        let Found = 0;
        console.log('Recieved data ', { flightNo, acType });
        for (let i = 0; i < flights.length; i++) {
            if (flightNo === flights[i].flightNo) {
                flights[i].acType = acType;
                Found = 1;
            }
        }
        if (Found === 1) {
            const data = JSON.stringify(flights, null, 4);
            fs.writeFileSync('backend/flights.json', data, (error) => {
                if (error) {
                    console.error(error); // 500 error
                    throw error;
                }
            });
            console.log('Written successfully');
            res.send({ flightNo, acType });
        } else {
            res.status(404).send({
                error: 'Flight Number not found'
            });
        }
    } catch {
        res.status(400).send({
            error: 'Incorrect arguments passed!'
        });
    }
});

module.exports = app;
