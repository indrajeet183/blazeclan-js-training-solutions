class Product {
    constructor(BasePrice, CategoryName, Description, Manufacturer, ProductId, ProductName) {
        this.BasePrice = BasePrice,
            this.CategoryName = CategoryName,
            this.Description = Description,
            this.Manufacturer = Manufacturer,
            this.ProductId = ProductId,
            this.ProductName = ProductName,

            this.config = {
                'ProductName': {
                    rules: ['alphanumeric'],
                    required: true
                },
                'ProductId': {
                    rules: ['alphanumeric'],
                    startsWith: 'Prd-',
                    required: true
                },
                'BasePrice': {
                    rules: ['numeric'],
                    required: true
                }
            }

        this.errorField = {

        }
    }

    getProductObj() {
        return {
            CategoryName: this.CategoryName,
            Description: this.Description,
            Manufacturer: this.Manufacturer,
            ProductId: this.ProductId,
            ProductName: this.ProductName,
            BasePrice: this.BasePrice
        }
    }
}

const validateProxyObject = (obj) => {
    let validateDataProxy = new Proxy(obj, {
        set(target, prop, value) {            
            if (target.config.hasOwnProperty(prop)) {
                const rules = target.config[prop].rules
                if (target.config[prop].hasOwnProperty('startsWith')) {
                    if (value.startsWith(target.config[prop]['startsWith'])) {                        
                        rules.forEach((rule) => {
                            if (rule === 'alphanumeric') {
                                if (!(checkAlphanumeric(value) && checkRequired(value))) {
                                    target.errorField[prop] = { error: true, msg: `Please enter valid value for ${prop}` }
                                    returnValue.push(false)
                                } else {
                                    target.errorField[prop] = { error: false, msg: 'Correct value!' }
                                    returnValue.push(false)
                                }
                            }
                            if (rule === 'numeric') {
                                if (!(checkNumeric(parseInt(value)) && checkRequired(value))) {
                                    target.errorField[prop] = { error: true, msg: `Please enter valid value for ${prop}` }
                                    returnValue.push(false)
                                } else {
                                    target.errorField[prop] = { error: false, msg: 'Correct value!' }
                                    returnValue.push(Reflect.set(target, prop, value))
                                }
                            }
                        })
                        return !returnValue.includes(false)
                    } else {
                        target.errorField[prop] = { error: true, msg: "Product name doesn't start with 'Prd-'" }
                        return true
                    }
                } else {
                    let returnValue = []
                    rules.forEach((rule) => {
                        if (rule === 'alphanumeric') {
                            if (!(checkAlphanumeric(value) && checkRequired(value))) {
                                target.errorField[prop] = { error: true, msg: `Please enter valid value for ${prop}` }
                                returnValue.push(false)
                            } else {
                                target.errorField[prop] = { error: false, msg: 'Correct value!' }                                
                                returnValue.push(Reflect.set(target, prop, value))
                            }
                        }
                        if (rule === 'numeric') {
                            if (!(checkNumeric(value) && checkRequired(value))) {
                                target.errorField[prop] = { error: true, msg: `Please enter valid value for ${prop}` }
                                returnValue.push(false)
                            } else {
                                target.errorField[prop] = { error: false, msg: 'Correct value!' }
                                returnValue.push(Reflect.set(target, prop, value))
                            }
                        }
                    })
                    return !returnValue.includes(false)
                }
            } else {
                target.errorField[prop] = { error: false, msg: 'Correct value!' }
                return Reflect.set(target, prop, value)
            }
        },
        get(target, prop) {
            return Reflect.get(target, prop)
        },
    })
    return validateDataProxy;
}

const checkNumeric = (v) => {
    return (!isNaN(v) && (parseFloat(v) > 0))
}

const checkAlphanumeric = (v) => {
    return (checkIfAlphabet(v) || checkIfNumebr(v) || checkIfSpace(v))
}

const checkRequired = (v) => {
    return v.length > 0 ? true : false
}

