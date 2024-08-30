const { getDataFromRequest } = require('../../ultis/index.js');
const { httpStatusCode, urlAPI } = require('../../constants.js');
const { GET_DB } = require('../../config/mongodb.js');
// email => id of user
// token === token ? find({user_id= user.id})
// insertOne({name:...,user_id:  id of user})
// Vi
const addTask = async (request, response) => {
	const body = await getDataFromRequest(request);
};
// email => id of user
// token === token ? find({user_id= user.id})
// find({user_id= user.id})
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
// updateOne
// Vi
const editTask = async (request, response) => {
	const body = await getDataFromRequest(request);
	const result = await fetch(`${urlAPI}/api/tasks`, {
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
};
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
