class UI {

    #datasource = []

    constructor() {
        this.#datasource = []
        this.page_size = 5
        this.can_edit = false
        this.can_delete = false
        this.checked_array = []
        this.#subscribers = {}
    }

    subscribe = (event, callback) => {
        if (!this.#subscribers.hasOwnProperty(event)) {
            this.#subscribers = []
        }

        this.#subscribers.push(callback)
    }

    publish = (event, data) => {
        if (!this.#subscribers.hasOwnProperty(event)) {
            return false
        }
        this.#subscribers.forEach(callBack => callBack(data))
    }



}