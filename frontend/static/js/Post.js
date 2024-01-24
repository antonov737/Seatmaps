export async function addFlight (flightNo, originIATA, originName, destIATA, destName, acType) {
    const flightNoRegex = /^BA\d{1,4}$/;
    const IATARegex = /^[A-Z]{3}$/;
    if (!flightNoRegex.test(flightNo)) {
        const errorMessage = 'Invalid flight number format';
        return { inputError: errorMessage, postError: null, AddedFlight: null };
    } else if (!IATARegex.test(originIATA)) {
        const errorMessage = 'Invalid origin IATA format';
        return { inputError: errorMessage, postError: null, AddedFlight: null };
    } else if (!IATARegex.test(destIATA)) {
        const errorMessage = 'Invalid destination IATA format';
        return { inputError: errorMessage, postError: null, AddedFlight: null };
    } else if (acType.length === 0) {
        const errorMessage = 'Please Select Aircraft';
        return { inputError: errorMessage, postError: null, AddedFlight: null };
    }
    const origin = originIATA + ' - ' + originName;
    const dest = destIATA + ' - ' + destName;
    const dataSend = {
        flightNo,
        origin,
        destination: dest,
        acType
    };
    try {
        const response = await fetch('http://127.0.0.1:8060/addflight', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        });
        const dataRecieve = await response.json();
        if (!response.ok) {
            let errorMessage = '';
            if (response.status === 400) {
                errorMessage = 'Bad Request - 404 - ' + dataRecieve.error;
            } else if (response.status === 500) {
                errorMessage = 'Intenal Server Error - 500';
            } else {
                errorMessage = 'Unhandled error: ' + response.status;
            }
            return { inputError: null, postError: errorMessage, EditedFlight: null };
        }
        return { inputError: null, postError: null, AddedFlight: dataRecieve };
    } catch (postError) {
        console.error('Error adding flights: ', postError);
        return { inputError: null, postError: 'Network error', AddedFlight: null };
    }
}
export async function editFlight (flightNo, acType) {
    if (acType.length === 0) {
        const errorMessage = 'Please Select Aircraft';
        return { inputError: errorMessage, postError: null, EditedFlight: null };
    }
    const dataSend = {
        flightNo,
        acType
    };
    try {
        const response = await fetch('http://127.0.0.1:8060/editflight', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        });
        const dataRecieve = await response.json();
        if (!response.ok) {
            let errorMessage = '';
            if (response.status === 400) {
                errorMessage = 'Bad Request - 400 - ' + dataRecieve.error;
            } else if (response.status === 500) {
                errorMessage = 'Intenal Server Error - 500';
            } else {
                errorMessage = 'Unhandled error: ' + response.status;
            }
            return { inputError: null, postError: errorMessage, EditedFlight: null };
        }
        return { inputError: null, postError: null, EditedFlight: dataRecieve };
    } catch (postError) {
        console.error('Error adding flights: ', postError);
        return { inputError: null, postError: 'Network error', EditedFlight: null };
    }
}
export async function getFlightsByAirport (origin, destination) {
    const dataSend = {
        origin,
        destination
    };
    try {
        const response = await fetch('http://127.0.0.1:8060/flights-orig-dest', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(dataSend)
            });
            const dataRecieve = await response.json();
            console.log(dataRecieve);
            if (!response.ok) {
                let errorMessage = '';
                if (response.status === 404) {
                    errorMessage = 'Not Found - 404 - ' + dataRecieve.error;
                } else if (response.status === 400) {
                    errorMessage = 'Bad Request - 400 - ' + dataRecieve.error;
                } else if (response.status === 500) {
                    errorMessage = 'Intenal Server Error - 500';
                } else {
                    errorMessage = 'Unhandled error: ' + response.status;
                }
                return { postError: errorMessage, Flights: null };
            }
            return { postError: null, Flights: dataRecieve };
    } catch (postError) {
        console.error('Error adding flights: ', postError);
        return { postError: 'Network error', Flights: null };
    }
}
