const MongoDbDataSource = require('./mongodb.DataSource');
const mongoDbURL = 'mongodb+srv://viht61220:2mZBTpaapnWeByvg@cluster0-videv.hnusrwx.mongodb.net/';
const databaseName = 'todoapp';
const DBCollections = {
	user: 'users',
	task: 'tasks',
};

const mongoDbDataSource = new MongoDbDataSource(mongoDbURL, databaseName);

module.exports = { DBCollections, mongoDbDataSource };
