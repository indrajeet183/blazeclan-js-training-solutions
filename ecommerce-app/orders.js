const express = require('express')
const cors = require('cors');
const expressApp = new express()
const Api = require('./api/order')

expressApp.use(express.urlencoded({ extended: false }))
expressApp.use(express.json())

expressApp.use(cors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*'
}))

expressApp.use(Api)

expressApp.listen(5002, () => {
    console.log('Orders Server listening on 5002')
})
