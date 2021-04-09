var TableHeader = function (headers,needAction=true) {
    var rows = ""
    var productColumns = ['ProductId', 'ProductName', 'CategoryName', 'Manufacturer', 'Description', 'Price', 'Qty']

    if(headers === undefined){
        headers = productColumns
    }

    for (var i = 0; i < headers.length; i++) {
        rows += '<th>' + headers[i] + '</th>'
    }
    if(needAction)
        rows += '<th>Action</th>'

    // console.log('<tr>' + rows + '</tr>')
    return '<tr>' + rows + '</tr>'
}