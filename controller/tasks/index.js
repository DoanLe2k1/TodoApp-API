const { addNewTask,getAllTask } = require('../../model/taskModel.js')
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
  if(token) {
    const tasks = await getAllTask()   
    response.writeHead(httpStatusCode.OK, {'Content-Type': 'application/json'});
    response.end(JSON.stringify(tasks));
  } else {
    response.writeHead(httpStatusCode.ERROR, {'Content-Type': 'application/json'});
    response.end(
    JSON.stringify({
      message: 'NO TOKENNNNNN',
    })
  )}
}
module.exports = {addTask,getTasks
  // ,fixPreflight
};