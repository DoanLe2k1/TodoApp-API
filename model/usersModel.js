const users = require('../database/userList.json');
const {generateUID, writeDataToFile} = require('../ultis/index.js');

const getUsersModel = () => {
    return new Promise((resolve, reject) => {
       resolve(users)
    })
}

const checkUserExistModel = (data) => {
    return new Promise((resolve, reject) => {
        const result = users.find((user) => (user.email === data.email))
        console.log(result)
        resolve(result)
    })
}

const addUserModel = (data) => {
    const newUser = {
        id: generateUID(),
        email: data.email,
        password: data.password
    }
    return new Promise((resolve, reject) => {
        users.push(newUser)
        writeDataToFile('./database/userList.json', JSON.stringify(users));
        resolve(newUser)
    })
}

const loginUserModel = (loginData) => {
    return new Promise((resolve, reject ) => {
        const user =  users.find((user) => ((user.email === loginData.email) && (user.password === loginData.password)))
        if (user) {
            const token = generateUID()
            const result = {
                user : user,
                token : token
            }
            resolve(result)
        } else {
            resolve('') 
        }
    })
}

module.exports = {loginUserModel, getUsersModel, addUserModel, checkUserExistModel}