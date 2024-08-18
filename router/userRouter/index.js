var routerMethods = require('../methods.js');
var routes = require('../routes.js');
const { 
  getUsers, 
  addUsers, 
  updateUsers, 
  deleteUsers,
  loginUsers } = require('../../controller/users/index.js');

  var userRouter = {
  run(req, res) {
    routerMethods.get(req, res, routes.user.value, getUsers);
    routerMethods.post(req, res, routes.user.userLogin.value, loginUsers)
    routerMethods.post(req, res, routes.user.value, addUsers);
    routerMethods.put(req, res, routes.user.value, updateUsers)
    routerMethods.delete(req, res, routes.user.value, deleteUsers);
  },
};

module.exports = userRouter;
