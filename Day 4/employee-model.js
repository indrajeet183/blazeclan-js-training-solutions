var Employee = function () {
    this.Employees = [{
        EmpNo: 966,
        EmpName: 'Jhon',
        Department: 'IT',
        Salary: 5000
    }]

    this.Departments = ['IT', 'FINANCE', 'HRM', 'MARKETING', 'SUPPORT']

    this.saveEmployee = function (emp) {
        var response = {
            success: false,
            message: `Failed to add Employee ${emp.EmpNo}!`
        }
        var result = this.getEmployeeById(emp.EmpNo)

        if (!result.success) {
            this.Employees.push(emp)
            response = {
                success: true,
                message: `Employee ${emp.EmpNo} added Successfully!`
            }
        } else {
            if (this.updateEmployee(emp)) {
                response = {
                    success: true,
                    message: `Employee ${emp.EmpNo} is updated Successfully!`
                }
            } else {
                response = {
                    success: false,
                    message: `Failed to update Employee ${emp.EmpNo}!`
                }
            }
        }
        return response
    }

    this.updateEmployee = function (updatedEmp) {
        // console.log('Inside update')
        var status = false;
        for (var i = 0; i < this.Employees.length; i++) {
            if (updatedEmp.EmpNo === this.Employees[i].EmpNo) {
                this.Employees[i] = updatedEmp
                status = true;
                break;
            }
        }
        return status
    }

    this.deleteEmployee = function (empNo) {
        var empIndex = false;
        var response = {
            success: false,
            message: `Failed to Delete Employee ${empNo}!`
        }
        for (var i = 0; i < this.Employees.length; i++) {
            if (empNo === this.Employees[i].EmpNo) {
                empIndex = i
            }
        }
        // console.log(empIndex)
        if (empIndex !== false) {
            var deletedEmp = Object.assign(this.Employees[empIndex])
            this.Employees.splice(empIndex, 1)
            response = {
                success: true,
                message: `Employee ${empNo} is Deleted Successfully!`,
                data: deletedEmp
            }
        }
        return response
    }

    this.getEmployeeById = function (empNo) {
        // console.log('Inside update')
        var response = {
            success: false,
            message: `Failed to Retrive Employee ${empNo}!`
        }
        var tempEmployee = {}
        for (var i = 0; i < this.Employees.length; i++) {
            if (empNo === this.Employees[i].EmpNo) {
                tempEmployee = Object.assign(this.Employees[i])
                response = {
                    success: true,
                    message: `Employee ${empNo} Retrive Successfully!`,
                    data: tempEmployee
                }
                break;
            }
        }
        return response;
    }
}