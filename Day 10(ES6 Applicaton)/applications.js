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

    getProduct(productId, callBack) {
        console.log(productId)
        const result = this.#util.sendRequest('GET', null, productId)
        result.then((data) => {
            callBack(data)
        }).catch(error => alert(`Faield to retrieve Product Data! . ${error}`))
    }

    getProducts(callBack) {
        const result = this.#util.sendRequest('GET')
        result.then((data) => {
            callBack(data)
        }).catch(error => alert(`Faield to retrieve Product Data! . ${error}`))
    }

    addProduct(product, callBack) {
        const result = this.#util.sendRequest('POST', product)
        result.then((data) => {
            callBack()
            alert(`Product ${product.ProductId} saved succesfully!`)
        }).catch(error => alert(`Faield to add Product ${product.ProductId} . ${error} !`))
    }

    updateProduct(product, callBack) {
        const result = this.#util.sendRequest('PUT', product, `${product.ProductRowId}`)
        console.log(result)
        result.then((data) => {
            callBack()
            alert(`Product ${product.ProductId} updated succesfully!`)
        }).catch(error => alert(`Faield to update Product ${product.ProductId}. ${error} !`))
    }

    deleteProduct(productId, callBack) {
        const result = this.#util.sendRequest('DELETE', '', productId)
        result.then((data) => {
            callBack()
            alert(`Product ${productId} deleted succesfully!`)
        }).catch(error => alert(`Faield to delete Product ${productId}. ${error}!`))
    }

}
let product
let isEditable = false
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
    product.getProducts(generateProductTable)
}

const generateProductTable = (data) => {
    const tableHTML = UIGenerator.generateTable(data)
    document.getElementById('product-data').innerHTML = tableHTML
    addTrHandler()
}

const generateCategoriesOptions = (data) => {
    const categoryHTML = UIGenerator.generateSelect(data, 'product-cat')
    document.getElementById('category-data-options').innerHTML = categoryHTML
}

const generateManfacOptions = (data) => {
    const manfacHTML = UIGenerator.generateSelect(data, 'product-manfac')
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
        product.addProduct(tempProductObj, generateTable)
        clearValues()
    } catch (e) {
        alert(e)
    }
}

const addTrHandler = () => {
    const tds = document.getElementById('product-data').getElementsByTagName('td')
    for (td of tds) {
        if (td.getAttribute("name") === 'ProductRowId')
            td.addEventListener('click', onHandleTrClick, false)
    }
}

const onHandleTrClick = (e) => {
    console.log(e.target.innerText)
    product.getProduct(e.target.innerText, populateFields)
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
        product.updateProduct(tempProductObj, generateTable)
        setEditable(false)
        clearValues()
    } catch (e) {
        alert(e)
    }
}

const deleteProduct = () => {
    const productId = document.getElementById('product-row-id').value
    product.deleteProduct(productId, generateTable)
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
}

const setEditable = (editable) => {
    isEditable = editable
    if (isEditable) {
        document.getElementById('update').setAttribute('class', '')
        document.getElementById('delete').setAttribute('class', '')
        document.getElementById('add').setAttribute('class', 'd-none')
        document.getElementById('product-id').setAttribute('disabled', 'true')
    } else {
        document.getElementById('update').setAttribute('class', 'd-none')
        document.getElementById('delete').setAttribute('class', 'd-none')
        document.getElementById('add').setAttribute('class', '')
        document.getElementById('product-id').setAttribute('disabled', 'false')
    }
}