let stringObj
window.onload = () => {
    const onHandleEncrypt = (e) => {
        const str = document.getElementById('encrypt-source-str').value
        stringObj = new StringUtil(str)
        //console.log(str)        
        document.getElementById('encrypt-target-str').value = stringObj.Encrypt(str)
        e.preventDefault()
    }

    const onHandleDecrypt = (e) => {
        const str = document.getElementById('decrypt-target-str').value
        stringObj = new StringUtil(str)
        //console.log(str)        
        document.getElementById('decrypt-source-str').value = stringObj.Decrypt(str)
        e.preventDefault()
    }

    const OnHandleNumberToString = (e) => {
        const number = document.getElementById('number-source-str').value
        stringObj = new StringUtil(parseInt(number))
        //console.log(stringObj.NumberToString(345))
        document.getElementById('number-target-str').value = stringObj.NumberToString(number)
        e.preventDefault()
    }

    const onHandleStringToNumber = (e) => {
        const str = document.getElementById('string-number-target-str').value
        console.log(str)
        stringObj = new StringUtil(str)

        document.getElementById('string-num-source-str').value = stringObj.StringToNumber(str)
        e.preventDefault()
    }

    document.getElementById('btn-encrypt').addEventListener('click', onHandleEncrypt, false)
    document.getElementById('btn-decrypt').addEventListener('click', onHandleDecrypt, false)

    document.getElementById('btn-number-to-string').addEventListener('click', OnHandleNumberToString, false)
    document.getElementById('btn-string-to-number').addEventListener('click', onHandleStringToNumber, false)
}