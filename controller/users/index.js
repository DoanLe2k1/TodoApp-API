const {loginUserModel, getUsersModel, addUserModel} = require('../../model/usersModel.js')
const { httpStatusCode, getDataFromRequest } = require('../../ultis/index.js')

async function getUsers(request, response) {
  const users = await getUsersModel()   
  response.writeHead(httpStatusCode.OK, {'Content-Type': 'application/json'});
  response.end(JSON.stringify(users));
}
async function addUser(request, response) {
  const body = await getDataFromRequest(request)
  if (!body) {
    response.writeHead(httpStatusCode.ERROR, { 'Content-Type': 'application/json' });
    response.end( JSON.stringify({ message: 'No Data received to add task'}));
  } else {
      const message = await addUserModel(body);
      if (message) {
        response.writeHead(httpStatusCode.OK, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify('Add user successfully!'));
      }
    }
  }


function updateUsers(req, res) {
    res.end('Update User Succesfully');
}
function deleteUsers(req, res) {
    res.end(JSON.stringify({message: 'Delete User Succesfully'}))
}
const loginUser = async (req, res) => {
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
        const result = await loginUserModel(loginData)
        if(result) {
          res.writeHead(httpStatusCode.OK, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        }
        else {
          res.writeHead(httpStatusCode.OK, { 'Content-Type': 'application/json' });
          res.end(
          JSON.stringify('Wrong user or password')
        )}
      }

}

module.exports = { 
    getUsers, 
    addUser, 
    updateUsers, 
    deleteUsers,
    loginUser
};

