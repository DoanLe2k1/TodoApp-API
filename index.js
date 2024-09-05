const { METHODS } = require('./constants.js');
const router = require('./routers/index.js');
const createServer = require('http').createServer;
const port = 3000;

const server = createServer(function configHeadersServer(request, response) {
	response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Replace with specific origin if needed
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader(
		'Access-Control-Allow-Methods',
		'GET,PUT,POST,DELETE,PATCH'
	);
	response.setHeader(
		'Access-Control-Allow-Headers',
		'Content-Type, Authorization'
	);

	/**
	 * need to check method options because of preflight response
	 * https://stackoverflow.com/questions/45395174/fetch-respond-to-preflight-response
	 * */

	if (request.method === METHODS.OPTIONS) {
		response.end();
	}
	router.run(request, response);
});

server.listen(port, function listenLocalhost() {
	console.log(`Listening on localhost:${port}`);
});
