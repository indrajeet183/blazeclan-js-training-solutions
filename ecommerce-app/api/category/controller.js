const msgs = require('../../i18n/msg.en_us');
const ResponseFactoryClass = require('../../util/ResonseFactory');
const DAO = require('../dao');
const ResponseFactory = new ResponseFactoryClass()

class CategoryDAOExtended extends DAO {
    constructor(modelName) {
        super(modelName)
    }

    getSubCategoriesByCategory = async (req, res) => {
        const id = req.params.id
        try {
            const result = await this.model.findAll({ where: { parent_id: id } })
            if (result) {
                res.status(200).send(ResponseFactory.createResponse({ data: records, type: 'records_200' }).response())
            }
        } catch (e) {
            res.status(500).send(ResponseFactory.createResponse({ data: records, type: 'error_500', msg: e.message }).response())
        }
    }
}

module.exports = CategoryDAOExtended