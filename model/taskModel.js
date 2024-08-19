let tasks = require('../database/todoTask.json');
const { generateUID, writeDataToFile, urlAPI } = require('../ultis/index.js');
const addNewTask = (data) => {
	const newTask = {
		id: generateUID(),
		name: data.name,
		user_id: data.user_id,
		completed: data.completed,
	};
	return new Promise((resolve, reject) => {
		const response = fetch(`${urlAPI}/tasks`, {
			method: 'POST',
			headers: {
				Authorization: JSON.stringify(data.token),
			},
			body: JSON.stringify(newTask),
		});
		resolve(response);

	});
};

const getAllTask = () => {
	return new Promise((resolve, reject) => {
		const response = fetch(`${urlAPI}/tasks`, {
			method: 'GET',
			headers: {},
		});
		resolve(tasks);
	});
};

const deleteTaskModel = (data) => {
	console.log(data.id);
	return new Promise((resolve, reject) => {
		const response = fetch(`${urlAPI}/tasks`, {
			method: 'DELETE',
			header: {
				Authorization: JSON.stringify(data.token),
			},
			body: JSON.stringify(data.id),
		});
		resolve(response);
	});
};

const editTaskModel = async (data) => {
	return new Promise((resolve, reject) => {
		const response = fetch(`${urlAPI}/tasks`, {
			method: 'PUT',
			header: {
				Authorization: JSON.stringify(data.token),
			},
			body: JSON.stringify(data),
		});
		resolve(response);
	});
};

const filterState = {
	DONE: 'done',
	UNDONE: 'undone',
	ALL: 'all',
};

const toggleTaskModel = async (data) => {
	return new Promise((resolve, reject) => {
		const response = fetch(`${urlAPI}/tasks`, {
			method: 'PUT',
			header: {
				Authorization: JSON.stringify(data.token),
			},
			body: JSON.stringify(data),
		});
		resolve(response);
        
	});
};

module.exports = {
	addNewTask,
	getAllTask,
	deleteTaskModel,
	editTaskModel,
	toggleTaskModel,
};
