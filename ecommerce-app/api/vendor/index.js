const express = require('express');
const DAO = require('../dao');
const vendorDaoObject = new DAO('vendor')

const router = express.Router()

router.get('/:id', vendorDaoObject.getOneRecord)
router.get('/', vendorDaoObject.getAllRecords)
router.post('/', vendorDaoObject.createRecord)
router.put('/:id', vendorDaoObject.updateRecord)
router.delete('/:id', vendorDaoObject.deleteRecord)

module.exports = router