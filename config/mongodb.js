const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(
	process.env.MONGO_URL ||
		'mongodb+srv://viht61220:2mZBTpaapnWeByvg@cluster0-videv.hnusrwx.mongodb.net/'
);

function GET_DB() {
	const todoAppInstance = client.db('todoapp');
	return todoAppInstance;
}

module.exports = { GET_DB, client };
