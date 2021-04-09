var Table = function (products) {
    var table = ""

    if (products === undefined) {
        return "<div>Invalid Products Data</div>"
    }

    if (products.length) {
        console.log(products)
        var productFields = Object.keys(products[0])
        table += '<table><thead>'

        table += TableHeader(productFields)
        table += '</thead>'

        table += '<tbody>'
        for (i = 0; i < products.length; i++) {
            table += '<tr id="product-' + i + '" draggable="true">'
            for (var j = 0; j < productFields.length; j++) {
                table += "<td>" + products[i][productFields[j]] + "</td>"
            }
            table += '<td class="delete-button-wrapper"><button class="delete-button" value="' + products[i][productFields[0]] + '">X</button><button class="update-button" value="' + products[i][productFields[0]] + '">E</button></td></tr>'
        }
        table += '</tbody>'
        table += '</table>'
        return table
    } else {
        return "<div>No Products Found!</div>"
    }

}