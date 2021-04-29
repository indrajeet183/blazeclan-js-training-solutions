const db = require('../models/db')
const msgs = require('../i18n/msg.en_us')
const ResponseFactoryClass = require('../util/ErrorFactory')
const ResponseFactory = new ResponseFactoryClass()

class DAO {
    constructor(modelName) {
        this.model = db[modelName]
    }

    getAllRecords = async (req, res) => {
        try {
            const records = await this.model.findAll()
            if (records) {
                res.status(200).send(ResponseFactory.createResponse({ success: true, data: records, msg: records.length, type: 'records_200' }).response())
            } else {
                res.status(400).send({
                    success: false,
                    message: `${msgs.RECORDS_400}`
                })
            }
        } catch (e) {
            res.status(500).send({
                success: false,
                message: `${msgs.ERROR_500} = ${e.message}`
            })
        }
    }

    getOneRecord = async (req, res) => {
        try {
            const id = req.params.id
            if (id) {
                const record = await this.model.findOne({ where: { id: id } })
                if (record) {
                    res.status(200).send({
                        success: false,
                        message: `${msgs.RECORD_200}. ${id}`,
                        data: record
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        message: `${msgs.RECORD_ID_NOT_FOUND_400}. ${id}`
                    })
                }
            } else {
                res.status(400).send({
                    success: false,
                    message: `${msgs.RECORD_400}. ${id}`
                })
            }

        } catch (e) {
            res.status(500).send({
                success: false,
                message: `${msgs.ERROR_500} = ${e.message}`
            })
        }
    }

    updateRecord = async (req, res) => {
        try {
            const id = req.params.id
            const updatedData = req.body
            if (id) {
                const record = await this.model.update(updatedData, { where: { id: id } })
                if (record) {
                    res.status(200).send({
                        success: false,
                        message: `${msgs.RECORD_UPDATE_200}. ${id}`,
                        data: record
                    })
                }
            } else {
                res.status(400).send({
                    success: false,
                    message: `${msgs.RECORD_UPDATE_400}. ${id}`
                })
            }

        } catch (e) {
            res.status(500).send({
                success: false,
                message: `${msgs.ERROR_500} = ${e.message}`
            })
        }
    }

    createRecord = async (req, res) => {
        try {
            const recordData = req.body
            const record = await this.model.create(recordData)
            if (record) {
                res.status(200).send({
                    success: false,
                    message: `${msgs.RECORD_CREATE_200}`,
                    data: record
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: `${msgs.RECORD_CREATE_400}`
                })
            }

        } catch (e) {
            res.status(500).send({
                success: false,
                message: `${msgs.ERROR_500} = ${e.message}`
            })
        }
    }

    deleteRecord = async (req, res) => {
        try {
            const id = req.params.id

            if (id) {
                const record = await this.model.destroy({ where: { id: id } })
                if (record) {
                    res.status(200).send({
                        success: false,
                        message: `${msgs.RECORD_DELETE_200}. ${id}`,
                        data: record
                    })
                }
            } else {
                res.status(400).send({
                    success: false,
                    message: `${msgs.RECORD_DELETE_400}. ${id}`
                })
            }

        } catch (e) {
            res.status(500).send({
                success: false,
                message: `${msgs.ERROR_500} = ${e.message}`
            })
        }
    }
}

module.exports = DAO
