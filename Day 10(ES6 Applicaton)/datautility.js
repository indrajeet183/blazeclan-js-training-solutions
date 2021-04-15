class DataUtility {
    #baseUrl = 'https://apiapptrainingnewapp.azurewebsites.net/api/Products/'

    orderBy(datasource, key, ordercondition) {
        // data source will be a array that will be rearranged
        // key is the property for rearramgement
        // ordercondition will be having value Ascending / Descending

        // return the modified datasurce
    }

    sendRequest = async (method = 'GET', reqBody = '', url = "") => {
        let result
        console.log(reqBody)
        console.log(JSON.stringify(reqBody))
        if (method === 'POST' || method === 'PUT') {
            result = await fetch(this.#baseUrl + url, {
                method: method,
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            result = await fetch(this.#baseUrl + url, {
                method: method
            })
        }
        //console.log(result.json())
        return result.json()
    }
}