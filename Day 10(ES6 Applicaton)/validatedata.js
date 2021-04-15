class ValidateData {
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
                            switch (rule) {
                                case 'alphanumeric': {
                                    if (!checkAlphanumeric(value) && !checkRequired(value)) {
                                        throw new Error(`Please enter valid value for ${prop}`)
                                    } else {
                                        return Reflect.set(target, prop, value)
                                    }
                                    break;
                                }
                                case 'numeric': {
                                    if (!checkNumeric(value) && !checkRequired(value)) {
                                        throw new Error(`Please enter valid value for ${prop}`)
                                    } else {
                                        return Reflect.set(target, prop, value)
                                    }
                                    break;
                                }
                            }
                        })
                    } else {
                        throw new Error("Product name doesn't start with 'Prd-'")
                    }
                } else {
                    rules.forEach((rule) => {
                        switch (rule) {
                            case 'alphanumeric': {
                                if (!checkAlphanumeric(value) && !checkRequired(value)) {
                                    throw new Error(`Please enter valid value for ${prop}`)
                                } else {
                                    return Reflect.set(target, prop, value)
                                }
                                break;
                            }
                            case 'numeric': {
                                if (!checkNumeric(value) && !checkRequired(value)) {
                                    throw new Error(`Please enter valid value for ${prop}`)
                                } else {
                                    return Reflect.set(target, prop, value)
                                }
                                break;
                            }
                        }
                    })
                }
            } else {
                return Reflect.set(target, prop, value)
            }
        },
        get(target, prop) {
            console.log(prop)
            Reflect.get(target, prop)
        },
    })
    return validateDataProxy;
}

const checkNumeric = (v) => {
    // logic for checking the numeric value
    // if valid return true / else false
    return (!isNaN(v))
}

const checkAlphanumeric = (v) => {
    return (checkIfAlphabet(v) || checkIfNumebr(v) || checkIfSpace(v))
}

const checkUnique = (valueToCheck, collectionIntoCheck) => {
    // collectionToCheck is the data in which the unuques entry for
    // the valuToCheck is verified
    // if no unique then return true else false
}

const checkRequired = (v) => {
    // key the the property to be checked for required
    return v.length
}

const checkIfAlphabet = (v) => {
    return ((v >= 'a' && v <= 'z') || (v >= 'A' && v <= 'Z') || (v === " "))
}

const checkIfSpace = (v) => {
    return (v === " ")
}