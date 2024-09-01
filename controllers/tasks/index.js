const {
	getDataFromRequest,
	checkAuthorizationHeaders,
	handleMessage,
} = require('../../ultis/index.js');
const { httpStatusCode, TASK_DATABASE_NAME } = require('../../constants.js');
const { GET_DB } = require('../../config/mongodb.js');
const { checkTokenIsValid } = require('../users/index.js');
const { ObjectId } = require('mongodb');

async function addTask(request, response) {
	const token = checkAuthorizationHeaders(request);
	let message = '';
	if (await checkTokenIsValid(body.user_id, token)) {
		let body = await getDataFromRequest(request);
		if (body) {
			const newTaskToAdd = {
				...body,
				user_id: new ObjectId(body.user_id),
			};
			const newTask = await GET_DB()
				.collection(TASK_DATABASE_NAME)
				.insertOne(newTaskToAdd);
			if (newTask) {
				message = 'Add Success';
				handleMessage(message, response);
			}
		} else {
			message = 'Body not found';
			handleMessage(message, response);
		}
	} else {
		message = 'Token is not valid';
		handleMessage(message, response);
	}
}

async function getTasks(request, response) {
	const token = checkAuthorizationHeaders(request);
	let body = await getDataFromRequest(request);
	let message = '';
	if (body) {
		if (await checkTokenIsValid(body.id, token)) {
			const query = {
				user_id: new ObjectId(body.id),
			};
			const result = await GET_DB()
				.collection(TASK_DATABASE_NAME)
				.find(query)
				.toArray();
			if (result.length > 0) {
				response.writeHead(httpStatusCode.OK, {
					'Content-Type': 'application/json',
				});
				response.end(JSON.stringify(result));
			} else {
				message = 'Task not found';
				handleMessage(message, response);
			}
		} else {
			message = 'Token is not valid';
			handleMessage(message, response);
		}
	} else {
		message = 'Body not found';
		handleMessage(message, response);
	}
}

async function deleteTask(request, response) {
	const token = checkAuthorizationHeaders(request);
	let message = '';
	const body = await getDataFromRequest(request);
	if (await checkTokenIsValid(body.user_id, token)) {
		if (body) {
			const query = {
				_id: new ObjectId(body._id),
			};
			const result = await GET_DB()
				.collection(TASK_DATABASE_NAME)
				.deleteOne(query);
			if (result.deletedCount > 0) {
				message = 'Delete Task Successfully';
				handleMessage(message, response);
			} else {
				message = 'Task not found';
				handleMessage(message, response);
			}
		} else {
			message = 'Body not found';
			handleMessage(message, response);
		}
	} else {
		message = 'Token is not valid';
		handleMessage(message, response);
	}
}

async function deleteAllTasks(request, response) {
	const token = checkAuthorizationHeaders(request);
	let message = '';
	const body = await getDataFromRequest(request);
	if (await checkTokenIsValid(body.user_id, token)) {
		if (body) {
			const query = {
				completed: body.completed,
			};
			const result = await GET_DB()
				.collection(TASK_DATABASE_NAME)
				.deleteMany(query);
			if (result.deletedCount > 0) {
				message = 'Delete All Undone Tasks Successfully';
				handleMessage(message, response);
			} else {
				message = 'Task not found';
				handleMessage(message, response);
			}
		} else {
			message = 'Body not found';
			handleMessage(message, response);
		}
	} else {
		message = 'Token is not valid';
		handleMessage(message, response);
	}
}

async function editTask(request, response) {
	const token = checkAuthorizationHeaders(request);
	let message = '';
	if (await checkTokenIsValid(body.user_id, token)) {
		let body = await getDataFromRequest(request);
		if (body) {
			const query = {
				_id: new ObjectId(body._id),
			};
			const queryUpdate = {
				$set: { name: body.name },
			};
			const options = { returnDocument: 'after' };
			const result = await GET_DB()
				.collection(TASK_DATABASE_NAME)
				.findOneAndUpdate(query, queryUpdate, options);
			if (result) {
				message = 'Put/Patch Success';
				handleMessage(message, response);
			} else {
				message = 'Task not found';
				handleMessage(message, response);
			}
		} else {
			message = 'Body not found';
			handleMessage(message, response);
		}
	} else {
		message = 'Token is not valid';
		handleMessage(message, response);
	}
}

async function toggleTask(request, response) {
	const token = checkAuthorizationHeaders(request);
	let body = await getDataFromRequest(request);
	let message = '';
	if (await checkTokenIsValid(body.user_id, token)) {
		if (body) {
			const query = {
				_id: new ObjectId(body._id),
			};
			const queryUpdate = {
				$set: { completed: body.completed },
			};
			const options = { returnDocument: 'after' };
			const result = await GET_DB()
				.collection(TASK_DATABASE_NAME)
				.findOneAndUpdate(query, queryUpdate, options);
			if (result) {
				response.writeHead(httpStatusCode.OK, {
					'Content-Type': 'application/json',
				});
				response.end(JSON.stringify(result));
			} else {
				message = 'Task not found';
				handleMessage(message, response);
			}
		} else {
			message = 'Body not found';
			handleMessage(message, response);
		}
	} else {
		message = 'Token is not valid';
		handleMessage(message, response);
	}
}

module.exports = {
	addTask,
	getTasks,
	deleteTask,
	editTask,
	toggleTask,
	deleteAllTasks,
};
