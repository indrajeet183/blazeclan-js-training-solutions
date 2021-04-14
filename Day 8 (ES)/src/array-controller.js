let products = [{
    ProductId: "100",
    ProductName: "Dell Latitude 3301",
    CategoryName: 'Laptop',
    Manufacturer: 'Dell',
    Price: '50000'
}, {
    ProductId: "210",
    ProductName: "Asus Zenbook Z1",
    CategoryName: 'Laptop',
    Manufacturer: 'Asus',
    Price: '45000'
}, {
    ProductId: "310",
    ProductName: "Samsung M41",
    CategoryName: 'Mobile',
    Manufacturer: 'Samsung',
    Price: '21000'
}, {
    ProductId: "351",
    ProductName: "One Plus 9T",
    CategoryName: 'Mobile',
    Manufacturer: 'One Plus',
    Price: '45000'
}, {
    ProductId: "151",
    ProductName: "Samsung G20",
    CategoryName: 'Mobile',
    Manufacturer: 'Samsung',
    Price: '90000'
}, {
    ProductId: "751",
    ProductName: "Dell Inspiron 15",
    CategoryName: 'Laptop',
    Manufacturer: 'Dell',
    Price: '65000'
}, {
    ProductId: "321",
    ProductName: "Asus Duo D2",
    CategoryName: 'Laptop',
    Manufacturer: 'Asus',
    Price: '75000'
}, {
    ProductId: "151",
    ProductName: "Samsung G20",
    CategoryName: 'Mobile',
    Manufacturer: 'Samsung',
    Price: '90000'
}, {
    ProductId: "210",
    ProductName: "Asus Zenbook Z1",
    CategoryName: 'Laptop',
    Manufacturer: 'Asus',
    Price: '45000'
}, {
    ProductId: "134",
    ProductName: "Fujifilm X-T200",
    CategoryName: 'Camera',
    Manufacturer: 'Fujifilm',
    Price: '72000'
}, {
    ProductId: "981",
    ProductName: "Sony Alpha 6400M",
    CategoryName: 'Camera',
    Manufacturer: 'Sony',
    Price: '84000'
}
]

window.onload = () => {
    document.getElementById('product-load').addEventListener('click', onHandleLoadTalbe, false)
    document.getElementById('product-filter').addEventListener('click', onHandleSearchByFilter, false)
    document.getElementById('product-remove-dup').addEventListener('click', onHandleRemoveDuplicate, false)
    document.getElementById('product-group').addEventListener('click', onHandleGroupBy, false)
}

const onHandleLoadTalbe = () => {
    loadTable(products)
}

const loadTable = (products) => {
    const productsTable = getTable(products)
    document.getElementById('product-data').innerHTML = productsTable
}

const onHandleRemoveDuplicate = () => {
    let duplicateResult = products.reduce((result, currentProduct) => {
        if (!result.hasOwnProperty(currentProduct.ProductName)) {
            result[currentProduct.ProductId] = currentProduct
        }
        return result
    }, {})

    console.log(duplicateResult)

    let result = []
    Object.keys(duplicateResult).forEach((key) => {
        console.log(key)
        result = [...result, duplicateResult[key]]
    })
    loadTable(result)
}

const onHandleSearchByFilter = () => {
    const searchKeyword = document.getElementById('filter-input').value
    if (searchKeyword.length) {
        let filterResult = products.filter((product) => {
            const result = Object.keys(product).map(e => product[e].toLowerCase().includes(searchKeyword.toLowerCase()))
            return result.includes(true)
        })
        loadTable(filterResult)
    } else {
        loadTable(products)
    }
}

const onHandleGroupBy = () => {
    const selectedGroup = document.getElementById('product-group-select').value
    //console.log(selectedGroup)
    const groupByResult = products.reduce((result, product) => {
        console.log(product)
        if (result.hasOwnProperty(product[selectedGroup])) {
            result[product[selectedGroup]].push(product)
        } else {
            result[product[selectedGroup]] = []
            result[product[selectedGroup]].push(product)
        }
        return result
    }, {})

    let result = []
    Object.keys(groupByResult).forEach((key) => {
        result = [...result, ...groupByResult[key]]
    })

    loadTable(result)
}

