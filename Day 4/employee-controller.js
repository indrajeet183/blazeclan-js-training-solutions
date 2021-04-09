var employee = new Employee()
var isError = false
var isEditable = false
var historyLogs = []

function initialize() {
    addValidators()
    var employeeList = employee.Employees
    var departments = employee.Departments
    populateDepartments(departments)
    populateTablHeaders(employeeList)
    populateEmployees(employeeList)
    document.getElementById('addEmp').addEventListener('click', onHandleSaveButton, false)
    document.getElementById('clear').addEventListener('click', clearInput, false)
    addDeleteButtonEventListner()
    addEditButtonEventListner()
}

function populateTablHeaders(employeeList) {
    var rows = TableHeader(employeeList[0])
    //console.log(rows)
    document.getElementById('table-head').innerHTML = rows
}

function populateDepartments(departments) {
    var header = ""
    for (i = 0; i < departments.length; i++) {
        header += `<option value=${departments[i]}>${departments[i]}</option>`
    }
    document.getElementById('empDept').innerHTML = header
}

function populateEmployees(employees) {
    var empRows = TableRows(employees)

    document.getElementById('table-body').innerHTML = empRows
}

function onHandleSaveButton() {
    if (isError) {
        displayResult("Please Enter required field!", 'danger')
    } else {
        var emp = {
            EmpNo: parseInt(document.getElementById('empNo').value),
            EmpName: document.getElementById('empName').value.trim(),
            Department: document.getElementById('empDept').value,
            Salary: parseFloat(document.getElementById('empSal').value),
        }
        var response = employee.saveEmployee(emp)
        //console.log(response)
        if(response.success){
            if(response.message.includes('added'))
                addLog(emp,"add")
            else 
                addLog(emp,"update")
        }

        displayResult(response.message, response.success ? "success" : "danger")
        clearInput()

        populateEmployees(employee.Employees)
        addDeleteButtonEventListner()
        addEditButtonEventListner()
    }
    if(isEditable) setEditable(false)
}

function addDeleteButtonEventListner() {
    var deleteButtons = document.getElementsByClassName('delete-button')
    //console.log(deleteButtons)
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', onHandleDeleteButton, false)
    }
}

function addEditButtonEventListner() {
    var updateButtons = document.getElementsByClassName('update-button')
    // console.log(updateButtons)
    for (var i = 0; i < updateButtons.length; i++) {
        updateButtons[i].addEventListener('click', onHandleEditButton, false)
    }
}

function onHandleDeleteButton(e) {
    var empId = e.target.value
    // console.log(empId)
    var response = employee.deleteEmployee(parseInt(empId))
    // console.log(response)
    if(response.success){
        addLog(response.data,"remove")
    }

    displayResult(response.message, response.success ? "success" : "danger")
    clearInput()

    populateEmployees(employee.Employees)
    addDeleteButtonEventListner()
    addEditButtonEventListner()
}

function onHandleEditButton(e) {
    var empId = e.target.value
    setEditable(true)
    // console.log(empId)
    var response = employee.getEmployeeById(parseInt(empId))
    // console.log(response)
    if (response.success) {
        var emp = response.data
        document.getElementById('empNo').value = emp.EmpNo
        document.getElementById('empName').value = emp.EmpName
        document.getElementById('empDept').value = emp.Department
        document.getElementById('empSal').value = emp.Salary
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
        inputs[i].value = ""
    }
    if(isEditable) setEditable(false)
}

function setEditable(flag) {
    if (flag) {
        isEditable = true
        document.getElementById('empNo').setAttribute('disabled', true)
    } else {
        isEditable = false
        document.getElementById('empNo').removeAttribute('disabled')
    }
}