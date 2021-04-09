var TableHeader = function (headers) {
    var rows = ""

    for (var i = 0; i < headers.length; i++) {
        rows += '<th>' + headers[i] + '</th>'
    }
    rows += '<th>Action</th>'

    return '<tr>' + rows + '</tr>'
}