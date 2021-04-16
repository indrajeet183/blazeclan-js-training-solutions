class ProductLogic {
    #products = [];
    #categories = [];
    #manufacturer = []
    #util = null

    constructor() {
        this.#products = [];
        this.#categories = ['ECT', 'ECL', 'FOD', 'FURNITURE', 'OTHER'];
        this.#manufacturer = ['IBM', 'DELL', 'Asus', 'Godrej', 'IKEA', 'Maxx']
        this.#util = new DataUtility()
    }
    getCategories() {
        return this.#categories;
    }

    getManufacturers() {
        return this.#manufacturer
    }

    getProduct(productId, callBack,showMessage) {
        //console.log(productId)
        const result = this.#util.sendRequest('GET', null, productId)
        result.then((data) => {
            callBack(data)
            showMessage(`Product ${productId} retreived successfully!`,'success')
        }).catch(error => showMessage(`Faield to retrieve Product Data! . ${error}`,'danger'))
    }

    getProducts(callBack,showMessage) {
        const result = this.#util.sendRequest('GET')
        result.then((data) => {
            callBack(data)
            showMessage(`${data.length} Products retreived successfully!`,'success')
        }).catch(error => showMessage(`Faield to retrieve Product Data! . ${error}`),'danger')
    }

    addProduct(product, callBack, pupulateField, showMessage) {
        const result = this.#util.sendRequest('POST', product)
        result.then((data) => {
            callBack()
            console.log(data)
            pupulateField(data.ProductRowId)
            showMessage(`Product ${product.ProductId} saved succesfully!`, 'success')
        }).catch(error => showMessage(`Faield to add Product ${product.ProductId} . ${error} !`, 'danger'))
    }

    updateProduct(product, callBack, showMessage) {
        const result = this.#util.sendRequest('PUT', product, `${product.ProductRowId}`)
        console.log(result)
        result.then((data) => {
            callBack()
            showMessage(`Product ${product.ProductId} updated succesfully!`, 'success')
        }).catch(error => showMessage(`Faield to update Product ${product.ProductId}. ${error} !`, 'danger'))
    }

    deleteProduct(productId, callBack, showMessage) {
        const result = this.#util.sendRequest('DELETE', '', productId)
        result.then((data) => {
            callBack()
            showMessage(`Product ${productId} deleted succesfully!`, 'success')
        }).catch(error => showMessage(`Faield to delete Product ${productId}. ${error}!`, 'danger'))
    }

}
let product
let isEditable = false
let errorField = {

}

const hoverColorMapping = {
    'ECT': 'danger',
    'Electronics': 'danger',
    'Electronic': 'danger',
    'ECL': 'primary',
    'Electrical': 'primary',
    'Food': 'warning',
    'FOD': 'warning',
    'FURNITURE': 'info',
    'OTHER': 'dark'
}

window.onload = () => {
    product = new ProductLogic()
    generateTable()
    const categoriesData = product.getCategories()
    const manfacData = product.getManufacturers()
    generateCategoriesOptions(categoriesData)
    generateManfacOptions(manfacData)
    document.getElementById('add').addEventListener('click', addProduct, false)
    document.getElementById('update').addEventListener('click', updateProduct, false)
    document.getElementById('delete').addEventListener('click', deleteProduct, false)
}

const generateTable = () => {
    product.getProducts(generateProductTable,showMessage)
}

const generateProductTable = (data) => {
    const tableHTML = UIGenerator.generateTable(data)
    document.getElementById('product-data').innerHTML = tableHTML
    addTrHandler()    
    addTrHoverHandler()
}

const generateCategoriesOptions = (data) => {
    const categoryHTML = UIGenerator.generateSelect(data, 'product-cat', 'CategoryName')
    document.getElementById('category-data-options').innerHTML = categoryHTML
}

const generateManfacOptions = (data) => {
    const manfacHTML = UIGenerator.generateSelect(data, 'product-manfac', 'Manufacturer')
    document.getElementById('manfac-data-options').innerHTML = manfacHTML
}

const addProduct = () => {
    const validateObj = new ValidateData()
    let proxyObj = validateProxyObject(validateObj)
    try {
        proxyObj.ProductId = document.getElementById('product-id').value
        proxyObj.ProductName = document.getElementById('product-name').value
        proxyObj.Description = document.getElementById('product-desc').value
        proxyObj.BasePrice = document.getElementById('product-price').value
        proxyObj.CategoryName = document.getElementById('product-cat').value
        proxyObj.Manufacturer = document.getElementById('product-manfac').value

        const tempProductObj = validateObj.getProductObj()
        console.log(tempProductObj)
        product.addProduct(tempProductObj, generateTable, populateLastRowId, showMessage)
        clearValues()
    } catch (e) {
        validateInputs()
    }
}

const populateLastRowId = (rowId) => {
    document.getElementById('last-row-id').value = rowId
}

const addTrHandler = () => {
    const tds = document.getElementById('product-data').getElementsByTagName('td')
    for (td of tds) {
        if (td.getAttribute("name") === 'ProductRowId')
            td.addEventListener('click', onHandleTrClick, false)
    }    
}

