var Product = new Product()
console.log(Product)
var isError = false
var isEditable = false
var historyLogs = []

function initialize() {
    Product.initialize()
    addValidators()
    var productList = Product.searchProductByKeyword("")
    var categories = Product.CategoryName
    var manufacturers = Product.Manufacturer
    populateCategories(categories)
    populateManufacturers(manufacturers)
    populateTable(productList)
    document.getElementById('product-add').addEventListener('click', onHandleSaveButton, false)
    document.getElementById('clear').addEventListener('click', clearInput, false)
    document.getElementById('product-search').addEventListener('keyup', onChangeSearchInput, false)
    addDeleteButtonEventListner()
    addEditButtonEventListner()
}

function populateTable(productList) {
    var rows = Table(productList)
    //console.log(rows)
    document.getElementById('product-table').innerHTML = rows
}

function populateCategories(categories) {
    var categoryHTML = RadioButtonGroup(categories, 'product-category')
    document.getElementById('product-category-data').innerHTML = categoryHTML
}

function populateManufacturers(manufacturers) {
    var manufacturerHTML = RadioButtonGroup(manufacturers, 'product-manfac')
    document.getElementById('product-manfac-data').innerHTML = manufacturerHTML
}


function onHandleSaveButton() {
    if (isError) {
        displayResult("Please Enter required field!", 'danger')
    } else {
        var product = {
            ProductId: document.getElementById('product-id').value,
            ProductName: document.getElementById('product-name').value,
            CategoryName: getCheckedCategory(),
            Manufacturer: getCheckedManfac(),
            Description: document.getElementById('product-desc').value,
            Price: parseInt(document.getElementById('product-price').value)
        }
        console.log(product)
        var response = Product.saveProduct(product)
        //console.log(response)
        if (response.success) {
            if (response.message.includes('added'))
                addLog(product, "add")
            else
                addLog(product, "update")
        }

        displayResult(response.message, response.success ? "success" : "danger")
        clearInput()

        populateTable(Product.getProductsFromLocalStorage())
        addDeleteButtonEventListner()
        addEditButtonEventListner()
    }
    if (isEditable) setEditable(false)
}

function addDeleteButtonEventListner() {
    var deleteButtons = document.getElementsByClassName('delete-button')
    //console.log(deleteButtons)
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', onHandleDeleteButton, false)
    }
}

function getCheckedCategory() {
    var categories = document.getElementsByName("product-category");
    var selectedCategory;

    for (var i = 0; i < categories.length; i++) {
        if (categories[i].checked)
            selectedCategory = categories[i].value;
    }

    return selectedCategory
}

function getCheckedManfac() {
    var manufacturers = document.getElementsByName("product-manfac");
    var selectedmanufacturer;

    for (var i = 0; i < manufacturers.length; i++) {
        if (manufacturers[i].checked)
            selectedmanufacturer = manufacturers[i].value;
    }

    return selectedmanufacturer
}

function addEditButtonEventListner() {
    var updateButtons = document.getElementsByClassName('update-button')
    // console.log(updateButtons)
    for (var i = 0; i < updateButtons.length; i++) {
        updateButtons[i].addEventListener('click', onHandleEditButton, false)
    }
}

function onHandleDeleteButton(e) {
    var productId = e.target.value
    console.log(productId)
    var response = Product.deleteProduct(productId)
    // console.log(response)
    if (response.success) {
        addLog(response.data, "remove")
    }

    displayResult(response.message, response.success ? "success" : "danger")
    clearInput()

    populateTable(Product.getProductsFromLocalStorage())
    addDeleteButtonEventListner()
    addEditButtonEventListner()
}

function onHandleEditButton(e) {
    var productId = e.target.value
    setEditable(true)
    // console.log(empId)
    var response = Product.getProductById(productId)
    // console.log(response)
    if (response.success) {
        var product = response.data
        document.getElementById('product-id').value = product.ProductId
        document.getElementById('product-name').value = product.ProductName
        document.getElementById(product.CategoryName.toLowerCase()).checked = true
        document.getElementById(product.Manufacturer.toLowerCase()).checked = true
        document.getElementById('product-desc').value = product.Description
        document.getElementById('product-price').value = product.Price
    } else {
        //TODO
        displayResult(response.message, response.success ? "success" : "danger")
        clearInput()
    }
}

function displayResult(msg, type) {
    if (type === 'success') {
        document.getElementById('result').className = "success"
        document.getElementById('result').innerHTML = `<span>${msg}</span>`
        setTimeout(function () {
            document.getElementById('result').className = "d-none"
        }, 3000)
    } else {
        document.getElementById('result').className = "danger"
        document.getElementById('result').innerHTML = `<span>${msg}</span>`
        setTimeout(function () {
            document.getElementById('result').className = "d-none"
        }, 3000)
    }
}

function clearInput() {
    var inputs = document.getElementsByTagName('input')
    for (var i = 0; i < inputs.length; i++) {
        console.log(inputs[i].type)
        if(inputs[i].type !== 'radio')
            inputs[i].value = ""
    }
    if (isEditable) setEditable(false)
}

function setEditable(flag) {
    if (flag) {
        isEditable = true
        document.getElementById('product-id').setAttribute('disabled', true)
    } else {
        isEditable = false
        document.getElementById('product-id').removeAttribute('disabled')
    }
}

function onChangeSearchInput(e) {
    //console.log(e)
    var products = Product.searchProductByKeyword(e.target.value)
    populateTable(products)
}