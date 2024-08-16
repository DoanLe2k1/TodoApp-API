const users = require('../database/users.json');
const login =  (loginData) => {
    return new Promise((resolve, reject ) => {
        const result =  users.find((user) => ((user.username == loginData.username) && (user.password == loginData.password)))
        if(result){
            const message = 'This is a token'
            resolve(message)
        }
    })
}

module.exports = {login}