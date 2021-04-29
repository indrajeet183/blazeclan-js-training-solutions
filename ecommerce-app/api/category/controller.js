const msgs = require('../../i18n/msg.en_us');
const DAO = require('../dao');

class CategoryDAOExtended extends DAO {
    constructor(modelName) {
        super(modelName)
    }

    getSubCategoriesByCategory = async (req, res) => {
        const id = req.params.id
        try {
            const result = await this.model.findAll({ where: { parent_id: id } })
            if (result) {
                res.status(200).send({
                    success: true,
                    message: `${msgs.RECORDS_200}`,
                    data: result
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

module.exports = CategoryDAOExtended