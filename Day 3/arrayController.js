window.onload = function () {
    document.getElementById('calculate').addEventListener('click', function () {
        var inputStr = document.getElementById('array-input').value
        var inputArr = []
        var tempResult = ""
        var resultStr = ""

        inputStr.split(",").forEach(function (word) {
            inputArr.push(word)
        });

        // for (i = 0; i < inputArr.length; i += 2) {
        //     //console.log(i)
        //     if (inputArr.length > i + 1) {
        //         tempResult = Math.pow(parseFloat(inputArr[i]), parseFloat(inputArr[i + 1]))
        //         resultStr += `<span class="result-row">${inputArr[i]}<sup>${inputArr[i + 1]}</sup> = ${tempResult} </span><br>`
        //     } else {
        //         tempResult = parseFloat(inputArr[i])
        //         resultStr += `<span class="result-row">${inputArr[i]}<sup>1</sup> = ${tempResult} </span><br>`
        //     }
        // }

        for (i = 0; i < inputArr.length; i++) {
            //console.log(i)
            if (inputArr.length > i + 1) {
                tempResult = Math.pow(parseFloat(inputArr[i]), parseFloat(inputArr[i + 1]))
                resultStr += `<span class="result-row">${inputArr[i]}<sup>${inputArr[i + 1]}</sup> = ${tempResult} </span><br>`
            } else {
                tempResult = parseFloat(inputArr[i])
                resultStr += `<span class="result-row">${inputArr[i]}<sup>1</sup> = ${tempResult} </span><br>`
            }
        }


        document.getElementById('sort-result').innerHTML = `${resultStr}`
    })
}