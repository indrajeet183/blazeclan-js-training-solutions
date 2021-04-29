const express = require('express');
const DAO = require('../dao');
const orderDaoObject = new DAO('orders')
const orderItemsDaoObject = new DAO('order_items')

const router = express.Router()

router.get('/order/order-item/:id', orderItemsDaoObject.getOneRecord)
router.get('/order/order-item', orderItemsDaoObject.getAllRecords)
router.post('/order/order-item', orderItemsDaoObject.createRecord)
router.put('/order/order-item/:id', orderItemsDaoObject.updateRecord)
router.put('/order/order-item/:id', orderItemsDaoObject.deleteRecord)

router.get('/order/:id', orderDaoObject.getOneRecord)
router.get('/order/', orderDaoObject.getAllRecords)
router.post('/order/', orderDaoObject.createRecord)
router.put('/order/:id', orderDaoObject.updateRecord)
router.delete('/order/:id', orderDaoObject.deleteRecord)

module.exports = router