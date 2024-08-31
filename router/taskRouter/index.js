var routerMethods = require('../methods.js');

var routes = require('../routes.js');
const {
	addTask,
	getTasks,
	deleteTask,
	deleteAllTasks,
	editTask,
	toggleTask,
} = require('../../controllers/tasks/index.js');
var taskRouter = {
	run(req, res) {
		routerMethods.post(req, res, routes.task.getTasks.value, getTasks);
		routerMethods.post(req, res, routes.task.value, addTask);
		routerMethods.delete(req, res, routes.task.value, deleteTask);
		routerMethods.delete(
			req,
			res,
			routes.task.deleteAllTasks.value,
			deleteAllTasks
		);
		routerMethods.patch(req, res, routes.task.value, editTask);
		routerMethods.put(req, res, routes.task.toggleTask.value, toggleTask);
	},
};
module.exports = taskRouter;
