const fs = require('fs');
const { checkLogin, getRoleByUserName } = require('./user-controller')

const unauthorized = {
    success: false,
    message: `You're unauthorized to acess this resource!`
}

const handleManagerGetRoute = (req, res) => {
    const role = getRole(req)

    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (role === 'manager') {
        fs.readFile('./views/manager/index.html', { encoding: 'ascii' }, (error, file) => {
            if (error) {
                res.write('The Requested Resource is not found!');
                res.end();
            }
            res.write(JSON.stringify({ success: true, data: file.toString(), message: "Resource authroized!" }));
            res.end();
        });
    } else {
        res.write(JSON.stringify(unauthorized));
        res.end();
    }
}

const handleAdminGetRoute = (req, res) => {
    const role = getRole(req)

    console.log('[handleAdminGetRoute]', role)

    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (role === 'admin') {
        fs.readFile('./views/admin/index.html', { encoding: 'ascii' }, (error, file) => {
            if (error) {
                res.write('The Requested Resource is not found!');
                res.end();
            }
            res.write(JSON.stringify({ success: true, data: file.toString(), message: "Resource authroized!" }));
            res.end();
        });
    } else {
        res.write(JSON.stringify(unauthorized));
        res.end();
    }
}

const handleClerkGetRoute = (req, res) => {
    const role = getRole(req)

    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (role === 'clerk') {
        fs.readFile('./views/clerk/index.html', { encoding: 'ascii' }, (error, file) => {
            if (error) {
                res.write('The Requested Resource is not found!');
                res.end();
            }
            res.write(JSON.stringify({ success: true, data: file.toString(), message: "Resource authroized!" }));
            res.end();
        });
    } else {
        res.write(JSON.stringify(unauthorized));
        res.end();
    }
}

const handleLoginPage = (req, res) => {
    fs.readFile('./views/login.html', { encoding: 'ascii' }, (error, file) => {
        if (error) {
            res.write('The Requested Resource is not found!');
            res.end();
        }
        res.write(file.toString());
        res.end();
    });
}

const handleLoginPost = (req, res) => {
    let result = {
        success: false,
        message: "Faield to login!"
    }

    req.on('data', (data) => {
        const userObj = JSON.parse(data.toString())
        isLogin = checkLogin(userObj.userName, userObj.userPass)
        if (isLogin) {
            result.success = true
            result.message = "User logged in successfully!"
        }
    }).on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(result))
        res.end()
    })
}

const handleHomePage = (req, res) => {
    fs.readFile('./views/index.html', { encoding: 'ascii' }, (error, file) => {
        if (error) {
            res.write('The Requested Resource is not found!');
            res.end();
        }
        res.write(file.toString());
        res.end();
    });
}

const getRole = (req) => {
    let role = false

    let headers = req.headers;
    let authObject = headers.authorization;
    if (authObject && authObject.length) {
        const [userName, pass] = authObject.split(":")
        role = getRoleByUserName(userName)
    }

    return role
}


const routesMapping = {
    "/-get": handleHomePage,
    "/login-get": handleLoginPage,
    "/login-post": handleLoginPost,
    "/manager-get": handleManagerGetRoute,
    "/admin-get": handleAdminGetRoute,
    "/clerk-get": handleClerkGetRoute
}

exports.routesMapping = routesMapping