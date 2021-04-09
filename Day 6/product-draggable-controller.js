function initializeDragAndDrop() {
    var productRows = document.getElementsByName('draggable-rows')

    for (var i = 0; i < productRows.length; i++) {
        console.log(productRows[i])
        productRows[i].addEventListener('dragstart', function (e) {
            console.log(e.target.id)
            e.dataTransfer.setData('DraggedRowId', e.target.id)
        }, false)
    }

    var targetTbody = document.getElementById('cart-table')
    //console.log(targetTbody)

    targetTbody.addEventListener('drop', function (e) {
        e.preventDefault()
        var droppedRowId = e.dataTransfer.getData('DraggedRowId')
        // console.log(droppedRowId)
        //console.log(e.target.id)
        //console.log(document.getElementById(droppedRowId))        
        var tempDom = document.getElementById('cart-table')
        //console.log(tempDom)        
        //console.log(tempDom.getElementsByClassName('cart-table-data'))
        var cloneDom = document.getElementById(droppedRowId).cloneNode(true)
        cloneDom.removeChild(cloneDom.lastChild)
        var lastRow = cloneDom.insertCell(-1)
        lastRow.setAttribute('name', 'Qty')
        lastRow.innerHTML = '<td>1</td>'
        cloneDom.id += '-dropped'

        var isPresent = isProductPresent(cloneDom.id)
        if (!isPresent) {
            tempDom.getElementsByClassName('cart-table-data')[0].appendChild(cloneDom)
            extractAndSaveData(cloneDom)
        }
        addListenerToCartProducts()
    }, false)

    targetTbody.addEventListener('dragover', function (e) {
        e.preventDefault()
    }, false)

    document.getElementById('delete-box').addEventListener('drop', function (e) {
        var cartRowId = e.dataTransfer.getData('DraggedCartRowId')
        console.log(cartRowId)
        var cartProductDom = document.getElementById(cartRowId)
        extractAndDeleteData(cartProductDom)
        cartProductDom.remove()
    }, false)

    document.getElementById('delete-box').addEventListener('dragover', function (e) {
        e.preventDefault()
    }, false)    
}

function isProductPresent(id) {
    var cartTable = document.getElementsByClassName('cart-table-data')[0]

    var rows = cartTable.getElementsByTagName('tr')
    var isPresent = false
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].id === id) {
            isPresent = true
            break
        }
    }
    if (isPresent) {
        var productDom = document.getElementById(id)
        productDom.lastChild.innerText = parseInt(productDom.lastChild.innerText) + 1
        extractAndSaveData(productDom)
        return true
    }
}

function extractAndSaveData(productDom) {
    console.log(productDom)
    var rows = productDom.children
    var tempObj = {}
    for (var i = 0; i < rows.length; i++) {
        var field = rows[i].getAttribute('name')
        //console.log(field)
        tempObj[field] = rows[i].innerText
    }
    //console.log(tempObj)

    updateCartProduct(tempObj)
}

function extractAndDeleteData(productDom) {
    console.log(productDom)
    var rows = productDom.children
    var tempObj = {}
    for (var i = 0; i < rows.length; i++) {
        var field = rows[i].getAttribute('name')
        //console.log(field)
        tempObj[field] = rows[i].innerText
    }
    //console.log(tempObj)

    deleteCartProduct(tempObj)
}

function addListenerToCartProducts() {
    var productRows = document.getElementsByName('cart-draggable-rows')
    console.log(productRows)
    for (var i = 0; i < productRows.length; i++) {
        console.log(productRows[i])
        productRows[i].addEventListener('dragstart', function (e) {
            console.log(e.target.id)
            e.dataTransfer.setData('DraggedCartRowId', e.target.id)
        }, false)
    }
}