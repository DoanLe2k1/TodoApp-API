const routerMethods = require('../methods.js');
const routes = require('../routes.js');
const {
	getUserById,
	addUser,
	loginUser,
	logoutUser,
} = require('../../controllers/users/index.js');

const userRouter = {
	run(request, response) {
		routerMethods.get(request, response, routes.user.value, getUserById);
		routerMethods.post(
			request,
			response,
			routes.user.userLogin.value,
			loginUser
		);
		routerMethods.delete(
			request,
			response,
			routes.user.userLogout.value,
			logoutUser
		);
		routerMethods.post(request, response, routes.user.value, addUser);
	},
};

module.exports = userRouter;
