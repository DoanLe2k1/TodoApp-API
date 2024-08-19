const { addNewTask,getAllTask, deleteTaskModel, editTaskModel, toggleTaskModel} = require('../../model/taskModel.js')
const { httpStatusCode, getDataFromRequest } =require('../../ultis/index.js')

// const fixPreflight = (req,res) => {
//   res.end()
// } 

const addTask = async(request, response) => {
    const token = request.headers['authorization']
    if(token) {
      const body = await getDataFromRequest(request)
      if (!body) {
        response.writeHead(httpStatusCode.ERROR, { 'Content-Type': 'application/json' });
        response.end( JSON.stringify({ message: 'No Data received to add task'}));
      } else {
        body = {...body, token}
        const message = await addNewTask(body)   
        response.writeHead(httpStatusCode.OK, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(message));
      }

    } else {
      response.writeHead(httpStatusCode.ERROR, { 'Content-Type': 'application/json' });
      response.end( JSON.stringify({ message: 'NO TOKENNNNNN'}));
    }
}

const getTasks = async(request,response) => {
  const token = request.headers['authorization']
  if (token) {
    const tasks = await getAllTask()   
    response.writeHead(httpStatusCode.OK, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(tasks));
  } else {
    response.writeHead(httpStatusCode.OK, {'Content-Type': 'application/json'});
    response.end(
    JSON.stringify({
      message: 'NO TOKENNNNNN',
    })
  )}
}

const deleteTask = async (request, response) => {
  const token = request.headers['authorization']
  if (token) {
    let body = await getDataFromRequest(request)
    if (!body) {
      response.writeHead(httpStatusCode.ERROR, { 'Content-Type': 'application/json' });
      response.end( JSON.stringify({ message: 'No Data received to delete task'}));
    } else {
      body = {...body, token}
      const message = await deleteTaskModel(body)   
      response.writeHead(httpStatusCode.OK, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(message));
    }
  } else {
    response.writeHead(httpStatusCode.OK, {'Content-Type': 'application/json'});
    response.end(
    JSON.stringify({
      message: 'NO TOKENNNNNN',
    })
  )}
}

const editTask = async (request, response) => {
  const token = request.headers['authorization']
  if (token) {
    const body = await getDataFromRequest(request)
    if (!body) {
      response.writeHead(httpStatusCode.ERROR, { 'Content-Type': 'application/json' });
      response.end( JSON.stringify({ message: 'No Data received to edit task'}));
    } else {
      body = {...body, token}
      const message = await editTaskModel(body)   
      response.writeHead(httpStatusCode.OK, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(message));
    }
  } else {
    response.writeHead(httpStatusCode.OK, {'Content-Type': 'application/json'});
    response.end(
    JSON.stringify({
      message: 'NO TOKENNNNNN',
    })
  )}
}

const toggleTask = async (request,response) => {
  const token = request.headers['authorization']
  if (token) {
    let body = await getDataFromRequest(request)
    if (!body) {
      response.writeHead(httpStatusCode.ERROR, { 'Content-Type': 'application/json' });
      response.end( JSON.stringify({ message: 'No Data received to edit task'}));
    } else {
      body = {...body, token}
      const message = await toggleTaskModel(body)   
      response.writeHead(httpStatusCode.OK, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(message));
    }
  } else {
    response.writeHead(httpStatusCode.OK, {'Content-Type': 'application/json'});
    response.end(
    JSON.stringify({
      message: 'NO TOKENNNNNN',
    })
  )}
}


module.exports = {
  addTask,
  getTasks,
  deleteTask,
  editTask,
  toggleTask
};