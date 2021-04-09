var BillTable = function (bills) {
    var table = ""
    var billFields = ['BillId','Total','Date']
    if (bills === undefined) {
        return "<div>Invalid Bills Data</div>"
    }

    if (bills.length) {
        
        var billFields = Object.keys(bills[0])
        table += '<table><thead>'

        table += TableHeader(billFields,false)
        table += '</thead>'

        table += '<tbody class="bill-table-data">'
        for (i = 0; i < bills.length; i++) {
            table += '<tr id="bill-' + i + '" name="draggable-rows">'
            for (var j = 0; j < billFields.length; j++) {
                table += "<td name=" + billFields[j] + ">" + bills[i][billFields[j]] + "</td>"
            }            
        }
        table += '</tbody>'
        table += '</table>'
        return table
    } else {
        return "<div>No bills Found!</div>"
    }

}