const addTrHoverHandler = () => {
    const trs = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr')
    //console.log(trs)
    if (trs.length) {
        for (tr of trs) {            
            const category = tr.getElementsByTagName('td')[4].innerText
            tr.addEventListener('mouseenter', (e) => {                
                if (hoverColorMapping.hasOwnProperty(category)) {
                    e.target.setAttribute('class', `bg-${hoverColorMapping[category]}`)
                } else {
                    e.target.setAttribute('class', `bg-dark`)
                }
            }, false)
            tr.addEventListener('mouseleave', (e) => {
                e.target.removeAttribute('class')
            }, false)
        }
    }
}

const onHandleTrClick = (e) => {
    console.log(e.target.innerText)
    product.getProduct(e.target.innerText, populateFields,showMessage)
}

const populateFields = (product) => {
    document.getElementById('product-id').value = product.ProductId
    document.getElementById('product-name').value = product.ProductName
    document.getElementById('product-desc').value = product.Description
    document.getElementById('product-price').value = product.BasePrice
    document.getElementById('product-cat').value = product.CategoryName
    document.getElementById('product-manfac').value = product.Manufacturer
    document.getElementById('product-row-id').value = product.ProductRowId
    setEditable(true)
}

const updateProduct = () => {
    const validateObj = new ValidateData()
    let proxyObj = validateProxyObject(validateObj)
    try {
        proxyObj.ProductId = document.getElementById('product-id').value
        proxyObj.ProductName = document.getElementById('product-name').value
        proxyObj.Description = document.getElementById('product-desc').value
        proxyObj.BasePrice = document.getElementById('product-price').value
        proxyObj.CategoryName = document.getElementById('product-cat').value
        proxyObj.Manufacturer = document.getElementById('product-manfac').value

        let tempProductObj = validateObj.getProductObj()
        tempProductObj.ProductRowId = document.getElementById('product-row-id').value
        product.updateProduct(tempProductObj, generateTable, showMessage)
        setEditable(false)
        clearValues()
    } catch (e) {
        validateInputs()
    }
}

const deleteProduct = () => {
    const productId = document.getElementById('product-row-id').value
    product.deleteProduct(productId, generateTable, showMessage)
    setEditable(false)
    clearValues()
}

const clearValues = () => {
    document.getElementById('product-id').value = ""
    document.getElementById('product-name').value = ""
    document.getElementById('product-desc').value = ""
    document.getElementById('product-price').value = ""
    document.getElementById('product-cat').value = ""
    document.getElementById('product-manfac').value = ""
    document.getElementById('product-row-id').value = ""
    document.getElementById('product-id').removeAttribute('disabled', 'false')
}

const setEditable = (editable) => {
    isEditable = editable
    if (isEditable) {
        document.getElementById('update').setAttribute('class', document.getElementById('update').getAttribute('class').replace('d-none', ""))
        document.getElementById('delete').setAttribute('class', document.getElementById('delete').getAttribute('class').replace('d-none', ""))
        document.getElementById('add').setAttribute('class', document.getElementById('delete').getAttribute('class') + " d-none")
        document.getElementById('product-id').setAttribute('disabled', 'true')
    } else {
        document.getElementById('update').setAttribute('class', document.getElementById('update').getAttribute('class') + " d-none")
        document.getElementById('delete').setAttribute('class', document.getElementById('delete').getAttribute('class') + " d-none")
        document.getElementById('add').setAttribute('class', document.getElementById('add').getAttribute('class').replace('d-none', ""))
        document.getElementById('product-id').setAttribute('disabled', 'false')
    }
}

showMessage = (msg, type) => {
    document.getElementById('alert').style.display = 'block'
    document.getElementById('alert').innerHTML = `<div class="alert ${type === 'success' ? 'alert-success' : 'alert-danger'}" role="alert">
                                                    ${msg}
                                                </div>`
    const t = setTimeout(() => {
        document.getElementById('alert').style.display = 'none'
        clearTimeout(t)
    }, 3000)
    

}

const validateInputs = () => {
    const keys = Object.keys(errorField)
    keys.forEach((field) => {
        if (errorField[field].error) {
            const oldClass = document.getElementsByName(field)[0].getAttribute('class').replace('custom-valid', '')
            document.getElementsByName(field)[0].setAttribute('class', oldClass + " custom-invalid")
            let span = document.getElementsByName(field)[0].parentElement.getElementsByTagName('span')[0]
            span.setAttribute('class', 'invalid-feedback')
            span.innerHTML = errorField[field].msg
            span.style.display = 'block'
        } else {
            const oldClass = document.getElementsByName(field)[0].getAttribute('class').replace('custom-invalid', '')
            document.getElementsByName(field)[0].setAttribute('class', oldClass + ' custom-valid')
            let span = document.getElementsByName(field)[0].parentElement.getElementsByTagName('span')[0]
            span.setAttribute('class', 'valid-feedback')
            span.innerHTML = errorField[field].msg
            span.style.display = 'block'
        }
    })
}