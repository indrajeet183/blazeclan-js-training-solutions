window.onload = function () {
    var btns = document.getElementsByTagName('button')
    var text = document.getElementById('text').innerText

    for (var btn of btns) {
        btn.addEventListener('click', function (e) {
            var inputVal = document.getElementById('search-input').value
            switch (e.target.id) {
                case "count": {
                    var i = 0;
                    var count = 0
                    var indexArr = []
                    var res = ""
                    var indexes = ""
                    while (i !== -1 && inputVal.length) {
                        //console.log(text, inputVal)
                        i = text.indexOf(inputVal, i + 1)
                        if (i != -1) {
                            indexArr.push(i)
                            count += 1
                        }
                    }

                    if (count > 0) {
                        res = `Count: ${count}`
                        indexes = `Indexses: ${indexArr.join(", ")}`
                    } else {
                        res = `The word <strong>"${inputVal}"</strong> not found in given text.`
                    }
                    // document.getElementById('count-res').innerHTML = res
                    // document.getElementById('count-indexes').innerText = indexes                    
                    setResult({
                        "result": res,
                        "index-result": indexes
                    })
                    document.getElementById('text').innerHTML = text.replaceAll(`${inputVal}`, `<span class="search-highlight">${inputVal}</span>`)
                    break;
                }

                case "vowel": {
                    count = 0
                    indexArr = []
                    tempText = ""
                    var vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
                    for (i = 0; i < text.length; i++) {
                        if (vowels.includes(text.charAt(i))) {
                            tempText += `<span class="vowel-highlight">${text.charAt(i)}</span>`
                            count += 1
                            indexArr.push(i)
                        } else {
                            tempText += text.charAt(i)
                        }

                    }
                    // document.getElementById('count-vowel').innerText = ""
                    // document.getElementById('count-vowel').innerText = `Count: ${count}`
                    // document.getElementById('count-vowel-indexes').innerText = `Indexses: ${indexArr.join(",")}`
                    // document.getElementById('text').innerHTML = tempText
                    setResult({
                        "result": `Count: ${count}`,
                        "index-result": `Indexses: ${indexArr.join(", ")}`
                    })
                    document.getElementById('text').innerHTML = tempText
                    tempText = ""
                    break;
                }

                case "statement-count": {
                    resetText(text)
                    count = text.split(". ").length
                    var result = `Statement count: ${count}<br>`
                    result += text.split(". ").map(function(statement){
                        if(statement.length>2)
                            return `<li>${statement}.</li>`
                    }).join("<br>")
                    //console.log(text.split("."))
                    // document.getElementById('count-statement').innerText = ""
                    // document.getElementById('count-statement').innerText = `Count: ${count}`
                    setResult({
                        result: `<ol>${result}</ol>`
                    })
                    break;
                }

                case "title-case": {
                    resetText(text)
                    var tempArr = []
                    text.split(" ").forEach(function (word) {
                        tempWord = word.split("")
                        tempWord[0] = tempWord[0].toUpperCase()
                        tempArr.push(tempWord.join(""))
                    })
                    // document.getElementById('title-case-res').innerText = ""
                    // document.getElementById('title-case-res').innerText = tempArr.join(" ")
                    setResult({
                        result: tempArr.join(" ")
                    })
                    break;
                }
                case "reverse": {
                    resetText(text)
                    var reversedString = ""

                    for (i = text.length - 1; i >= 0; i--) {
                        reversedString += text.charAt(i)
                    }

                    setResult({
                        result: reversedString
                    })
                    break;
                }

                case "find-numeric": {
                    i = 0;
                    count = 0
                    var numbersArr = []
                    indexArr = []

                    var tempText = ""
                    for (i = 0; i < text.length; i++) {
                        if (isNumber(text.charAt(i))) {
                            tempText += text.charAt(i)
                        } else {
                            if (tempText.length) {
                                if (text.charAt(i) === "." && isNumber(text.charAt(i + 1))) {
                                    tempText += text.charAt(i)
                                } else {
                                    indexArr.push(i - tempText.length)
                                    numbersArr.push(tempText)
                                    tempText = ""
                                }
                            }
                        }
                    }
                    //console.log(numbersArr)
                    //console.log(indexArr)
                    tempText = text
                    numbersArr.forEach(function (number) {
                        tempText = tempText.replaceAll(number, `<span class="number-highlight">${number}</span>`)
                    })

                    // document.getElementById('number-res').innerText = ""
                    // document.getElementById('number-res-indexes').innerText = ""
                    // document.getElementById('number-res').innerText = `Numbers: ${numbersArr.join(", ")}`
                    // document.getElementById('number-res-indexes').innerText = `Indexses: ${indexArr.join(", ")}`

                    setResult({
                        "result": `Numbers: ${numbersArr.join(", ")}`,
                        "index-result": `Indexses: ${indexArr.join(", ")}`
                    })

                    document.getElementById('text').innerHTML = tempText
                    tempText = ""
                    break;
                }
            }
        })
    }

    function isNumber(char) {
        return (char >= "0" && char <= "9")
    }

    function setResult(result) {                
        //reset result
        document.getElementById('res').innerHTML = ""
        document.getElementById('res-indexes').innerText = ""

        // show result
        document.getElementById('res').innerHTML = `<span>${result['result']}</span>`
        if (result.hasOwnProperty('index-result')) {
            document.getElementById('res-indexes').innerHTML = `<span>${result['index-result']}</span>`
        }
    }

    function resetText(text) {
        document.getElementById('text').innerText = text
    }
}