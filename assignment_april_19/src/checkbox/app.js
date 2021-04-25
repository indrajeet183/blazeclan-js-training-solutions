let uiObj
window.onload = () => {
    uiObj = new UI()

    document.getElementById('input-array').value = `[
        {
            "DataValueField":"b1",
            "DataTextField":"Box 1"
        },
        {
            "DataValueField":"b2",
            "DataTextField":"Box 2"
        }
    ]`

    const generateList = (e) => {
        const inputVal = document.getElementById('input-array').value
        try {
            const arr = JSON.parse(inputVal)
            console.log(arr)
            const resultHTML = uiObj.Input('checkbox', 'checkbox-demo', arr, false, "")
            console.log(resultHTML)
            document.getElementById('target-div').innerHTML = resultHTML
            e.preventDefault()
        } catch (e) {
            console.log(e)
        }
    }

    document.getElementById('generate').addEventListener('click', generateList, false)

}

// [
//     {
//     "DataValueField":"b1",
//     "DataTextField":"Box 1"
//     },
//     {
//     "DataValueField":"b2",
//     "DataTextField":"Box 2"
//     }
//     ]