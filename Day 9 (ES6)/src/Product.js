class ProductMapping {
    #productsMapping = null
    #categoryReferences = []

    constructor() {
        this.#productsMapping = new WeakMap()
    }

    addProduct(product) {
        const productCategoryId = product.ProductCategory
        //console.log(product)
        let isAdded = false
        let msg = ""
        const ref = this.getKeyReferenceByCategoryId(productCategoryId)
        if (ref !== false) {
            if (!this.checkIfProductExists(product.ProductId, productCategoryId)) {
                this.#productsMapping.set(ref, [...this.#productsMapping.get(ref), product])
                isAdded = true
            } else {
                msg = `Product already exist with id ${product.ProductId}`
            }
        } else {
            msg = `Error while adding product for Category ${productCategoryId} ref doest not exist!`
        }

        if (!isAdded) {
            throw new Error(msg)
        }
    }

    addCategory(category) {
        if (this.#categoryReferences.length > 0) {
            category.CategoryId = `C${this.#categoryReferences.length + 1}`
            this.#categoryReferences.push(category)
            this.#productsMapping.set(category, [])
        } else {
            category.CategoryId = 'C1'
            this.#categoryReferences.push(category)
            this.#productsMapping.set(category, [])
        }
    }

    getProducts() {
        let result = []
        this.#categoryReferences.forEach((ref) => {
            this.#productsMapping.get(ref).forEach(product => result.push(product))
        })
        // console.log(result)
        return result
    }

    getCategories() {
        return this.#categoryReferences
    }

    checkIfCateogryExist(categoryId) {
        const result = this.#categoryReferences.filter(e => e.CategoryId === categoryId)
        if (result.length) throw new Error(`CategoryID ${categoryId} already exist!`)
        else return true
    }

    checkIfProductExists(productId, categoryId) {
        console.log(productId, categoryId)
        const filteredProducts = this.getProductsByCategoryId(categoryId)
        let isExist = false

        if (filteredProducts.length > 0) {
            const result = filteredProducts.filter(e => e.ProductId === productId)
            if (result.length > 0) isExist = true
        }
        return isExist
    }

    getWholeMap() {
        return this.#productsMapping
    }

    getProductsByCategoryId(categoryId) {
        console.log(categoryId)
        let result = []
        this.#categoryReferences.forEach((ref) => {
            if (categoryId === ref.CategoryId) {
                this.#productsMapping.get(ref).forEach(product => result.push(product))
            }
        })
        return result
    }

    getKeyReferenceByCategoryId(categoryId) {
        let reference = false
        this.#categoryReferences.forEach(e => {
            if (e.CategoryId === categoryId) reference = e
        })
        console.log(reference)
        return reference
    }

}