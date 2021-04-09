function addValidators() {
    var ruleObject = {
        submitButton: 'product-add',
        fields: [{
            field: 'product-id',
            rule: ['alphanumeric'],
            required: true
        }, {
            field: 'product-name',
            rule: ['alphanumeric'],
            required: true
        }, {
            field: 'product-desc',
            rule: ['alphanumeric'],
            required: true
        }, {
            field: 'product-price',
            rule: ['numeric'],
            required: true
        },
        ]
    }

    // add rules validator on keypress
    for (var fieldNo = 0; fieldNo < ruleObject.fields.length; fieldNo++) {
        //console.log(ruleObject.fields[fieldNo])
        if (ruleObject.fields[fieldNo].hasOwnProperty('rule')) {
            for (var ruleNo = 0; ruleNo < ruleObject.fields[fieldNo].rule.length; ruleNo++) {
                if (ruleObject.fields[fieldNo].rule[ruleNo] === 'numeric') {
                    document.getElementById(ruleObject.fields[fieldNo].field).addEventListener('keypress', validateNumeric, true)
                } else if (ruleObject.fields[fieldNo].rule[ruleNo] === 'alphabetic') {
                    document.getElementById(ruleObject.fields[fieldNo].field).addEventListener('keypress', validateAlphabetic, true)
                } else if (ruleObject.fields[fieldNo].rule[ruleNo] === 'alphanumeric') {
                    document.getElementById(ruleObject.fields[fieldNo].field).addEventListener('keypress', validateAlphanumeric, true)
                }
            }
        }
    }

    // add required validator on save
    document.getElementById(ruleObject.submitButton).addEventListener('click', function () {
        validateRequired(ruleObject.fields)
    }, false)
}

function validateNumeric(e) {
    // console.log(e.key)
    // console.log(parseInt(e.key))
    if (!checkIfNumebr(e.key))
        e.preventDefault();
}

function validateAlphabetic(e) {
    // console.log(e.key)
    if (!checkIfAlphabet(e.key))
        e.preventDefault();
}

function validateAlphabetAndSpace(e) {
    if (!(checkIfAlphabet(e.key) || checkIfSpace(e.key)))
        e.preventDefault()
}

function validateAlphanumeric(e) {
    console.log(!((checkIfAlphabet(e.key)) || checkIfNumebr(e.key)))// && !checkIfNumebr(e.key)) && !checkIfSpace(e.key))
    if (!(checkIfAlphabet(e.key) || checkIfNumebr(e.key) || checkIfSpace(e.key)))
        e.preventDefault()
}

function validateRequired(fields) {
    // console.log('validateRequired')
    var fieldNo = 0;
    while (fieldNo < fields.length) {
        console.log(fields[fieldNo].field)
        if (document.getElementById(fields[fieldNo].field).value.length < 1) {
            isError = true;
            break
        }
        fieldNo++;
    }
    if (fieldNo === fields.length) isError = false
    // console.log(fieldNo)
}

function checkIfNumebr(char) {
    return (!isNaN(char))
}

function checkIfAlphabet(char) {
    return ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char === " "))
}

function checkIfSpace(char) {
    return (char === " ")
}