const { handleError } = require('../helpers');

function MongoDbDataSource(mongoDbURL, databaseName) {
	this.GET_DB = () => {
		const client = new MongoClient(mongoDbURL);
		const todoAppInstance = client.db(databaseName);
		return todoAppInstance;
	};
	this.readCollection = async function readCollection(collectionName = '') {
		const dataCollection = await this.GET_DB().collection(collectionName).find().toArray();
		return dataCollection;
	};
	this.writeCollection = function writeCollection(collectionName = '', newData) {};
}

module.exports = MongoDbDataSource;
