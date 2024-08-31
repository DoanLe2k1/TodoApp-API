const {
	getBodyDataRequest,
	checkAuthorizationHeaders,
	handleMessage,
} = require('../../ultis/index.js');
const {
	httpStatusCode,
	urlAPI,
	TASK_DATABASE_NAME,
} = require('../../constants.js');
const { GET_DB } = require('../../config/mongodb.js');
const { checkTokenIsValid } = require('../users/index.js');
const { ObjectId, ReturnDocument } = require('mongodb');

async function addTask(request, response) {
	const body = await getBodyDataRequest(request);
	const token = checkAuthorizationHeaders(request);
	let message = '';
	if (await checkTokenIsValid(body.user_id, token)) {
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
		message = 'Token is not valid';
		handleMessage(message, response);
	}
}

// Thuy
const getTasks = async (request, response) => {
	const result = await fetch(`${urlAPI}/api/tasks`, {
		method: 'GET',
		headers: {
			Authorization: JSON.stringify(request.headers['authorization']),
		},
	});
	if (!result.ok) {
		throw new Error('Network result was not ok');
	} else {
		response.writeHead(httpStatusCode.ACCEPTED, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(await result.json()));
	}
};
// deleteOne
// Doan
const deleteTask = async (request, response) => {
	const body = await getDataFromRequest(request);
	const result = await fetch(`${urlAPI}/api/tasks`, {
		method: 'DELETE',
		headers: {
			Authorization: JSON.stringify(request.headers['authorization']),
		},
		body: JSON.stringify(body),
	});
	if (!result.ok) {
		throw new Error('Network result was not ok');
	} else {
		response.writeHead(httpStatusCode.OK, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(await result.json()));
	}
};
// deleteMany
// Doan
const deleteAllTasks = async (request, response) => {
	const body = await getDataFromRequest(request);
	const result = await fetch(`${urlAPI}/api/tasks/delete-all-tasks`, {
		method: 'DELETE',
		headers: {
			Authorization: JSON.stringify(request.headers['authorization']),
		},
		body: JSON.stringify(body),
	});
	if (!result.ok) {
		throw new Error('Network result was not ok');
	} else {
		response.writeHead(httpStatusCode.OK, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(await result.json()));
	}
};

async function editTask(request, response) {
	const body = await getBodyDataRequest(request);
	const token = checkAuthorizationHeaders(request);
	let message = '';
	if (await checkTokenIsValid(body.user_id, token)) {
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
		message = 'Token is not valid';
		handleMessage(message, response);
	}
}
// updateOne
// Thuy
async function toggleTask(request, response) {
	const body = await getDataFromRequest(request);
	const result = await fetch(`${urlAPI}/api/tasks/toggle-task`, {
		method: 'PUT',
		headers: {
			Authorization: JSON.stringify(request.headers['authorization']),
		},
		body: JSON.stringify(body),
	});
	if (!result.ok) {
		throw new Error('Network result was not ok');
	} else {
		response.writeHead(httpStatusCode.OK, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(await result.json()));
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
