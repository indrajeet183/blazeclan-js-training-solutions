var Product = function () {
    // products = [{
    // ProductId: 101,
    // ProductName: 'Aurora 51',
    // CategoryName: 'Laptop',
    // Manufacturer: 'Dell',
    // Description: "This is laptop",
    // Price: '10000'
    // }]

    //products = []    

    this.initialize = function () {
        this.getProductsFromLocalStorage()
    }


    this.CategoryName = ['ECT', 'ECL', 'FOD-FAST', 'FOD-DRK']
    this.Manufacturer = ['HP', 'IBM', 'TATA', 'BAJAJ', 'PARLE']

    this.saveProduct = function (product) {
        var response = {
            success: false,
            message: `Failed to add Product ${product.ProductId}!`
        }
        var result = this.getProductById(product.ProductId)

        if (!result.success) {
            this.saveDataToLocalStorage(product)
            response = {
                success: true,
                message: `Product ${product.ProductId} added Successfully!`
            }
        } else {
            if (this.updateProduct(product)) {
                response = {
                    success: true,
                    message: `Product ${product.ProductId} is updated Successfully!`
                }
            } else {
                response = {
                    success: false,
                    message: `Failed to update Product ${product.ProductId}!`
                }
            }
        }
        return response
    }

    this.updateProduct = function (updatedProduct) {
        // console.log('Inside update')
        var product = localStorage.getItem('Product-' + updatedProduct.ProductId)
        var status = false;
        if (product.length) {
            localStorage.setItem('Product-' + updatedProduct.ProductId, JSON.stringify(updatedProduct))
            status = true
        }

        return status
    }

    this.deleteProduct = function (ProductId) {
        var productIndex = false;
        var response = {
            success: false,
            message: `Failed to Delete Product ${ProductId}!`
        }

        var deletedProduct = localStorage.getItem('Product-' + ProductId)

        // console.log(productIndex)
        if (deletedProduct && deletedProduct.length) {
            localStorage.removeItem('Product-' + ProductId)
            response = {
                success: true,
                message: `Product ${ProductId} is Deleted Successfully!`,
                data: JSON.parse(deletedProduct)
            }
        }
        return response
    }

    this.getProductById = function (ProductId) {
        // console.log('Inside update')
        var products = this.getProductsFromLocalStorage()
        console.log(products)

        var response = {
            success: false,
            message: `Failed to Retrive Product ${ProductId}!`
        }

        var tempProduct = {}
        for (var i = 0; i < products.length; i++) {
            if (ProductId === products[i].ProductId) {
                tempProduct = Object.assign(products[i])
                response = {
                    success: true,
                    message: `Product ${ProductId} Retrive Successfully!`,
                    data: tempProduct
                }
                break;
            }
        }
        return response;
    }

    this.getProductsFromLocalStorage = function () {
        var products = []
        var productRowIds = Object.keys(localStorage)

        for (var i = 0; i < productRowIds.length; i++) {
            products.push(JSON.parse(localStorage.getItem(productRowIds[i])))
        }
        return products
    }

    this.saveDataToLocalStorage = function (product) {
        localStorage.setItem('Product-' + product.ProductId, JSON.stringify(product))
    }

    this.searchProductByKeyword = function (keyword) {
        var products = this.getProductsFromLocalStorage()
        // var searchResultIndex = []
        var searchResult = []
        //console.log(products)
        if (keyword.length) {
            if (products.length) {
                var fields = Object.keys(products[0])
                //console.log(fields)
                for (var i = 0; i < products.length; i++) {
                    var found = false
                    for (fieldNo = 0; fieldNo < fields.length; fieldNo++) {
                        //console.log(products[i][fields[fieldNo]])                        
                        if (typeof (products[i][fields[fieldNo]]) === 'string' && products[i][fields[fieldNo]].toLowerCase().includes(keyword.toLowerCase())) {
                            // if (!searchResultIndex.includes(i)) {
                            //     searchResultIndex.push(i)
                            //     searchResult.push(products[i])
                            // }
                            found = true
                        }
                    }
                    if(found)
                        searchResult.push(products[i])
                }
                // console.log(searchResult)
                return searchResult
            }
        } else {
            return products
        }
    }
}