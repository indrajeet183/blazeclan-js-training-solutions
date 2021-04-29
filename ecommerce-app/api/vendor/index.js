const express = require('express');
const DAO = require('../dao');
const vendorDaoObject = new DAO('vendor')

const router = express.Router()

router.get('/vendor/:id', vendorDaoObject.getOneRecord)
router.get('/vendor', vendorDaoObject.getAllRecords)
router.post('/vendor', vendorDaoObject.createRecord)
router.put('/vendor/:id', vendorDaoObject.updateRecord)
router.delete('/vendor/:id', vendorDaoObject.deleteRecord)

module.exports = router