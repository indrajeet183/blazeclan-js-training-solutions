class ProductRoutes {
    #dataUtil = {}
    constructor() {
        this.#dataUtil = new DataUtility()
    }

    getProducts = () => {
        return this.#dataUtil.sendRequest('GET')
    }

    getProduct = (productId) => {
        return this.#dataUtil.sendRequest('GET', '', productId)
    }

    addProduct = (product) => {
        return this.#dataUtil.sendRequest('POST', product)
    }

    updateProduct = (product) => {
        return this.#dataUtil.sendRequest('PUT', product, product.ProductRowId)
    }

    deleteProduct = (productRowId) => {
        return this.#dataUtil.sendRequest('DELETE', '', productRowId)
    }
}