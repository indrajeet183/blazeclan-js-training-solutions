const express = require('express');
const DAO = require('../dao');
const productDaoObject = new DAO('products')

const router = express.Router()

router.get('/product/:id', productDaoObject.getOneRecord)
router.get('/product/', productDaoObject.getAllRecords)
router.post('/product/', productDaoObject.createRecord)
router.put('/product/:id', productDaoObject.updateRecord)
router.delete('/product/:id', productDaoObject.deleteRecord)

module.exports = router