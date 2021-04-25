class StringUtil {

    #unitPlaceMapping = {
        1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine', 10: 'Ten'
    }

    #elevenMapping = {
        10: 'Ten', 11: 'Eleven', 12: 'Twelve', 13: 'Thirteen', 14: 'Fourteen', 15: 'Fifteen', 16: 'Sixteen', 17: 'Seventeen', 18: 'Eighteen', 19: 'Ninteen'
    }

    #tenthPlaceMapping = {
        10: 'Ten', 20: 'Twenty', 30: 'Thirty', 40: 'Fourty', 50: 'Fifty', 60: 'Sixty', 70: 'Seventy', 80: 'Eighty', 90: 'Ninty', 100: 'Hundred'
    }

    #aboveHundredMapping = {
        0: 'Thousand', 1: 'Lakh', 2: 'Crore', 3: 'Arab'
    }

    #number0Mapping = {
        "Arab": 10, "Crore": 8, "Lakh": 6, "Thousand": 4, "Hundred": 3
    }

    #getRevrseMapping = () => {
        return {
            unitMapping: Object.keys(this.#unitPlaceMapping).reduce((acc, next) => { acc[this.#unitPlaceMapping[next]] = next; return acc }, {}),
            elevenMapping: Object.keys(this.#elevenMapping).reduce((acc, next) => { acc[this.#elevenMapping[next]] = next; return acc }, {}),
            tenthMapping: Object.keys(this.#tenthPlaceMapping).reduce((acc, next) => { acc[this.#tenthPlaceMapping[next]] = next; return acc }, {}),
            aboveHundred: Object.keys(this.#aboveHundredMapping).reduce((acc, next) => { acc[this.#aboveHundredMapping[next]] = next; return acc }, {})
        }

    }

    constructor(str) {
        this.str = str
    }

    Encrypt = () => {
        return this.str.split("").map(c => c.charCodeAt(0)).join(".")
    }

    Decrypt = () => {
        return this.str.split('.').map(c => String.fromCharCode(c)).join("")
    }

    NumberToString = () => {
        const numberString = this.str.toString()
        //console.log(this.#getRevrseMapping())
        let result = ""

        if (numberString.length > 3) {
            const slicedStr = numberString.slice(0, -3)
            let tempArr = []
            console.log('Sliced String =' + slicedStr)
            if (slicedStr.length % 2 === 0) {
                slicedStr.split("").reduce((acc, next, _i, arr) => {
                    if (acc.length !== 2) {
                        acc.push(next)
                        if (_i === (arr.length - 1)) {
                            tempArr.push([...acc])
                        }
                        return acc
                    } else {
                        if (_i === (arr.length - 1)) {
                            acc.push(next)
                            tempArr.push([...acc])
                        } else {
                            tempArr.push([...acc])
                            acc = []
                            acc.push(next)
                        }
                        return acc
                    }
                }, [])


            } else if (slicedStr.length > 2) {
                tempArr = [[slicedStr[0]]]
                slicedStr.slice(1, slicedStr.length).split("").reduce((acc, next, _i, arr) => {
                    if (acc.length !== 2) {
                        acc.push(next)
                        if (_i === (arr.length - 1)) {
                            tempArr.push([...acc])
                        }
                        return acc
                    } else {
                        if (_i === (arr.length - 1)) {
                            acc.push(next)
                            tempArr.push([...acc])
                        } else {
                            tempArr.push([...acc])
                            acc = []
                            acc.push(next)
                        }
                        return acc
                    }
                }, [])

            } else {
                tempArr = [[slicedStr]]
            }

            let resultTemp = []
            tempArr.reverse().forEach((arr, _index) => {
                console.log(arr)
                const number = parseInt(arr.join(""))
                if (number > 0)
                    resultTemp.push(result.concat(this.getStringForTenth(number, true).concat(" " + this.#aboveHundredMapping[_index])).concat(" and "))
            })

            result += resultTemp.reverse().join("")

            result += this.getStringForHundredth(numberString.slice(slicedStr.length, numberString.length))

        } else {

        }
        return result
    }

    getStringForHundredth = (numberString) => {
        let result = ""
        const hundredthPlace = parseInt((parseInt(numberString) / 100) % 10)
        console.log('asdasd', hundredthPlace)

        if (numberString.length > 2 && hundredthPlace !== 0) {
            result += this.#unitPlaceMapping[parseInt(numberString / 100)].concat(" Hundred ")
            console.log(numberString)
            result = result.concat(this.getStringForTenth(numberString))
        } else if (hundredthPlace === 0) {
            result = result.concat(this.getStringForTenth(numberString.slice(1, 3), true))
        } else {
            result = result.concat(this.getStringForTenth(numberString, true))
        }
        return result
    }

    getStringForTenth = (numberString, isOne = false) => {
        let result = ""
        const tenthPlace = parseInt(numberString / 10) % 10
        const unitPlace = parseInt(numberString % 10)

        if (tenthPlace > 1) {
            console.log('if')
            result = result.concat(`${isOne ? '' : ' and '}` + this.#tenthPlaceMapping[parseInt(numberString / 10) % 10 + "0"])
            if (numberString % 10 !== 0) {
                result = result.concat(" " + this.#unitPlaceMapping[parseInt(numberString % 10)])
            }
        } else if (tenthPlace === 0 && unitPlace !== 0) {
            console.log('else if 2')
            console.log(numberString)
            result = result.concat(`${isOne ? '' : ' and '}` + this.#unitPlaceMapping[parseInt(numberString % 10)])
        } else if (unitPlace !== 0) {
            console.log('else if 3')
            result += this.#elevenMapping[parseInt(numberString % 100)]
        } else if (unitPlace !== 0 && tenthPlace !== 0) {
            result += this.#unitPlaceMapping[parseInt(numberString % 100)]
        }
        return result
    }

    StringToNumber = () => {
        const reverseMapping = this.#getRevrseMapping()
        let tempStr = this.str.replace(/ and /g, ' ')
        let resultArr = []
        const tempMapping = { 'Hundred': 'X', ...reverseMapping.aboveHundred }
        console.log(reverseMapping)

        Object.keys(tempMapping).reverse().forEach((key) => {
            let numberStr = tempStr.split(key)[0].trim()
            let result = 0
            if (tempStr.includes(key)) {
                const multiplier = Math.pow(10, this.#number0Mapping[key] - 1)
                if (reverseMapping.elevenMapping.hasOwnProperty(numberStr)) {
                    result += parseInt(reverseMapping.elevenMapping[numberStr]) * multiplier
                } else {
                    if (reverseMapping.unitMapping.hasOwnProperty(numberStr)) {
                        result += parseInt(reverseMapping.unitMapping[numberStr]) * multiplier
                    } else {
                        const tempArr = numberStr.split("")
                        tempArr.forEach((num) => {
                            if (reverseMapping.unitMapping.hasOwnProperty(num.trim())) {
                                result += parseInt(reverseMapping.unitMapping[num.trim()]) * multiplier
                            } else if (reverseMapping.tenthMapping.hasOwnProperty(num.trim())) {
                                result += parseInt(reverseMapping.tenthMapping[num.trim()]) * multiplier
                            }
                        })
                    }
                }
                resultArr.push(result)

                tempStr = tempStr.split(key).slice(1, tempStr.split(key).length).join("")
            }
        })

        let result = 0
        const tempArr = tempStr.trim().split(" ")
        tempArr.forEach((num) => {
            if (reverseMapping.unitMapping.hasOwnProperty(num.trim())) {
                result += parseInt(reverseMapping.unitMapping[num.trim()])
            } else if (reverseMapping.tenthMapping.hasOwnProperty(num.trim())) {
                result += parseInt(reverseMapping.tenthMapping[num.trim()])
            }
        })

        resultArr.push(result)
        return resultArr.reduce((a, b) => a + b)
    }
}

//Thirteen Lakh and Eleven Thousand and One Hundred  and Twenty Three