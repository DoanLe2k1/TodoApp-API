const {login} = require('../../model/usersModel.js')
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

function getUsers(req, res) {
    res.end('Get User Succesfully');
}
function addUsers(req, res) {
    res.end('Add User Succesfully');
}
function updateUsers(req, res) {
    res.end('Update User Succesfully');
}
function deleteUsers(req, res) {
    res.end('Delete User Succesfully')
}
const loginUsers= async (req, res) => {
    const body = await getDataFromRequest(req)
    if (!body) {
        res.writeHead(httpStatusCode.ERROR, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            message: 'No Data received to login',
          })
        );
      } else {
        const loginData = body;
        const message = await login(loginData)
        res.writeHead(httpStatusCode.OK, { 'Content-Type': 'application/json' });
        res.end( );
      }

}

module.exports = { 
    getUsers, 
    addUsers, 
    updateUsers, 
    deleteUsers,
    loginUsers
};

