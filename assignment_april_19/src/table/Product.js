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