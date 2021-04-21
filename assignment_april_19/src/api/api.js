class DataUtility {
    #baseUrl = 'https://apiapptrainingnewapp.azurewebsites.net/api/Products/'

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

        if(method === 'PUT') {            
            //console.log(result.body)
            return result.body
        }else {
            return result.json()
        }
        
    }
}