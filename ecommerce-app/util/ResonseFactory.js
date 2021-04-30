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
        this.msg = `${msgs.RECORDS_200} Count = ${data.data ? data.data.length : "0"}`
        this.data = data.data
        this.success = true
    }
}

class RecordsFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORDS_400}`
        this.success = false
    }
}

class RecordFailedIDNotFound extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_ID_NOT_FOUND_400}`
        this.success = false
    }
}

class RecordSuccess extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_200}$`
        this.data = data.data
        this.success = true
    }
}

class RecordFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_400}`
        this.success = false
    }
}

class InternalServerError extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.ERROR_500}${data.msg ? ' = ' + data.msg : ""}`
        this.data = data.data
        this.success = false
    }
}

class CreateRecordSuccess extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_CREATE_200}`
        this.data = data.data
        this.success = true
    }
}

class CreateRecordFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_CREATE_200}`
        this.data = data.data
        this.success = true
    }
}

class UpdateRecordSuccess extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_UPDATE_200}`
        this.data = data.data
        this.success = true
    }
}

class UpdateRecordFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_UPDATE_400}`
        this.data = data.data
        this.success = true
    }
}

class DeleteRecordSuccess extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_DELETE_200}`
        this.data = data.data
        this.success = true
    }
}

class DeleteRecordFailed extends APIResponse {
    constructor(data) {
        super()
        this.msg = `${msgs.RECORD_DELETE_400}`
        this.data = data.data
        this.success = true
    }
}

class ResponseFactory {
    createResponse(data) {
        if (data.type === 'records_200') return new RecordsSuccess(data)
        if (data.type === 'records_400') return new RecordsFailed(data)
        if (data.type === 'record_200') return new RecordSuccess(data)
        if (data.type === 'record_400') return new RecordFailed(data)
        if (data.type === 'record_id_not_found_400') return new RecordFailedIDNotFound(data)
        if (data.type === 'create_200') return new CreateRecordSuccess(data)
        if (data.type === 'create_400') return new CreateRecordFailed(data)
        if (data.type === 'update_200') return new UpdateRecordSuccess(data)
        if (data.type === 'update_400') return new UpdateRecordFailed(data)
        if (data.type === 'delete_200') return new DeleteRecordSuccess(data)
        if (data.type === 'delete_400') return new DeleteRecordFailed(data)
        if (data.type === 'error_500') return new InternalServerError(data)
    }
}

module.exports = ResponseFactory