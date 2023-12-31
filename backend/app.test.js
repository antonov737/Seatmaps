const request = require("supertest");
const app = require('./app');

describe('Test Flight API Service', () => {
    test('GET /flights succeeds', () => {
        return request(app)
            .get('/flights')
            .expect(200);
    });
    test('GET /flights returns JSON', () => {
        return request(app)
            .get('/flights')
            .expect('Content-type', /json/);
    });
    test('GET /flights/BA235 succeeds', () => {
        return request(app)
            .get('/flights/BA235')
            .expect(200);
    });
    test('GET /flights/BA235 includes SVO', () => {
        return request(app)
            .get('/flights/BA235')
            .expect(/SVO/);
    });
    test('GET /name/A321 includes Airbus A321', () => {
        return request(app)
            .get('/name/A321')
            .expect('Airbus A321');
    })
    test('GET /name/B78X succeeds', () => {
        return request(app)
            .get('/name/B78X')
            .expect(200);
    })
    test('GET /flight/PA235 fails', () => {
        return request(app)
            .get('/flights/PA235')
            .expect(404);
    })
    test('GET /seatmap/B787 fails', () => {
        return request(app)
            .get('/seatmap/B787')
            .expect(404);
    })
    test('GET /aircraft succeeds', () => {
        return request(app)
            .get('/aircraft')
            .expect(200);
    });
    test('GET /aircraft/BA137 returns correct aircraft data', () => {
        return request(app)
            .get('/aircraft/BA137')
            .expect(200)
            .expect(res => {
                const expectedAircraft = [
                    { "icao": "B788", "name": "Boeing 787-8 Dreamliner" },
                    { "icao": "B789", "name": "Boeing 787-9 Dreamliner" },
                    { "icao": "B77L", "name": "Boeing 777-300ER" }
                ];
                const returnedAircraft = res.body;
                const match = expectedAircraft.some(expected => {
                    return returnedAircraft.some(returned => {
                        return expected.icao === returned.icao && expected.name === returned.name;
                    });
                });
    
                expect(match).toBe(true);
            });
    });
    test('GET /seatmap/A321 returns a valid seatmap URL', () => {
        return request(app)
            .get('/seatmap/A321')
            .expect(200)
            .expect(res => {
                const isValidUrl = /^(http|https):\/\/[^ "]+$/.test(res.text);
                expect(isValidUrl).toBe(true);
            });
    });
});