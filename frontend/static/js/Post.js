export async function addFlight (flightNo, originIATA, originName, destIATA, destName, acType) {
    const flightNoRegex = /^BA\d{1,4}$/;
    const IATARegex = /^[A-Z]{3}$/;
    if (!flightNoRegex.test(flightNo)) {
        let errorMessage = 'Invalid flight number format';
        return { inputError: errorMessage, postError: null, addedFlight: null };
    } else if (!IATARegex.test(originIATA)) {
        let errorMessage = 'Invalid origin IATA format';
        return { inputError: errorMessage, postError: null, addedFlight: null };
    } else if (!IATARegex.test(destIATA)) {
        let errorMessage = 'Invalid destination IATA format';
        return { inputError: errorMessage, postError: null, addedFlight: null };
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
        return { inputError: null, postError: null, addedFlight : dataRecieve}
    } catch (postError) {
        console.error('Error adding flights: ', postError);
        return { inputError: null, postError: 'Network error', addedFlight: null };
    }
}
