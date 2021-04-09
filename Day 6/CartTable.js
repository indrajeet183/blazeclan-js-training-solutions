var CartTable = function (products) {
    var table = ""

    if (products === undefined) {
        return "<div>Invalid Products Data</div>"
    }

    if (products.length) {
        console.log(products)
        var productFields = Object.keys(products[0])
        table += '<table><thead>'

        table += TableHeader(productFields, false)
        table += '</thead>'

        table += '<tbody class="cart-table-data">'
        for (i = 0; i < products.length; i++) {
            table += '<tr id="product-' + i + '-dropped" draggable="true" name="cart-draggable-rows">'
            for (var j = 0; j < productFields.length; j++) {
                table += "<td name=" + productFields[j] + ">" + products[i][productFields[j]] + "</td>"
            }
        }
        table += '</tbody>'
        table += '</table>'
        return table
    } else {        
        table = "<table></thead>"
        var header = TableHeader(productFields, false)
        console.log(header)
        table += header
        table += '</thead>'
        table += '<tbody class="cart-table-data">'
        table += '</tbody>'
        table += '</table>'
        console.log(table)
        return table        
    }

}