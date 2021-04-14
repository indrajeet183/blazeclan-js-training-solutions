const getTable = (products) => {
    //console.log(products)
    let table = "<table><thead>"
    if (products.length) {
        const header = getHeaders(Object.keys(products[0]))
        table += `${header}</thead><tbody>`
        table += products.map((product) => {
            let tds = Object.keys(product).map((key) => {
                //console.log(`<td>${product[key]}</td>`)
                return `<td>${product[key]}</td>`
            }).join('')
            //console.log(`<tr>${tds}</tr>`)
            return `<tr>${tds}</tr>`
        }).join('')
    } else {
        table = 'No products data!'
    }
    table += "</tbody></table>"
    return table
}