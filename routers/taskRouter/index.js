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
	run(request, response) {
		routerMethods.post(request, response, routes.task.getTasks.value, getTasks);
		routerMethods.post(request, response, routes.task.value, addTask);
		routerMethods.delete(request, response, routes.task.value, deleteTask);
		routerMethods.delete(
			request,
			response,
			routes.task.deleteAllTasks.value,
			deleteAllTasks
		);
		routerMethods.patch(request, response, routes.task.value, editTask);
		routerMethods.patch(
			request,
			response,
			routes.task.toggleTask.value,
			toggleTask
		);
	},
};
module.exports = taskRouter;
