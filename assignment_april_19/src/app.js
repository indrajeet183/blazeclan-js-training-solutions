let ui
let table
let productApi
window.onload = () => {
    const pupulateTable = (tableHtml) => {
        // console.log(tableHtml)
        document.getElementById('main-table').innerHTML = tableHtml
        ui.initializeHandlers()
    }

    const updateTableSubscriber = (data) => {
        console.log(data)
        productApi.updateProduct(data)
    }

    const deleteTableSubscriber = (data) => {
        productApi.deleteProduct(data.ProductRowId)
    }

    const debugSubscriber = (data) => {
        document.getElementById('logs').innerHTML += `<li class="list-group-item list-group-item-${data.type==="success"?'success':'danger'}">${data.msg}</li>`
    }

    ui = new UI(Product, validateProxyObject)
    productApi = new ProductRoutes()
    
    ui.subscribe('table-generate', pupulateTable)
    ui.subscribe('table-update', updateTableSubscriber)
    ui.subscribe('table-delete', deleteTableSubscriber)
    ui.subscribe('debug',debugSubscriber)
    
    productApi.getProducts().then((data) => {
        table = ui.Table(data, 5, true, true)
    }).catch((err) => {
        console.log(err)
    })
}