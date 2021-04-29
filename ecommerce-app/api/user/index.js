const express = require('express');
const DAO = require('../dao');
const userDaoObject = new DAO('users')

const router = express.Router()

router.get('/user/:id', userDaoObject.getOneRecord)
router.get('/user/', userDaoObject.getAllRecords)
router.post('/user/', userDaoObject.createRecord)
router.put('/user/:id', userDaoObject.updateRecord)
router.delete('/user/:id', userDaoObject.deleteRecord)

module.exports = router