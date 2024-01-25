/* eslint-disable no-undef */
const request = require('supertest');
const app = require('./app');

describe('Test SeatMap API Service', () => {
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
    test('GET /aircraft succeeds', () => {
        return request(app)
            .get('/aircraft')
            .expect(200);
    });
    test('GET /aircraft returns JSON', () => {
        return request(app)
            .get('/aircraft')
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
    test('GET /flights/BA235 returns JSON', () => {
        return request(app)
            .get('/flights/BA235')
            .expect('Content-type', /json/);
    });
    test('GET /flights/PA137 fails', () => {
        return request(app)
            .get('/flights/PA235')
            .expect(404);
    });
    test('GET /flights/PA137 returns JSON', () => {
        return request(app)
            .get('/flights/PA235')
            .expect('Content-type', /json/);
    });
    test('GET /aircraft/BA2 succeeds', () => {
        return request(app)
            .get('/aircraft/BA2')
            .expect(200);
    });
    test('GET /aircraft/BA2 returns JSON', () => {
        return request(app)
            .get('/aircraft/BA2')
            .expect('Content-type', /json/);
    });
    test('GET /aircraft/AA45 fails', () => {
        return request(app)
            .get('/aircraft/AA45')
            .expect(404);
    });
    test('GET /aircraft/AA45 returns JSON', () => {
        return request(app)
            .get('/aircraft/AA45')
            .expect('Content-type', /json/);
    });
    test('GET /name/A321 succeeds', () => {
        return request(app)
            .get('/name/A321')
            .expect(200);
    });
    test('GET /name/A321 returns text', () => {
        return request(app)
            .get('/name/A321')
            .expect('Content-type', /text/);
    });
    test('GET /name/A321 includes Airbus A321', () => {
        return request(app)
            .get('/name/A321')
            .expect('Airbus A321');
    });
    test('GET /name/B220 fails', () => {
        return request(app)
            .get('/name/B220')
            .expect(404);
    });
    test('GET /name/B220 returns text', () => {
        return request(app)
            .get('/name/B220')
            .expect('Content-type', /text/);
    });
    test('GET /seatmap/B77L succeeds', () => {
        return request(app)
            .get('/seatmap/B77L')
            .expect(200);
    });
    test('GET /seatmap/B77L returns text', () => {
        return request(app)
            .get('/seatmap/B77L')
            .expect('Content-type', /text/);
    });
    test('GET /seatmap/B77L returns a valid seatmap URL', () => {
        return request(app)
            .get('/seatmap/B77L')
            .expect(res => {
                const isValidUrl = /^(http|https):\/\/[^ "]+$/.test(res.text);
                expect(isValidUrl).toBe(true);
            });
    });
    test('GET /seatmap/B763 fails', () => {
        return request(app)
            .get('/seatmap/B763')
            .expect(404);
    });
    test('GET /seatmap/B763 returns text', () => {
        return request(app)
            .get('/seatmap/B763')
            .expect('Content-type', /text/);
    });
    test('POST /flights-orig-dest succeeds with correct inputs', () => {
        const params = {
            origin: 'LHR',
            destination: 'SVO'
        };
        return request(app)
            .post('/flights-orig-dest')
            .send(params)
            .expect(200);
    });
    test('POST /flights-orig-dest succeeds with correct inputs but variable case', () => {
        const params = {
            origin: 'LhR',
            destination: 'SVo'
        };
        return request(app)
            .post('/flights-orig-dest')
            .send(params)
            .expect(200);
    });
    test('POST /flights-orig-dest succeeds with cities', () => {
        const params = {
            origin: 'london',
            destination: 'moSCoW'
        };
        return request(app)
            .post('/flights-orig-dest')
            .send(params)
            .expect(200);
    });
    test('POST /flights-orig-dest returns JSON', () => {
        const params = {
            origin: 'LHR',
            destination: 'HND'
        };
        return request(app)
            .post('/flights-orig-dest')
            .send(params)
            .expect('Content-type', /json/);
    });
    test('POST /flights-orig-dest fails with incorrect inputs', () => {
        const params = {
            origin: 'NCL',
            destination: 'NRT'
        };
        return request(app)
            .post('/flights-orig-dest')
            .send(params)
            .expect(404);
    });
    test('POST /flights-orig-dest with incorrect inputs returns JSON', () => {
        const params = {
            origin: 'LHR',
            destination: 'NRT'
        };
        return request(app)
            .post('/flights-orig-dest')
            .send(params)
            .expect('Content-type', /json/);
    });
    test('POST /flights-orig-dest with not enough arguments fails', () => {
        const params = {
            origin: 'LHR'
        };
        return request(app)
            .post('/flights-orig-dest')
            .send(params)
            .expect(400);
    });
    test('POST /flights-orig-dest with incorrectly named arguments fails', () => {
        const params = {
            origin: 'LHR',
            acType: 'A321'
        };
        return request(app)
            .post('/flights-orig-dest')
            .send(params)
            .expect(400);
    });
    test('POST /flights-orig-dest with invalid args returns JSON', () => {
        const params = {
            origin: 'LHR',
            acType: 'A321'
        };
        return request(app)
            .post('/flights-orig-dest')
            .send(params)
            .expect('Content-type', /json/);
    });
    test('POST /addflight with correct arguments succeeds', () => {
        const params = {
            flightNo: 'TEST7890',
            origin: 'Test Airport 1',
            destination: 'Test Airport 2',
            acType: ['A318', 'A321']
        };
        return request(app)
            .post('/addflight')
            .send(params)
            .expect(200);
    });
    test('POST /addflight with correct arguments returns JSON', () => {
        const params = {
            flightNo: 'TEST7890',
            origin: 'Test Airport 1',
            destination: 'Test Airport 2',
            acType: ['A318', 'A321']
        };
        return request(app)
            .post('/addflight')
            .send(params)
            .expect('Content-type', /json/);
    });
    test('POST /addflight with insufficient arguments fails', () => {
        const params = {
            flightNo: 'TEST7890',
            origin: 'Test Airport 1',
            destination: 'Test Airport 2'
        };
        return request(app)
            .post('/addflight')
            .send(params)
            .expect(400);
    });
    test('POST /addflight with insufficient arguments returns JSON', () => {
        const params = {
            flightNo: 'TEST7890',
            origin: 'Test Airport 1',
            destination: 'Test Airport 2'
        };
        return request(app)
            .post('/addflight')
            .send(params)
            .expect('Content-type', /json/);
    });
    test('POST /addflight with invalid arguments fails', () => {
        const params = {
            flightno: 'TEST7890',
            orig: 'Test Airport 1',
            dest: 'Test Airport 2',
            ac: ['A318', 'A321']
        };
        return request(app)
            .post('/addflight')
            .send(params)
            .expect(400);
    });
    test('POST /addflight with invalid arguments returns JSON', () => {
        const params = {
            flightno: 'TEST7890',
            orig: 'Test Airport 1',
            dest: 'Test Airport 2',
            ac: ['A318', 'A321']
        };
        return request(app)
            .post('/addflight')
            .send(params)
            .expect('Content-type', /json/);
    });
    test('POST /editflight with correct arguments succeeds', () => {
        const params = {
            flightNo: 'TEST7890',
            acType: ['B78X']
        };
        return request(app)
            .post('/editflight')
            .send(params)
            .expect(200);
    });
    test('POST /editflight with correct arguments returns JSON', () => {
        const params = {
            flightNo: 'TEST7890',
            acType: ['B78X']
        };
        return request(app)
            .post('/editflight')
            .send(params)
            .expect('Content-type', /json/);
    });
    test('POST /editflight with incorrect flight number fails', () => {
        const params = {
            flightNo: 'PA378',
            acType: ['B78X']
        };
        return request(app)
            .post('/editflight')
            .send(params)
            .expect(404);
    });
    test('POST /editflight with incorrect flight number returns JSON', () => {
        const params = {
            flightNo: 'PA378',
            acType: ['B78X']
        };
        return request(app)
            .post('/editflight')
            .send(params)
            .expect('Content-type', /json/);
    });
});
