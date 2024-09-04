const task = {
	id: {
		type: 'number',
		required: true,
	},
	name: {
		type: 'string',
		required: true,
		unique: true,
	},
	completed: {
		type: 'string',
		required: false,
	},
	user_id: {
		type: 'number',
		required: true,
	},
};

module.exports = task;
