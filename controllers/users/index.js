const {
	generateUID,
	handleMessage,
	getBodyDataRequest,
} = require('../../ultis/index.js');
const {
	httpStatusCode,
	urlAPI,
	USER_DATABASE_NAME,
} = require('../../constants.js');
const { GET_DB, client } = require('../../config/mongodb.js');
const { ObjectId } = require('mongodb');

async function getUsers(request, response) {
	// const user = await GET_DB()
	// 	.collection(USER_DATABASE_NAME)
	// 	.findOne({ email: 'vi.tien.huynh@udt.group' });
	// response.writeHead(httpStatusCode.OK, { 'Content-Type': 'application/json' });
	// response.end(JSON.stringify(user));
}

// insertOne({email,password})
// response CREATED
// Doan
async function addUser(request, response) {
	const body = await getDataFromRequest(request);
	const result = await fetch(`${urlAPI}/api/users`, {
		method: 'POST',
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

function updateUsers(req, res) {
	res.end('Update User Succesfully');
}
function deleteUsers(req, res) {
	res.end(JSON.stringify({ message: 'Delete User Succesfully' }));
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
	const body = await getBodyDataRequest(request);
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
// 1. query user if user.email === body.email & user.token === token
// FE => Authorization: request.headers['authorization']
// token = request.headers['authorization']
// 2.1. update user, delete token of that user => return message Success
// 2.2 return user not found (super super rare! )
// Thuy
const logoutUser = async (request, response) => {
	const body = await getDataFromRequest(request);
	const result = await fetch(`${urlAPI}/api/users/logout`, {
		method: 'POST',
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

module.exports = {
	getUsers,
	addUser,
	updateUsers,
	deleteUsers,
	loginUser,
	logoutUser,
	checkTokenIsValid,
};