const checkIfAlphabet = (v) => {
    return ((v >= 'a' && v <= 'z') || (v >= 'A' && v <= 'Z') || (v === " "))
}

const checkIfSpace = (v) => {
    return (v === " ")
}
class UI {

    #datasource = []
    #subscribers = {}

    constructor(target_class = false, target_validator = false) {
        this.page_size = 5
        this.current_page = 1
        this.limit = 5
        this.offset = 0
        this.can_edit = false
        this.can_delete = false
        this.checked_array = []
        this.sort_field = ""
        this.sort_type = "asc"
        this.target_class = target_class
        this.target_validator = target_validator
        this.check_all = false
    }

    subscribe = (event, callback) => {
        if (!this.#subscribers.hasOwnProperty(event)) {
            this.#subscribers[event] = []
        }

        this.#subscribers[event].push(callback)
        console.log(this.#subscribers)
    }

    publish = (event, data) => {
        if (!this.#subscribers.hasOwnProperty(event)) {
            return false
        }
        console.log(this.#subscribers)
        this.#subscribers[event].forEach(callBack => callBack(data))
    }


    generateHeader = (headers, can_edit, can_delete) => {
        let headerResult = `<td>${this.Input('boolean', '', '', false, "check-all")}</td>`
        if (headers.length) {
            headerResult += headers.map((header) => {
                return `<th id="sort-${header}">
                            <span>${header}</span> 
                            <span class="table-header-icon">
                                <i class="fas fa-sort-amount-${this.sort_field === header ? (this.sort_type === 'asc' ? 'up' : 'down') : 'up'}-alt"></i>
                            </span>    
                        </th>`
            }).join("")

            if (can_edit || can_delete) {
                headerResult += `<th colspan="3">
                            <select id="bulk-action" class="form-control form-control-sm">
                            <option value="">Bulk Action</option>
                            ${can_edit ? '<option value="edit">Edit</option>' : ''}
                            ${can_delete ? '<option value="delete">Delete</option>' : ''}
                            </select></th>`
            }

            headerResult = `<tr>${headerResult}</tr>`
        } else {
            headerResult = 'No headers data!'
        }
        return headerResult
    }

    generateFooter = () => {
        const total_pages = Math.ceil(this.#datasource.length / this.page_size)
        const pageArray = [...Array(total_pages).keys()].map(e => e + 1)
        let pageSize = []

        for (let i = 1; i <= 10; i++) {
            pageSize.push(i * 5)
            if ((i * 5) > this.#datasource.length)
                break
        }

        let footer = `<tfoot>
        <tr>
            <td class="table-footer-left-arrow${this.current_page === 1 ? ' icon-disable' : ''}">
                <i id="left-icon" class="fas fa-chevron-left"></i>
            </td>
            <td>Page No</td>                            
    `
        console.log(this.current_page)
        console.log(pageArray[pageArray.length - 1])
        footer += `<td>`.concat(this.Select(pageArray, 'table-page-select', this.current_page)).concat('</td>')
        footer += `<td colspan="3" class="table-footer-right-arrow${this.current_page === pageArray[pageArray.length - 1] ? ' icon-disable' : ''}"><i id="right-icon" class="fas fa-chevron-right"></i></td>`
        footer += `<td>Page Size</td>`
        footer += `<td colspan="2">`.concat(this.Select(pageSize, 'table-page-size-select', this.page_size)).concat('</td>')
        footer += "</tr></tfoot>"

        return footer

    }

    generateEditableRow = (object, _index) => {
        const keys = Object.keys(object)
        const inputTds = `<tr id="table-row-edit-${_index}" class="d-none">`.concat(keys.map((key, _i) => {
            let type = 'text'
            if (typeof object[key] === 'number') type = 'number'
            else if (typeof object[key] === 'boolean') type = 'boolean'
            else if (typeof object[key] === 'object') {
                const date = new Date(object[key])
                if (date.getTime()) type = 'date'
            }
            return `<td>${this.Input(type, key, object[key], (_i === 0 ? true : false))}</td>`
        }).join("")).concat(this.generateEditButtons(_index, true)).concat(this.generateDeleteButton(_index)).concat('</tr>')
        return inputTds
    }

    generateEditButtons = (id, isEdit = false) => {
        let tds = ""
        const idPrefix = isEdit ? 'table-action' : 'table-info'
        tds += `<td id="${idPrefix}-edit-${id}">
                    <button class="btn btn-info table-action-btn">Edit</button>
                </td>`
        tds += `<td  id="${idPrefix}-update-${id}" class="d-none">
                    <button class="btn btn-success table-action-btn">Update</button>
                </td>`
        tds += `<td  id="${idPrefix}-cancel-${id}" class="d-none">
                    <button class="btn btn-danger table-action-btn">Cancel</button>
                </td>`
        return tds
    }

    generateDeleteButton = (id) => {
        return `<td>
                    <button id="table-action-delete-${id}" class="btn btn-danger table-action-btn"><i class="fas fa-trash-alt"></i>                    </button>
                </td>`
    }

    generateTable = (log = true) => {
        this.Loader(true)

        //clearTimeout(loadStart)
        let table = `<table class="table" id="ui-table"><thead>`
        if (this.#datasource.length > 0) {
            const keys = Object.keys(this.#datasource[0])
            const header = this.generateHeader(keys, this.can_edit, this.can_delete)
            table += `${header}</thead><tbody>`
            const resultSet = this.#datasource.slice(this.offset, this.limit)
            table += resultSet.map((datasource, _index) => {
                let tds = `<td>${this.Input('boolean', 'table-row-checkbox', _index, false, `table-row-check-${_index}`)}</td>`
                tds += Object.keys(datasource).map((key) => {
                    return `<td name="${key}">${datasource[key]}</td>`
                }).join('')

                if (this.can_edit) {
                    tds += this.generateEditButtons(_index)
                }

                if (this.can_delete) {
                    tds += this.generateDeleteButton(_index)
                }

                return `<tr id="table-row-${_index}">${tds}</tr>${this.generateEditableRow(datasource, _index)}`
            }).join('')
        } else {
            table = 'No data!'
            this.publish('debug', { type: 'danger', msg: `Failed to Generate Table no data found!` })
        }
        table += "</tbody>"

        table += this.generateFooter()

        table += "</table>"

        this.publish('table-generate', table)
        if (log) this.publish('debug', { type: 'success', msg: `Table Generated Successfully with ${this.#datasource.length} rows!` })
        this.Loader(false)
    }

    Loader = (status) => {
        if (status) {
            document.getElementById('loader').className = ''
            document.getElementById('main-table').style.opacity = '0.2'
        } else {
            setTimeout(() => {
                document.getElementById('loader').className = 'd-none'
                document.getElementById('main-table').style.opacity = '1'
            }, 1000)
        }
    }

    Input = (type, placholder, value = "", disabled = false, id = "", className = "") => {
        let input = false
        switch (type) {
            case 'text': {
                input = `<input ${id.length ? 'id="' + id + '"' : ''} class="form-control${className.length ? ' ' + className : ""}" type="${type}" value="${value}" name="${placholder}" ${disabled ? "disabled" : ""}></input>`
                break
            }
            case 'number': {
                input = `<input ${id.length ? 'id="' + id + '"' : ''} class="form-control${className.length ? ' ' + className : ""}" type="${type}" value="${value}" name="${placholder}" ${disabled ? "disabled" : ""}></input>`
                break
            }
            case 'boolean': {
                input = `<input ${id.length ? 'id="' + id + '"' : ''} class="form-check-input${className.length ? ' ' + className : ""}" type="checkbox" value="${value}" name="${placholder}" ${disabled ? "disabled" : ""}></input>`
                break
            }
            case 'date': {
                input = `<input ${id.length ? 'id="' + id + '"' : ''} class="form-control${className.length ? ' ' + className : ""} type="date" "value=${value} name="${placholder}" ${disabled ? "disabled" : ""}></input>`
                break
            }
        }
        return input
    }


    Table = (datasource, page_size, can_edit, can_delete) => {
        this.#datasource = datasource
        this.page_size = page_size
        this.limit = page_size
        this.can_edit = can_edit
        this.can_delete = can_delete

        this.generateTable()

    }

    Select = (datasource, id, selected) => {
        let select = `<select id="${id}" class="form-control">`
        if (datasource.length) {
            select += datasource.map(option => `<option value="${option}" ${option === selected ? 'selected' : ''}>${option}</option>`).join("")
        } else {
            select = 'No Records Found'
        }

        select += '</select>'

        return select
    }

    onnHandleNextPage = () => {
        this.offset += this.page_size
        this.limit += this.page_size
        this.current_page += 1
        this.generateTable(false)
    }

    onnHandlePreviousPage = () => {
        //console.log(this.offset, this.page_size)
        this.offset -= this.page_size
        this.limit -= this.page_size
        this.current_page -= 1
        this.generateTable(false)
    }

    onHandleChangePageSize = (e) => {
        console.log(e.target.value)
        this.limit = parseInt(e.target.value)
        this.page_size = parseInt(e.target.value)
        console.log(this.current_page, this.page_size, this.offset, this.limit)
        this.generateTable(false)
        this.publish('debug', { type: 'success', msg: `Changed page size to ${e.target.value}!` })
    }

    onHandleChangePage = (e) => {
        this.current_page = parseInt(e.target.value)
        this.offset = (this.current_page - 1) * this.page_size
        this.limit = this.offset + this.page_size
        console.log(this.offset, this.limit)
        this.generateTable(false)
    }

    onHandleSort = (e) => {

        let sortField = e.path[2].id.replace('sort-', '')
        if (e.target.tagName === 'SPAN') {
            sortField = e.path[1].id.replace('sort-', '')
        }

        this.sort_field = sortField

        if (this.sort_type === 'asc') this.sort_type = 'desc'
        else this.sort_type = 'asc'

        this.#datasource = this.#datasource.sort((first, second) => {
            if (this.sort_type === 'asc') {
                switch (typeof first[sortField]) {
                    case 'string': {
                        if (first[sortField] < second[sortField]) {
                            return -1
                        }
                        return 1
                        break;
                    }
                    default: {
                        return first[sortField] - second[sortField]
                    }
                }
            } else {
                switch (typeof first[sortField]) {
                    case 'string': {
                        if (first[sortField] < second[sortField]) {
                            return 1
                        }
                        return -1
                    }
                    default: {
                        return second[sortField] - first[sortField]
                    }
                }
            }
        })
        this.publish('debug', { type: 'success', msg: `Sorted table by ${sortField} in ${this.sort_type === 'asc' ? 'Ascending' : 'Descending!!'}` })
        this.generateTable(false)
    }

    onHandleEdit = (e) => {
        this.Loader(true)
        const rowId = e.path[2].id
        //console.log(rowId)
        console.log(rowId, rowId.split('-')[rowId.split('-').length - 1])
        this.toggleEditRow(rowId, rowId.split('-')[rowId.split('-').length - 1])
        this.Loader(false)
    }

    toggleEditRow = (rowId, id) => {
        const editableRowId = 'table-row-edit-'.concat(id)
        const editBtnId = 'table-action-edit-'.concat(id)
        const updateBtnId = 'table-action-update-'.concat(id)
        const cancelBtnId = 'table-action-cancel-'.concat(id)
        console.log(editBtnId, updateBtnId, cancelBtnId)
        document.getElementById(rowId).className += 'd-none'
        document.getElementById(editableRowId).className = document.getElementById(editableRowId).className.replace('d-none', '')
        document.getElementById(editBtnId).className = document.getElementById(editBtnId).className.concat('d-none')
        document.getElementById(updateBtnId).className = document.getElementById(updateBtnId).className.replace('d-none', '')
        document.getElementById(cancelBtnId).className = ''
    }

    onHandleCancel = (e) => {
        this.Loader(true)
        //console.log(e)
        const rowId = e.path[2].id.replace('-edit', '')
        const editableRowId = rowId.replace('table-row', 'table-row-edit')
        const editBtnId = rowId.replace('table-row', 'table-action-edit')
        const updateBtnId = rowId.replace('table-row', 'table-action-update')
        const cancelBtnId = rowId.replace('table-row', 'table-action-cancel')
        console.log(rowId, editBtnId, updateBtnId, cancelBtnId, editableRowId)
        document.getElementById(rowId).className = document.getElementById(rowId).className.replace('d-none', '')
        document.getElementById(editableRowId).className = document.getElementById(editableRowId).className.concat('d-none')
        document.getElementById(editBtnId).className = document.getElementById(editBtnId).className.replace('d-none', '')
        document.getElementById(updateBtnId).className = document.getElementById(updateBtnId).className.concat('d-none')
        document.getElementById(cancelBtnId).className = ''
        this.Loader(false)
    }

    onHandleUpdate = (e) => {
        this.Loader(true)
        const row = e.path[2]
        const rowId = row.id.split('-')[row.id.split('-').length - 1]
        const updateBtnId = `table-action-update-${rowId}`
        const cancelBtnId = `table-action-cancel-${rowId}`
        const editBtnId = `table-action-edit-${rowId}`
        const inputs = row.getElementsByTagName('input')
        let inputObj = {}
        let tempObj = {}

        for (let input of inputs) {
            tempObj[input.getAttribute('name')] = input.value
            inputObj[input.getAttribute('name')] = input
        }

        if (this.target_class !== false && this.target_validator !== false) {
            const tempTargetOjb = new this.target_class()
            let proxyObj = this.target_validator(tempTargetOjb)
            for (let input of inputs) {
                try {
                    proxyObj[input.getAttribute('name')] = input.value
                    // console.log(tempTargetOjb.errorField)
                } catch (e) {
                    console.log(e.message, tempTargetOjb.errorField)
                }
            }
            const errors = Object.keys(tempTargetOjb.errorField)
            let isError = false
            errors.forEach((field) => {
                if (tempTargetOjb.errorField[field].error) {
                    isError = true
                    inputObj[field].className = inputObj[field].className.concat(' is-invalid')
                    console.log(inputObj[field].parentElement)
                    inputObj[field].parentElement.innerHTML = new DOMParser().parseFromString(inputObj[field].parentElement.getElementsByTagName('input')[0].outerHTML + `<div name="alert-msg" class="alert alert-danger" role="alert">${tempTargetOjb.errorField[field].msg}</div>`, 'text/html').body.innerHTML
                } else {
                    inputObj[field].className = inputObj[field].className.concat(' is-valid')
                }
            })
            //console.log(tempTargetOjb.errorField)

            if (!isError) {
                this.#datasource[rowId] = tempObj
                this.onHandleCancel(e)
                const tds = document.getElementById(`table-row-${rowId}`).getElementsByTagName('td')
                for (let td of tds) {
                    if (td.getAttribute('name'))
                        td.innerText = tempObj[td.getAttribute('name')]
                }
                this.publish('table-update', this.#datasource[rowId])
                this.publish('debug', { type: 'success', msg: `Updated table row Successfully! ${JSON.stringify(this.#datasource[rowId])}` })
            } else {
                this.publish('debug', { type: 'danger', msg: `Failed to update row, Please enter valid data! ${JSON.stringify(tempObj)}` })
            }
            //console.log(this.#datasource)
        }

        this.Loader(false)
    }

    onHandleDelete = (e) => {
        const row = e.path[3]
        const rowId = row.id.split('-')[row.id.split('-').length - 1]
        // console.log(rowId)        
        this.deleteFromDataSource(rowId, 1)
        this.generateTable(false)
    }

    deleteFromDataSource = (pos, nrow) => {
        const tempOb = this.#datasource.splice(pos, nrow)
        this.publish('table-delete', tempOb[0])
        this.publish('debug', { type: 'success', msg: `Deleted table row Successfully! ${JSON.stringify(tempOb[0])}` })
    }

    onHandleActionButtons = (e) => {
        if (e.target.parentElement.id.includes('edit')) this.onHandleEdit(e)
        else if (e.target.parentElement.id.includes('cancel')) this.onHandleCancel(e)
        else if (e.target.parentElement.id.includes('update')) this.onHandleUpdate(e)
        else if (e.target.parentElement.id.includes('delete')) this.onHandleDelete(e)
    }

    onHandleCheckAll = (e) => {
        const checkboxes = document.getElementById('ui-table').getElementsByClassName('form-check-input')
        if (e.target.checked) {
            for (let checkbox of checkboxes) {
                checkbox.checked = true
            }
        } else {
            for (let checkbox of checkboxes) {
                checkbox.checked = false
                this.onHandleCancel()
            }
        }
        console.log(this.limit, this.offset)
        //const tempOb = this.#datasource.splice(rowId, 1)
    }

    getCheckedRow = () => {
        const checkboxesElements = document.getElementById('ui-table').getElementsByClassName('form-check-input')
        let checkedBoxes = []
        for (let checkbox of checkboxesElements) {
            if (checkbox.checked)
                checkedBoxes.push(checkbox)
        }
        //console.log(checkedBoxes)
        return checkedBoxes
    }

    onHandleBulkAction = (e) => {
        console.log(e.target.value)
        const checkedRows = this.getCheckedRow()
        console.log(checkedRows)
        if (checkedRows.length > 0) {
            if (e.target.value === 'edit') {
                checkedRows.forEach((row) => {
                    if (row.id !== 'check-all')
                        this.toggleEditRow('table-row-' + row.value, row.value)
                })
            } else if (e.target.value === 'delete') {
                checkedRows.forEach((row) => {
                    this.deleteFromDataSource(row.value, 1)
                })
                this.generateTable(false)
            }
        } else {
            this.publish('debug', { type: 'danger', msg: 'No rows are selected!' })
        }
    }

    initializeHandlers() {
        document.getElementById('right-icon').addEventListener('click', this.onnHandleNextPage, false)
        document.getElementById('left-icon').addEventListener('click', this.onnHandlePreviousPage, false)
        document.getElementById('table-page-size-select').addEventListener('click', this.onHandleChangePageSize, false)
        document.getElementById('table-page-select').addEventListener('click', this.onHandleChangePage, false)
        document.getElementById('check-all').addEventListener('click', this.onHandleCheckAll, false)
        const ths = document.getElementById('ui-table').getElementsByTagName('th')
        for (let th of ths) {
            if (th.id.length > 0)
                th.addEventListener('click', this.onHandleSort, false)
        }
        const actionBtns = document.getElementsByClassName('table-action-btn')
        for (let btn of actionBtns) {
            btn.addEventListener('click', this.onHandleActionButtons, false)
        }
        document.getElementById('bulk-action').addEventListener('change', this.onHandleBulkAction, false)
    }
}
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
class DataUtility {
    #baseUrl = 'https://apiapptrainingnewapp.azurewebsites.net/api/Products/'

    sendRequest = async (method = 'GET', reqBody = '', url = "") => {
        let result
        console.log(reqBody)
        console.log(JSON.stringify(reqBody))
        if (method === 'POST' || method === 'PUT') {
            result = await fetch(this.#baseUrl + url, {
                method: method,
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })            
        } else {
            result = await fetch(this.#baseUrl + url, {
                method: method
            })
        }

        if(method === 'PUT') {            
            //console.log(result.body)
            return result.body
        }else {
            return result.json()
        }
        
    }
}
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