const express = require('express')
const vendor = require('./vendor')
const router = express.Router()

router.use('/vendor', vendor)

module.exports = router