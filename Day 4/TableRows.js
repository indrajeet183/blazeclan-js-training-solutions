var TableRows = function (employees) {
    var empRows = ""
    var empFields = Object.keys(employees[0])

    if (employees.length) {
        for (i = 0; i < employees.length; i++) {
            empRows += "<tr>"
            for (var j = 0; j < empFields.length; j++) {
                empRows += "<td>" + employees[i][empFields[j]] + "</td>"
            }
            empRows += '<td class="delete-button-wrapper"><button class="delete-button" value="' + employees[i][empFields[0]] + '">X</button><button class="update-button" value="' + employees[i].EmpNo + '">E</button></td></tr>'
        }
    } else {
        //TO DO  
    }

    return empRows
}