const express = require('express');
const DAO = require('../dao');
const userDaoObject = new DAO('users')
const roleDaoObject = new DAO('role')

const router = express.Router()

router.get('/user/:id', userDaoObject.getOneRecord)
router.get('/user/', userDaoObject.getAllRecords)
router.post('/user/', userDaoObject.createRecord)
router.put('/user/:id', userDaoObject.updateRecord)
router.delete('/user/:id', userDaoObject.deleteRecord)

router.get('/role/:id', roleDaoObject.getOneRecord)
router.get('/role/', roleDaoObject.getAllRecords)
router.post('/role/', roleDaoObject.createRecord)
router.put('/role/:id', roleDaoObject.updateRecord)
router.delete('/role/:id', roleDaoObject.deleteRecord)


module.exports = router