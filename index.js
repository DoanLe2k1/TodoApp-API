const { CONNECT_DB } = require('./config/mongodb.js');
const { METHODS } = require('./constants.js');
const router = require('./router/index.js');
const createServer = require('http').createServer;
const port = 3000;

const server = createServer(async function configHeadersServer(
	request,
	response
) {
	// Config cors to allow fetch data from front to back
	response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Replace with specific origin if needed
	response.setHeader('Access-Control-Request-Method', '*');
	response.setHeader(
		'Access-Control-Allow-Methods',
		'GET,PUT,POST,DELETE,PATCH'
	); // Adjust methods as needed
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
	await CONNECT_DB();
	router.run(request, response);
});

server.listen(port, function listenLocalhost() {
	console.log(`Listening on localhost:${port}`);
});
