let userMap = new Map()
userMap.set('admin', [{ UserName: "admin", Password: "12qwaszx" }])
userMap.set('manager', [{ UserName: "manager1", Password: "manager1pass" }, { UserName: "manager2", Password: "manager2pass" }])
userMap.set('clerk', [{ UserName: "clerk1", Password: "clerk1pass" }, { UserName: "clerk2", Password: "clerk2pass" }])

const getRoleByUserName = (userName) => {
    let foundRole = false
    userMap.forEach((users, role) => {
        const foundUser = users.filter(user => user.UserName === userName)
        console.log('[getRoleByUserName]', foundUser)
        if (foundUser.length) foundRole = role
    })
    return foundRole
}

const checkLogin = (userName, pass) => {
    let isLogin = false
    userMap.forEach((users, role) => {
        const foundUser = users.filter(user => (user.UserName === userName) && (user.Password === pass))
        console.log('[checkLogin]', foundUser)
        if (foundUser.length) isLogin = true
    })
    return isLogin
}

exports.getRoleByUserName = getRoleByUserName
exports.checkLogin = checkLogin