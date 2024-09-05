const routerMethods = require('../methods.js');

const routes = require('../routes.js');
const {
	addTask,
	deleteTask,
	deleteAllTasks,
	editTask,
	toggleTask,
	getTasksById,
} = require('../../controllers/tasks/index.js');
const taskRouter = {
	run(request, response) {
		routerMethods.get(request, response, routes.task.value, getTasksById);
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
