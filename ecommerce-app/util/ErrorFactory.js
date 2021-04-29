const msgs = require('../i18n/msg.en_us')

class APIResponse {
    response = () => {
        return {
            success: this.success,
            msg: this.msg,
            data: this.data
        }
    }
}

class RecordsSuccess extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORDS_200}${data.msg ? ' = ' + data.msg : ""}`
        this.data = data.data
        this.success = data.success
    }
}

class RecordsFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORDS_400}${data.msg ? ' = ' + data.msg : ""}`
        this.data = data.data
        this.success = data.success
    }
}

class RecordSuccess extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_200}${data.msg ? ' = ' + data.msg : ""}`
        this.data = data.data
        this.success = data.success
    }
}

class RecordFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_400}${data.msg ? ' = ' + data.msg : ""}`
        this.data = data.data
        this.success = data.success
    }
}

class InternalServerError extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.ERROR_500}${data.msg ? ' = ' + data.msg : ""}`
        this.data = data.data
        this.success = data.success
    }
}

class ResponseFactory {
    createResponse(data) {
        if (data.type === 'records_200') return new RecordsSuccess(data)
        if (data.type === 'records_400') return new RecordsFailed(data)
        if (data.type === 'record_200') return new RecordSuccess(data)
        if (data.type === 'record_400') return new RecordFailed(data)
        if (data.type === 'error_500') return new InternalServerError(data)
    }
}

module.exports = ResponseFactory