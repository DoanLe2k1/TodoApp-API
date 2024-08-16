const {addNewTask} = require('../../model/taskModel.js')
const {httpStatusCode} =require('../../ultis/index.js')


const getDataFromRequest = (req) => {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(JSON.parse(body));
      });
    });
  };

const addTask = async(req, res) => {
    const body = await getDataFromRequest(req)
    if (!body) {
        res.writeHead(httpStatusCode.ERROR, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: 'No Data received to login',
          })
        );
      } else {
        const data = body;
        const token = req.headers['token']
        if(token) {
          const message = await addNewTask(data)   
          res.writeHead(httpStatusCode.OK, { 'Content-Type': 'application/json' });
          res.end(message);
          // const message = 'Happily have a token'
          // res.writeHead(httpStatusCode.OK, { 'Content-Type': 'application/json' });
          // res.end(message);

        } else {
          res.writeHead(httpStatusCode.ERROR, { 'Content-Type': 'application/json' });
          res.end(
          JSON.stringify({
            message: 'NO TOKENNNNNN',
          })
        );
        }
      }
}
module.exports = addTask;