const users = require('../database/userList.json');
const {generateUID, writeDataToFile, urlAPI} = require('../ultis/index.js');

const getUsersModel = () => {
    return new Promise((resolve, reject) => {
       const response = fetch(`${urlAPI}/users`, {
        method: 'GET',
       })
       resolve(response)
    })
}



// const checkUserExistModel = (data) => {
//     return new Promise((resolve, reject) => {
//         const response = (``);
//         const result = users.find((user) => (user.email === data.email))
//         console.log(result)
//         resolve(result)
//     })
// }

const addUserModel = (data) => {
    const newUser = {
        id: generateUID(),
        email: data.email,
        password: data.password
    }
    return new Promise((resolve, reject) => {
        const response = fetch(`${urlAPI}/users` , {
            method: 'POST',
            body: JSON.stringify(newUser)
        })
        resolve(response)
    })
}

const loginUserModel = (loginData) => {
    return new Promise((resolve, reject) => {
        const response = fetch(`${urlAPI}/users/login`, {
            method: 'POST',
            body: JSON.stringify(loginData)
        })
        resolve(response)
        // const user =  users.find((user) => ((user.email === loginData.email) && (user.password === loginData.password)))
        // if (user) {
        //     const token = generateUID()
        //     const result = {
        //         user : user,
        //         token : token
        //     }
        //     resolve(result)
        // } else {
        //     resolve('') 
        // }
    })
}

module.exports = {loginUserModel, getUsersModel, addUserModel}