class UIGenerator {
    static generateTable = (data) => {
        //console.log(data)
        let table = '<table class="table table-responsive"><thead>'
        if (data.length > 0) {
            const header = this.generateHeader(Object.keys(data[0]))
            table += `${header}</thead><tbody>`
            table += data.map((product) => {
                let tds = Object.keys(product).map((key) => {
                    return `<td name="${key}">${product[key]}</td>`
                }).join('')
                return `<tr>${tds}</tr>`
            }).join('')
        } else {
            table = 'No data data!'
        }
        table += "</tbody></table>"
        return table
    }

    static generateSelect = (data, id, name) => {
        let selectHTML = `<select class="form-control" name=${name} id="${id}">`
        if (data.length) {
            selectHTML += data.map((e) => `<option value="${e}">${e}</option>`)
            selectHTML += '</select>'
        } else {
            selectHTML = "No Data found!"
        }
        return selectHTML
    }

    static generateHeader = (headers) => {
        let headerResult = ""
        if (headers.length) {
            headerResult = headers.map((header) => {
                return `<th>${header}</th>`
            }).join("")
            headerResult = `<tr>${headerResult}</tr>`
        } else {
            headerResult = 'No headers data!'
        }
        return headerResult
    }
}