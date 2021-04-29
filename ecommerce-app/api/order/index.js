const express = require('express');
const DAO = require('../dao');
const orderDaoObject = new DAO('orders')
const orderItemsDaoObject = new DAO('order_items', "item_id")

const router = express.Router()

router.get('/order-item/:id', orderItemsDaoObject.getOneRecord)
router.get('/order-item', orderItemsDaoObject.getAllRecords)
router.post('/order-item', orderItemsDaoObject.createRecord)
router.put('/order-item/:id', orderItemsDaoObject.updateRecord)
router.put('/order-item/:id', orderItemsDaoObject.deleteRecord)

router.get('/order/:id', orderDaoObject.getOneRecord)
router.get('/order/', orderDaoObject.getAllRecords)
router.post('/order/', orderDaoObject.createRecord)
router.put('/order/:id', orderDaoObject.updateRecord)
router.delete('/order/:id', orderDaoObject.deleteRecord)

module.exports = router