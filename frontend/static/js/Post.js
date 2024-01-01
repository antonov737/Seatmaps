export async function addFlight (flightNo, originIATA, originName, destIATA, destName, acType) {
    const flightNoRegex = /^BA\d{1,4}$/;
    const IATARegex = /^[A-Z]{3}$/;
    if (!flightNoRegex.test(flightNo)) {
        let errorMessage = 'Invalid flight number format';
        return { inputError: errorMessage, postError: null, AddedFlight: null };
    } else if (!IATARegex.test(originIATA)) {
        let errorMessage = 'Invalid origin IATA format';
        return { inputError: errorMessage, postError: null, AddedFlight: null };
    } else if (!IATARegex.test(destIATA)) {
        let errorMessage = 'Invalid destination IATA format';
        return { inputError: errorMessage, postError: null, AddedFlight: null };
    } else if (acType.length === 0) {
        let errorMessage = 'Please Select Aircraft';
        return { inputError: errorMessage, postError: null, AddedFlight: null };
    }
    const origin = originIATA + " - " + originName;
    const dest = destIATA + " - " + destName;
    const dataSend = {
        "flightNo": flightNo,
        "origin": origin,
        "destination": dest,
        "acType": acType
    };
    try {
        const response = await fetch('http://192.168.0.80:8060/addflight', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        });
        const dataRecieve = await response.json()
        if (!response.ok) {
            let errorMessage = '';
            if (response.status === 404) {
                errorMessage = 'Not Found - 404'
            } else if (response.status === 500) {
                errorMessage = 'Intenal Server Error - 500'
            } else {
                errorMessage = 'Unhandled error: ' + response.status
            }
            return { inputError: null, postError: errorMessage, EditedFlight: null};
        }
        return { inputError: null, postError: null, AddedFlight : dataRecieve}
    } catch (postError) {
        console.error('Error adding flights: ', postError);
        return { inputError: null, postError: 'Network error', AddedFlight: null };
    }
}
export async function editFlight (flightNo, acType) {
    if (acType.length === 0) {
        let errorMessage = 'Please Select Aircraft';
        return { inputError: errorMessage, postError: null, EditedFlight: null};
    }
    const dataSend = {
        "flightNo" : flightNo,
        "acType" : acType
    };
    try {
        const response = await fetch('http://192.168.0.80:8060/editflight', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        });
        const dataRecieve = await response.json()
        if (!response.ok) {
            let errorMessage = '';
            if (response.status === 404) {
                errorMessage = 'Not Found - 404'
            } else if (response.status === 500) {
                errorMessage = 'Intenal Server Error - 500'
            } else {
                errorMessage = 'Unhandled error: ' + response.status
            }
            return { inputError: null, postError: errorMessage, EditedFlight: null};
        }
        return { inputError: null, postError: null, EditedFlight: dataRecieve };
    } catch (postError) {
        console.error('Error adding flights: ', postError);
        return { inputError: null, postError: 'Network error', EditedFlight: null}
    }
}
