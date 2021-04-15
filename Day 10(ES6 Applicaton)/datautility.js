class DataUtility {
    #baseUrl = 'https://apiapptrainingnewapp.azurewebsites.net/api/Products'

    orderBy(datasource, key, ordercondition) {
        // data source will be a array that will be rearranged
        // key is the property for rearramgement
        // ordercondition will be having value Ascending / Descending

        // return the modified datasurce
    }

    sendRequest = async (method = 'GET', reqBody = '') => {
        let result
        if (method === 'POST' || method === 'PUT') {
            result = await fetch(this.#baseUrl, {
                method: method,
                body: reqBody
            })
        } else {
            result = await fetch(this.#baseUrl, {
                method: method
            })
        }        
        return result.json()
    }
}