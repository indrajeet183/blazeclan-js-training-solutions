const express = require('express')
const cors = require('cors');
const expressApp = new express()
const Api = require('./api/product')

expressApp.use(express.urlencoded({ extended: false }))
expressApp.use(express.json())

expressApp.use(cors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*'
}))

expressApp.use(Api)

expressApp.listen(5005, () => {
    console.log('Product Server listening on 5005')
})
