const express = require('express')
const path = require('path')
const fs = require('fs')

const app = new express()

app.use(
    express.static(path.join(__dirname, './../node_modules/jquery/dist'))
)

app.use(
    express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css'))
)

const router = express.Router()

app.use(router)

router.get('/', (req, resp) => {
    resp.sendFile('index.html', {
        root: path.join(__dirname, './pub')
    });
});

router.get('/list', (req, resp) => {
    resp.sendFile('list.html', {
        root: path.join(__dirname, './pub')
    });
});

router.get('/create', (req, resp) => {
    resp.sendFile('create.html', {
        root: path.join(__dirname, './pub')
    });
});

router.get('/update', (req, resp) => {
    resp.sendFile('update.html', {
        root: path.join(__dirname, './pub')
    });
});

router.get('/delete', (req, resp) => {
    resp.sendFile('delete.html', {
        root: path.join(__dirname, './pub')
    });
});


app.listen(6060);
console.log('Listening port 6060');