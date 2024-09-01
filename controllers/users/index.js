const {
	generateUID,
	handleMessage,
	getDataFromRequest,
} = require('../../ultis/index.js');
const { httpStatusCode, USER_DATABASE_NAME } = require('../../constants.js');
const { GET_DB } = require('../../configs/mongodb.js');
const { ObjectId } = require('mongodb');

async function getUserById(request, response) {
	const user = await GET_DB()
		.collection(USER_DATABASE_NAME)
		.findOne({ email: 'vi.tien.huynh@udt.group' });
	response.writeHead(httpStatusCode.OK, { 'Content-Type': 'application/json' });
	response.end(JSON.stringify(user));
}

async function addUser(request, response) {
	const body = await getDataFromRequest(request);
	let message = '';
	const newUsertoAdd = {
		...body,
	};
	const newUser = await GET_DB()
		.collection(USER_DATABASE_NAME)
		.insertOne(newUsertoAdd);
	if (newUser) {
		message = 'Add Success';
		handleMessage(message, response);
	} else {
		message = 'Add Failed';
		handleMessage(message, response);
	}
}

async function checkTokenIsValid(user_id, token) {
	const result = await GET_DB()
		.collection(USER_DATABASE_NAME)
		.findOne({ _id: new ObjectId(user_id), token: token });
	if (result) {
		return true;
	} else {
		return false;
	}
}

async function loginUser(request, response) {
	const body = await getDataFromRequest(request);
	let message = '';
	if (body?.email && body?.password) {
		const query = {
			email: body.email,
			password: body.password,
		};
		const queryUpdate = {
			$set: { token: generateUID() },
		};
		const options = {
			returnDocument: 'after',
			upsert: true,
		};
		const result = await GET_DB()
			.collection(USER_DATABASE_NAME)
			.findOneAndUpdate(query, queryUpdate, options);
		if (result) {
			response.writeHead(httpStatusCode.OK, {
				'Content-Type': 'application/json',
			});
			response.end(JSON.stringify(result));
		} else {
			message = 'User not found';
			handleMessage(message, response);
		}
	}
}

async function logoutUser(request, response) {
	const body = await getDataFromRequest(request);
	const token = request.headers['authorization'];
	if (!token) {
		response.writeHead(httpStatusCode.UNAUTHORIZED, {
			'Content-Type': 'application/json',
		});
	}
	const query = {
		_id: new ObjectId(body._id),
	};
	const queryUpdate = {
		$unset: { token: '' },
	};
	const options = {
		returnDocument: 'after',
	};
	const result = await GET_DB()
		.collection(USER_DATABASE_NAME)
		.findOneAndUpdate(query, queryUpdate, options);
	if (result) {
		response.writeHead(httpStatusCode.OK, {
			'Content-Type': 'application/json',
		});
	} else {
		message = 'User not found';
		handleMessage(message, response);
	}
}

module.exports = {
	getUserById,
	addUser,
	loginUser,
	logoutUser,
	checkTokenIsValid,
};
