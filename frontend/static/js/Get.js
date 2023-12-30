export async function getFlights (FlightNo) {
    try {
        const endpoint = FlightNo
        const response = await fetch('http://192.168.0.80:8060/flights/' + endpoint);
        if (!response.ok) {
            let errorMessage = 'Unhandled Error';
            if (response.status === 404) {
                errorMessage = 'Not found - 404 error'
            } else if (response.status === 500) {
                errorMessage = 'Internal Server Error - 500 error'
            } else {
                errorMessage = 'Unhandled error: ' + response.status
            }
            return { error: errorMessage, data: null}
        }
        const data = await response.json()
        return { error: null, data}
    } catch (error) {
        console.error('Error fetching flights: ', error);
        return { error: 'Network error', data: null };
    }
}
export async function getAircraft (FlightNo) {
    const endpoint = FlightNo
    const response = await fetch('http://192.168.0.80:8060/aircraft/' + endpoint);
    if (!response.ok) {
        throw new Error('Network response not ok.');
    }

    const data = await response.json()
    return data;
}
export async function getSeatMap (ICAO) {
    const endpoint = ICAO
    const response = await fetch('http://192.168.0.80:8060/seatmap/' + endpoint);
    if (!response.ok) {
        throw new Error('Network response not ok.');
    }

    const data = await response.text()
    return data;
}
export async function getAircraftName(ICAO) {
    const endpoint = ICAO
    const response = await fetch('http://192.168.0.80:8060/name/' + endpoint);
    if (!response.ok) {
        throw new Error('Network response not ok.');
    }

    const data = await response.text()
    return data;
}