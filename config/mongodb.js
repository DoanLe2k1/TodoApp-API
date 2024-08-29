const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(
	process.env.MONGO_URL ||
		'mongodb+srv://viht61220:2mZBTpaapnWeByvg@cluster0-videv.hnusrwx.mongodb.net/'
);

async function CONNECT_DB() {
	await client.connect();
	todoAppInstance = client.db('todoapp');
	return todoAppInstance;
}

async function GET_DB() {
	if (!todoAppInstance) throw new Error('You need to connect database first!');
	return todoAppInstance;
}

module.exports = { CONNECT_DB, GET_DB };
