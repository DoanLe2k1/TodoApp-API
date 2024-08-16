const users = require('../database/users.json');
const {generateUID} = require('../ultis/index')
const login =  (loginData) => {
    return new Promise((resolve, reject ) => {
        const result =  users.find((user) => ((user.username == loginData.username) && (user.password == loginData.password)))
        if(result){
            const token = generateUID()
            resolve(token)
        }
        resolve('') 
    })
}

module.exports = {login}