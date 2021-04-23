class Product {
    constructor(productName, productId, productPrice, isInStock) {
        this.ProductName = productName
        this.ProductId = productId
        this.ProductPrice = productPrice
        this.IsInStock = isInStock
    }
}

class Employee {
    constructor(empNo, empFirstName, empLastName, empSalary, isMarried, joiningDate) {
        this.EmpNo = empNo
        this.EmpFirstName = empFirstName
        this.EmpLastName = empLastName
        this.EmpSalary = empSalary
        this.IsMarried = isMarried
        this.JoiningDate = joiningDate
    }
}

window.onload = () => {
    const ui = new UI()

    const generate = (classObj) => {
        try {
            const fields = Object.getOwnPropertyDescriptors(classObj)
            const json = Object.keys(fields)
            console.log(classObj)
            let form = `<form>`

            

            json.forEach((field, _i) => {
                if (typeof fields[field].value === 'string') {
                    form = form.concat(getFormControl(ui.Input('text', field, "", false, `form-${field}-${_i}`), field))
                } else if (typeof fields[field].value === 'number') {
                    form = form.concat(getFormControl(ui.Input('number', field, "", false, `form-${field}-${_i}`), field))
                } else if (typeof fields[field].value === 'boolean') {
                    form = form.concat(getFormControl(ui.Input('radio', field, "", false, `form-${field}-${_i}`), field, 'form-check', 'form-check-label'))
                } else if (typeof fields[field].value === 'object') {
                    if(new Date(fields[field].value).getDate())
                        form = form.concat(getFormControl(ui.Input('date', field, "", false, `form-${field}-${_i}`), field))
                }
            })

            form = form.concat('<button type="submit" class="btn btn-primary">Submit</button></form>')
            //console.log(document.getElementById('main').innerHTML+createRowCard(form))
            document.getElementById('main').innerHTML += createRowCard(form, classObj.constructor.name).concat('<hr>')
        } catch (e) {
            document.getElementById('error-msg').className = document.getElementById('error-msg').className.replace('d-none', '')
            document.getElementById('error-msg').innerText = e.message
            setTimeout(() => {
                document.getElementById('error-msg').className = document.getElementById('error-msg').className.concat(' d-none')
            }, 2000)
        }
    }

    const createRowCard = (form, name) => {
        return `<div class="row m-4">
                    <div class="col">
                        <div id="main-card" class="card">
                            <div class="card-header">
                                Generated Form for ${name}
                            </div>
                            <div class="card-body">
                                ${form}
                            </div>
                        </div>
                        <div id="error-msg" class="alert alert-danger d-none" role="alert"></div>
                    </div>
                </div>`
    }


    const getFormControl = (input, field, formClass = 'form-group', labelClass = "col-form-label") => {
        let formControlDiv = `<div class="${formClass}">`

        if (formClass === 'form-group') {
            formControlDiv = formControlDiv.concat(`<label class="${labelClass}" for="${field}">${field}</label>
                                ${input}
                            </div>`)
        } else {
            formControlDiv = formControlDiv.concat(`${input}<label class="${labelClass}" for="${field}">${field}</label>
                            </div>`)
        }
        return formControlDiv
    }

    const product = new Product("Dell inspi", "Prd-01", 50000, true)
    const employee = new Employee('AL-015', 'John', 'Doe', 20000, false, new Date())
    generate(product)
    generate(employee)
}