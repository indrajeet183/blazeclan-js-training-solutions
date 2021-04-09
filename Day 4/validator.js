function addValidators() {
    var ruleObject = {
        submitButton: 'addEmp',
        fields: [{
            field: 'empNo',
            rule: ['numeric'],
            required: true
        }, {
            field: 'empName',
            rule: ['alphabetic'],
            required: true
        }, {
            field: 'empSal',
            rule: ['numeric'],
            required: true
        },
        ]
    }

    // add rules validator on keypress
    for (var fieldNo = 0; fieldNo < ruleObject.fields.length; fieldNo++) {
        for (var ruleNo = 0; ruleNo < ruleObject.fields[fieldNo].rule.length; ruleNo++) {
            if (ruleObject.fields[fieldNo].rule[ruleNo] === 'numeric') {
                document.getElementById(ruleObject.fields[fieldNo].field).addEventListener('keypress', validateNumeric, true)
            } else if (ruleObject.fields[fieldNo].rule[ruleNo] === 'alphabetic') {
                document.getElementById(ruleObject.fields[fieldNo].field).addEventListener('keypress', validateAlphabetic, true)
            }
        }
    }

    //add required validator on save
    document.getElementById(ruleObject.submitButton).addEventListener('click', function () {
        validateRequired(ruleObject.fields)
    }, false)
}

function validateNumeric(e) {
    // console.log(e.key)
    // console.log(parseInt(e.key))
    if (isNaN(e.key))
        e.preventDefault();
}

function validateAlphabetic(e) {
    // console.log(e.key)
    if (!(e.key >= 'a' && e.key <= 'z') && !(e.key >= 'A' && e.key <= 'Z') && !(e.key === " "))
        e.preventDefault();
}

function validateRequired(fields) {
    // console.log('validateRequired')
    var fieldNo = 0;
    while (fieldNo < fields.length) {
        if (document.getElementById(fields[fieldNo].field).value.length < 1) {
            isError = true;
            break
        }
        fieldNo++;
    }
    if (fieldNo === fields.length) isError = false
    // console.log(fieldNo)
}