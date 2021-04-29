const http = require('http');
const { routesMapping } = require('./routes')

const server = http.createServer((req, res) => {
    const method = req.method
    const mappingKey = `${req.url}-${method.toLocaleLowerCase()}`

    if (routesMapping.hasOwnProperty(mappingKey)) {
        routesMapping[mappingKey](req, res,)
    } else {
        res.write('Please check the URL');
        res.end();
    }
});


server.listen(6060);
console.log('Started on port 6060');