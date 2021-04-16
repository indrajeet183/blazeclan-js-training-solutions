let productMapping
window.onload = () => {
    document.getElementById('category-add').addEventListener('click', onHandleAddCategory, false)
    productMapping = new ProductMapping()
    //console.log(productMapping)
    document.getElementById('product-add').addEventListener('click', onHandleAddProduct, false)

}

const onHandleAddCategory = () => {
    // const categoryId = document.getElementById('category-id').value
    const categoryName = document.getElementById('category-name').value
    productMapping.addCategory({
        CategoryName: categoryName
    })
    clearCategoryInputs()
    generateProductCategories()
    generateCategoryTable()
}

const onHandleAddProduct = () => {
    console.log('clicked')
    const productId = document.getElementById('product-id').value
    const productName = document.getElementById('product-name').value
    const productCategory = document.getElementById('category-select').value
    productMapping.addProduct({
        ProductId: productId,
        ProductName: productName,
        ProductCategory: productCategory
    })
    clearProductInputs()
    generateProductsTable(false)
}

const clearCategoryInputs = () => {
    // document.getElementById('category-id').value = ""
    document.getElementById('category-name').value = ""
}

const clearProductInputs = () => {
    document.getElementById('product-id').value = ""
    document.getElementById('product-name').value = ""
    document.getElementById('category-select').value = ""
}

const generateProductCategories = () => {
    //console.log(productMapping.getCategories())
    const categoryHTML = generateOptions(productMapping.getCategories(), 'category-select')
    document.getElementById('category-select-data').innerHTML = categoryHTML
}

const generateCategoryTable = () => {
    const categoryTableHTML = generateTable(productMapping.getCategories())
    document.getElementById('category-data').innerHTML = categoryTableHTML
    addHandleTdClick()
}

const generateProductsTable = () => {
    let result = productMapping.getProducts()
    //console.log(result)

    const productsTableHTML = generateTable(result)
    document.getElementById('product-data').innerHTML = productsTableHTML
}

const generateProductsFilteredTable = (result) => {
    const productsTableHTML = generateTable(result)
    document.getElementById('product-data').innerHTML = productsTableHTML
}

const generateTable = (data) => {
    return UI.generateTable(data)
}

const generateOptions = (data, id) => {
    return UI.generateSelect(data, id)
}

const addHandleTdClick = () => {
    const tds = document.getElementById('category-data')
    for (let td of tds.getElementsByTagName('td')) {
        td.addEventListener('click', onHandleTdClick, false)
    }
}

const onHandleTdClick = (e) => {
    console.log('inside td event')
    const categoryId = e.target.innerText
    const products = productMapping.getProductsByCategoryId(categoryId)
    //console.log(products)
    generateProductsFilteredTable(products)
}
