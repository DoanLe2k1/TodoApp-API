const tasks = require('../database/todoTask.json');
const {generateUID,writeDataToFile} = require('../ultis/index.js')
const addNewTask = (data) => {
    const newTask = {
        id: generateUID(),
        name: data.name,
        user_id: data.user_id
    }
    return new Promise((resolve,reject) => {
        tasks.push(newTask)
        writeDataToFile('./database/todoTask.json', JSON.stringify(tasks));
        resolve(newTask)
    })
}

module.exports = {addNewTask}