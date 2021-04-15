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
    getProducts(callBack) {
        const result = this.#util.sendRequest('GET')
        result.then((data) => {
            callBack(data)
        }).catch((error) => {
            console.log(error)
        })
    }

    addProduct(prd) {
        this.#products.push(prd);
        return this.#products;
    }
}

window.onload = () => {
    const product = new ProductLogic()
    product.getProducts(generateProductTable)
    const categoriesData = product.getCategories()
    const manfacData = product.getManufacturers()
    generateCategoriesOptions(categoriesData)
    generateManfacOptions(manfacData)    
    document.getElementById('add').addEventListener('click', addProduct, false)
}

const generateProductTable = (data) => {
    const tableHTML = UIGenerator.generateTable(data)
    document.getElementById('product-data').innerHTML = tableHTML
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
        proxyObj.ProductId = document.getElementById('product-id')
        proxyObj.ProductName = document.getElementById('product-name')
        proxyObj.Description = document.getElementById('product-desc')
        proxyObj.BasePrice = document.getElementById('product-price')
        proxyObj.CategoryName = document.getElementById('product-cat')
        proxyObj.Manufacturer = document.getElementById('product-manfac')

        console.log(proxyObj)
    } catch (e) {
        alert(e)
    }
}