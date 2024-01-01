export async function getFlights (FlightNo) {
    try {
        const endpoint = FlightNo;
        const response = await fetch('http://192.168.0.80:8060/flights/' + endpoint);
        if (!response.ok) {
            let errorMessage = '';
            if (response.status === 404) {
                errorMessage = 'Not found - 404';
            } else if (response.status === 500) {
                errorMessage = 'Internal Server Error - 500';
            } else {
                errorMessage = 'Unhandled error: ' + response.status;
            }
            return { error: errorMessage, Flights: null };
        }
        const data = await response.json();
        return { error: null, Flights: data };
    } catch (error) {
        console.error('Error fetching flights: ', error);
        return { error: 'Network error', Flights: null };
    }
}
export async function getAircraft (FlightNo) {
    try {
        const endpoint = FlightNo;
        const response = await fetch('http://192.168.0.80:8060/aircraft/' + endpoint);
        if (!response.ok) {
            let errorMessage = '';
            if (response.status === 404) {
                errorMessage = 'Not found - 404 error';
            } else if (response.status === 500) {
                errorMessage = 'Internal Server Error - 500 error';
            } else {
                errorMessage = 'Unhandled error: ' + response.status;
            }
            return { error: errorMessage, AircraftOperated: null };
        }
    const data = await response.json();
    return { error: null, AircraftOperated: data };
    } catch (error) {
        console.error('Error fetching flights: ', error);
        return { error: 'Network error', AircraftOperated: null };
    }
}
export async function getSeatMap (ICAO) {
    try {
        const endpoint = ICAO;
        const response = await fetch('http://192.168.0.80:8060/seatmap/' + endpoint);
        if (!response.ok) {
            let errorMessage = '';
            if (response.status === 404) {
                errorMessage = 'Not found - 404 error';
            } else if (response.status === 500) {
                errorMessage = 'Internal Server Error - 500 error';
            } else {
                errorMessage = 'Unhandled error: ' + response.status;
            }
            return { error: errorMessage, SeatMapLink: null };
        }
        const data = await response.text();
        return { error: null, SeatMapLink: data };
    } catch (error) {
        console.error('Error fetching flights: ', error);
        return { error: 'Network error', SeatMapLink: null };
    }
}
export async function getAircraftName (ICAO) {
    try {
        const endpoint = ICAO;
        const response = await fetch('http://192.168.0.80:8060/name/' + endpoint);
        if (!response.ok) {
            let errorMessage = '';
            if (response.status === 404) {
                errorMessage = 'Not found - 404 error';
            } else if (response.status === 500) {
                errorMessage = 'Internal Server Error - 500 error';
            } else {
                errorMessage = 'Unhandled error: ' + response.status;
            }
            return { error: errorMessage, AircraftName: null };
        }
        const data = await response.text();
        return { error: null, AircraftName: data };
    } catch (error) {
        console.error('Error fetching flights: ', error);
        return { error: 'Network error', AircraftName: null };
    }
};
