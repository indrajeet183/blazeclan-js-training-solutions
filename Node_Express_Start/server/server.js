const express = require('express')
const cors = require('cors');
const { expr } = require('jquery');

let employees = [
    { EmpNo: 101, EmpName: 'ABC', DeptName: 'IT', Salary: 45000 },
    { EmpNo: 102, EmpName: 'PQR', DeptName: 'HR', Salary: 25000 },
    { EmpNo: 103, EmpName: 'ABC', DeptName: 'SL', Salary: 35000 },
    { EmpNo: 104, EmpName: 'PQR', DeptName: 'IT', Salary: 15000 },
    { EmpNo: 105, EmpName: 'ABC', DeptName: 'HR', Salary: 59200 },
    { EmpNo: 106, EmpName: 'PQR', DeptName: 'SL', Salary: 25000 },
    { EmpNo: 107, EmpName: 'ABC', DeptName: 'IT', Salary: 1000 },
    { EmpNo: 108, EmpName: 'PQR', DeptName: 'HR', Salary: 20000 },
    { EmpNo: 109, EmpName: 'PQR', DeptName: 'SL', Salary: 30000 }
];

const expressApp = new express()

expressApp.use(express.urlencoded({ extended: false }))
expressApp.use(express.json())

expressApp.use(cors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*'
}))

expressApp.get("/api/employees/:id", (req, res) => {
    try {
        const empNo = req.params.id

        if (empNo) {
            const searchedEmp = employees.filter(emp => emp.EmpNo === parseInt(empNo))

            res.status(200).send({
                success: true,
                message: "Data received successfully!",
                data: searchedEmp
            })
        } else {
            res.status(400).send({
                success: false,
                message: `Invalid param ID passed!`,
            })
        }
    } catch (e) {
        res.status(500).send({
            success: false,
            message: `Internal server error occured! Error Message =  ${e.message}`
        })
    }
})

expressApp.get("/api/employees", (req, res) => {
    try {
        res.status(200).send({
            success: true,
            message: "Data received successfully!",
            data: employees
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            message: `Internal server error occured! Error Message =  ${e.message}`
        })
    }

})

expressApp.post('/api/employees/', (req, res) => {
    const reqData = req.body
    try {
        employees.push(reqData)
        res.status(200).send({
            success: true,
            message: "Employee added succesfully!",
            data: JSON.stringify(reqData)
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            message: `Internal server error occured! Error Message =  ${e.message}`
        })
    }

})

expressApp.put('/api/employees/:id', (req, res) => {
    try {
        const empNo = req.params.id
        const reqData = req.body

        if (empNo) {
            const searchedEmpIndex = employees.findIndex(emp => emp.EmpNo === parseInt(empNo))

            if (searchedEmpIndex !== -1) {
                employees[searchedEmpIndex] = reqData
                res.status(200).send({
                    success: true,
                    message: "Employee Updated succesfully!",
                    data: JSON.stringify(reqData)
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: `Employee with EmpNo = ${empNo} not found!`,
                })
            }
        } else {
            res.status(400).send({
                success: false,
                message: `Invalid param ID passed!`,
            })
        }
    } catch (e) {
        res.status(500).send({
            success: false,
            message: `Internal server error occured! Error Message =  ${e.message}`
        })
    }

})

expressApp.delete('/api/employees/:id', (req, res) => {
    try {
        const empNo = req.params.id

        if (empNo) {
            const searchedEmpIndex = employees.findIndex(emp => emp.EmpNo === parseInt(empNo))

            if (searchedEmpIndex !== -1) {
                employees.splice(searchedEmpIndex, 1)
                res.status(200).send({
                    success: true,
                    message: `Employee ${empNo} deleted succesfully!`,
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: `Employee with EmpNo = ${empNo} not found!`,
                })
            }
        } else {
            res.status(400).send({
                success: false,
                message: `Invalid param ID passed!`,
            })
        }
    } catch (e) {
        res.status(500).send({
            success: false,
            message: `Internal server error occured! Error Message =  ${e.message}`
        })
    }
})

expressApp.listen(7070)
console.log('Server listening on 7070')