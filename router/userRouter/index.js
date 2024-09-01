var routerMethods = require('../methods.js');
var routes = require('../routes.js');
const {
	getUserById,
	addUser,
	loginUser,
	logoutUser,
} = require('../../controllers/users/index.js');

var userRouter = {
	run(req, res) {
		routerMethods.get(req, res, routes.user.value, getUserById);
		routerMethods.post(req, res, routes.user.userLogin.value, loginUser);
		routerMethods.post(req, res, routes.user.userLogout.value, logoutUser);
		routerMethods.post(req, res, routes.user.value, addUser);
	},
};

module.exports = userRouter;
