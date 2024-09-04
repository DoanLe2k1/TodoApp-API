const { httpStatusCode } = require('../constants');

function getDataFromRequest(request) {
	return new Promise((resolve, reject) => {
		let body = '';
		request.on('data', (chunk) => {
			body += chunk.toString();
		});
		request.on('end', () => {
			resolve(JSON.parse(body));
		});
	});
}

function generateUID() {
	return Date.now().toString(36) + Math.random().toString(36).substring(2, 11);
}

function checkAuthorizationHeaders(request, response) {
	const token = request.headers['authorization'];
	if (!token) {
		response.writeHead(httpStatusCode.UNAUTHORIZED, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify({ message: 'NO TOKENNNNNN' }));
	} else {
		return token;
	}
}

function handleMessage(message, response) {
	if (message === 'Add Success') {
		response.writeHead(httpStatusCode.CREATED, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(message));
	} else if (message === 'Token is not valid') {
		response.writeHead(httpStatusCode.UNAUTHORIZED, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(message));
	} else if (message === 'User not found') {
		response.writeHead(httpStatusCode.NOT_FOUND, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(message));
	} else if (message === 'Task not found') {
		response.writeHead(httpStatusCode.NOT_FOUND, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(message));
	} else if (message === 'Put/Patch Success') {
		response.writeHead(httpStatusCode.NO_CONTENT, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(message));
	} else if (message === 'Body not found') {
		response.writeHead(httpStatusCode.BAD_REQUEST, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(message));
	} else if (message === 'Get Tasks Successfully') {
		response.writeHead(httpStatusCode.OK, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(message));
	} else if (message === 'Add Failed') {
		response.writeHead(httpStatusCode.INTERNAL_SERVER_ERROR, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(message));
	} else if (message === 'Delete Task Successfully') {
		response.writeHead(httpStatusCode.NO_CONTENT, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(message));
	} else if (message === 'Delete All Tasks Successfully') {
		response.writeHead(httpStatusCode.NO_CONTENT, {
			'Content-Type': 'application/json',
		});
		response.end(JSON.stringify(message));
	}
}

module.exports = {
	getDataFromRequest,
	generateUID,
	checkAuthorizationHeaders,
	handleMessage,
};
