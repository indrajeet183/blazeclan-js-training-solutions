var database;
var transaction;
var purchasedProductsTable;
var billTable;
var purchasedColumns = ['ProductId', 'ProductName', 'CategoryName', 'Manufacturer', 'Description', 'Price', 'Qty']
var billColumns = ['BillId', 'GrandTotal', 'Date']

function createDatabase() {
    database = window.indexedDB.open("Ecommerce")

    database.onupgradeneeded = function (e) {
        var dbRef = e.target.result

        purchasedProductsTable = dbRef.createObjectStore('PurchasedProducts', { keyPath: "ProductId" })
        billTable = dbRef.createObjectStore('Bill', { keyPath: "BillId" })

        var columnConstraints = { unique: false };

        for (var i = 0; i < purchasedColumns.length; i++) {
            var columnName = purchasedColumns[i]
            purchasedProductsTable.createIndex(columnName + "1", columnName, columnConstraints)
        }

        for (var i = 0; i < billColumns.length; i++) {
            var columnName = billColumns[i]
            billTable.createIndex(columnName + "1", columnName, columnConstraints)
        }
        addLog("Database created with Objecstore successfuly!", 'info', false)
    }

    database.onsuccess = function (e) {
        addLog("Database created successfuly!", 'info', false)
    }

    database.onerror = function (e) {
        addLog("Failed to create database!", 'error', false)
    }
}

function saveCartProduct(product) {
    database = window.indexedDB.open('Ecommerce')

    if (database) {
        database.onsuccess = function (e) {
            var txn = e.target.result.transaction('PurchasedProducts', 'readwrite')

            purchasedProductsTable = txn.objectStore('PurchasedProducts')

            var saveRequest = purchasedProductsTable.add(product)

            saveRequest.onsuccess = function () {
                addLog(product, 'add')
            }

            saveRequest.onerror = function () {
                addLog('Failed to add product to IndexDB ObjectStore', 'error', false)
            }
        }
    } else {
        addLog('Failed to save the record! Error opening the Database', 'error', false);
    }
}

function updateCartProduct(product) {
    database = window.indexedDB.open('Ecommerce')

    if (database) {
        database.onsuccess = function (e) {
            var txn = e.target.result.transaction('PurchasedProducts', 'readwrite')

            purchasedProductsTable = txn.objectStore('PurchasedProducts')

            var saveRequest = purchasedProductsTable.put(product)

            saveRequest.onsuccess = function () {
                addLog(product, 'update')
            }

            saveRequest.onerror = function () {
                addLog('Failed to update product to IndexDB ObjectStore', 'error', false)
            }
        }
    } else {
        addLog('Failed to update the record! Error opening the Database', 'error', false);
    }
}

function deleteCartProduct(product) {
    database = window.indexedDB.open('Ecommerce')

    if (database) {
        database.onsuccess = function (e) {
            var txn = e.target.result.transaction('PurchasedProducts', 'readwrite')

            purchasedProductsTable = txn.objectStore('PurchasedProducts')

            var saveRequest = purchasedProductsTable.delete(product.ProductId)

            saveRequest.onsuccess = function () {
                addLog(product, 'removed')
            }

            saveRequest.onerror = function () {
                addLog('Failed to delete product to IndexDB ObjectStore', 'error', false)
            }
        }
    } else {
        addLog('Failed to delete the record! Error opening the Database', 'error', false);
    }
}

function loadCartProducts(callBack) {
    var products = []

    database = window.indexedDB.open('Ecommerce')

    if (database) {
        database.onsuccess = function (e) {
            var txn = e.target.result.transaction('PurchasedProducts', 'readwrite')

            purchasedProductsTable = txn.objectStore('PurchasedProducts')

            txn.oncomplete = function () {
                addLog('Cart products retrieved succesfully!', 'info', false)
                callBack(products)
            }

            var readCursor = purchasedProductsTable.openCursor()

            readCursor.onsuccess = function (e) {
                var cursor = e.target.result
                if (cursor) {
                    console.log(cursor)
                    products.push(cursor.value)
                    cursor.continue()
                }
            }

            readCursor.onerror = function (e) {
                addLog('Failed to retrieve products!', 'error', false)
            }
        }
    } else {
        addLog('Failed to retrieve the record! Error opening the Database', 'error', false);
    }
}

function saveBillRecord(bill) {
    database = window.indexedDB.open('Ecommerce')

    if (database) {
        database.onsuccess = function (e) {
            var txn = e.target.result.transaction('Bill', 'readwrite')

            billTable = txn.objectStore('Bill')

            var saveRequest = billTable.add(bill)

            saveRequest.onsuccess = function () {
                addLog(bill, 'add')
            }

            saveRequest.onerror = function () {
                addLog('Failed to add bill to IndexDB ObjectStore', 'error', false)
            }
        }
    } else {
        addLog('Failed to save the record! Error opening the Database', 'error', false);
    }
}

function loadBillRecords(callBack) {
    var bills = []

    database = window.indexedDB.open('Ecommerce')

    if (database) {
        database.onsuccess = function (e) {
            var txn = e.target.result.transaction('Bill', 'readwrite')

            billTable = txn.objectStore('Bill')

            txn.oncomplete = function () {
                addLog('Bill records retrieved succesfully!', 'info', false)
                callBack(bills)
            }

            var readCursor = billTable.openCursor()

            readCursor.onsuccess = function (e) {
                var cursor = e.target.result
                if (cursor) {
                    bills.push(cursor.value)
                    cursor.continue()
                }
            }

            readCursor.onerror = function (e) {
                addLog('Failed to retrieve bill records!', 'error', false)
            }
        }
    } else {
        addLog('Failed to retrieve the record! Error opening the Database', 'error', false);
    }
}

function calculateBill(callBack) {
    loadCartProducts(function (products) {
        var grandTotal = 0
        if (products.length) {
            for (var i = 0; i < products.length; i++) {
                grandTotal += (parseFloat(products[i].Price) * parseFloat(products[i].Qty))
            }
            loadBillRecords(function (bills) {
                if (bills.length) {
                    var lastBill = bills[bills.length - 1].BillId
                    var lastBillId = lastBill.split("-")[1]
                    console.log(lastBillId)
                    var tempBill = {
                        BillId: "BILL-" + (parseInt(lastBillId) + 1),
                        GrandTotal: grandTotal,
                        Date: new Date().toTimeString()
                    }
                    callBack(tempBill)
                } else {
                    var billId = 'BILL-1'
                    var tempBill = {
                        BillId: billId,
                        GrandTotal: grandTotal,
                        Date: new Date().toTimeString()
                    }
                    callBack(tempBill)
                }
            })
        } else {
            //TODO
        }
    })
}