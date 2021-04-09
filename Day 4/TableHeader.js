var TableHeader = function (emp) {
    var empFields = Object.keys(emp)
    var rows = ""

    for (var i = 0; i < empFields.length; i++) {
        rows += `<th>${empFields[i]}</th>`
    }
    rows += '<th>Action</th>'

    return `<tr>${rows}</tr>`
}