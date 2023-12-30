const express = require("express");
const path = require("path");
const fs = require('fs');

const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://192.168.0.80:8090'
}))

app.use(express.json());

const flights = require('./flights.json')
const aircraft = require('./aircraft.json')

app.get("/flights", (req, res) => {
    res.send(flights);
})

app.get("/flights/:flightNo", (req, res) => {
    const FlightNo = req.params.flightNo
    console.log('Searching for flights corresponding to ' + FlightNo)
    let matches = []
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].flightNo.includes(FlightNo)) {
            matches.push(flights[i]);
        };
    };
    if (matches.length === 0) {
        res.status(404)
    }
    res.send(matches);
})

app.get("/aircraft", (req, res) => {
    res.send(aircraft);
})

app.get("/aircraft/:flightNo", (req, res) => {
    const FlightNo = req.params.flightNo
    console.log('Finding aircraft operating flight: ' + FlightNo)
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].flightNo === FlightNo) {
            ICAOFound = flights[i].acType
        };
    };
    let AircraftToReturn = []
    for (let i = 0; i < ICAOFound.length; i++) {
        for (let k = 0; k < aircraft.length; k++) {
            if (ICAOFound[i] === aircraft[k].icao) {
                AircraftToReturn.push({
                    'icao': ICAOFound[i],
                    'name': aircraft[k].name
                });
            }
        }
    }
    res.send(AircraftToReturn);
})

app.get("/seatmap/:icao", (req, res) => {
    const ICAO = req.params.icao;
    console.log('Finding seatmap for following aircraft: ' + ICAO);
    for (let i = 0; i < aircraft.length; i++) {
        if (ICAO === aircraft[i].icao) {
            res.send(aircraft[i].seatmap);
        }
    }
})

app.get("/name/:icao", (req, res) => {
    const ICAO = req.params.icao;
    console.log('Finding seatmap for following aircraft: ' + ICAO);
    for (let i = 0; i < aircraft.length; i++) {
        if (ICAO === aircraft[i].icao) {
            res.send(aircraft[i].name);
        }
    }
})

module.exports = app;