const { DBCollections, fileSystemDataSource } = require('../datasources');
const { validateEntityFields, validateEntityUniqueness } = require('./helpers');
const { handleError } = require('../helpers');

function Repository(name, schema) {
	this.schema = schema;

	this.filterById = function findById(id) {
		return fileSystemDataSource
			.readCollection(DBCollections[name])
			.then((data) => {
				// TODO: Implement filter by owner id
				// const foundEntity = data.filter(entity => entity.owner == id)
				// return foundEntity
				return data;
			})
			.catch((err) => {
				handleError(err, 'repositories/base.repository.js', 'findById');
				return undefined;
			});
	};

	this.findById = function findById(id) {
		return fileSystemDataSource
			.readCollection(DBCollections[name])
			.then((data) => {
				const foundEntity = data.find((entity) => entity.id === id);
				return foundEntity;
			})
			.catch((err) => {
				handleError(err, 'repositories/base.repository.js', 'findById');
				return undefined;
			});
	};

	this.createOne = function createOne(newItem) {
		return new Promise((resolve, reject) => {
			let validationError = validateEntityFields(this.schema, newItem);
			if (validationError) {
				reject(validationError);
			} else {
				resolve(
					this.find().then((existingItems) => {
						validationError = validateEntityUniqueness(this.schema, newItem, existingItems);
						if (validationError) {
							throw new Error(validationError);
						}
						// Generate new id from the last item's id in the collection + 1
						newId =
							existingItems.length > 0 ? Number(existingItems[existingItems.length - 1].id) + 1 : 0;
						const newItemWithId = { id: newId, ...newItem };
						existingItems.push(newItemWithId);
						return fileSystemDataSource
							.writeCollection(DBCollections[name], existingItems)
							.catch((err) => {
								handleError(err, 'repositories/base.repository.js', 'createOne');
							});
					})
				);
			}
		});
	};
	this.updateOne = function updateOne(newItem) {
		return new Promise((resolve, reject) => {
			let validationError = validateEntityFields(this.schema, newItem);
			if (validationError) {
				reject(validationError);
			} else {
				resolve(
					this.find().then((existingItems) => {
						validationError = '';
						if (validationError) {
							throw new Error(validationError);
						}
						existingItems.forEach((element) => {
							if (element.id == newItem.id) {
								// TODO: Write update all fields in newItem instead for only task's taskName
								// element.taskName = newItem.taskName
								element = { ...element, ...newItem };
							}
						});
						return fileSystemDataSource
							.writeCollection(DBCollections[name], existingItems)
							.catch((err) => {
								handleError(err, 'repositories/base.repository.js', 'updateOne');
							});
					})
				);
			}
		});
	};
	this.removeOne = function removeOne(targetItem) {
		return new Promise((resolve, reject) => {
			let validationError = validateEntityFields(this.schema, targetItem);
			if (validationError) {
				reject(validationError);
			} else {
				resolve(
					this.find().then((existingItems) => {
						validationError = '';
						if (validationError) {
							throw new Error(validationError);
						}
						existingItems = existingItems.filter((item) => item.id != targetItem.id);
						return fileSystemDataSource
							.writeCollection(DBCollections[name], existingItems)
							.catch((err) => {
								handleError(err, 'repositories/base.repository.js', 'removeOne');
							});
					})
				);
			}
		});
	};
}

module.exports = Repository;

//*INFO: Explain code above

// Explain createOne
// 1. We have a function called createOne that takes 1 argument: newItem
// 2. We return a promise that resolves to undefined (void function)
// 3. We validate the newItem with the schema of the collection defined in models
// 4. If there is an error, we reject the promise with the error
// 5. If there is no error, we resolve the promise with the result of this.find()
// 6. We call this.find() to get all existing items in the collection
// 7. We validate the newItem with the existing items to make sure the newItem is unique
// 8. If there is an error, we throw the error
// 9. We generate the id for the newItem
// 10. We push the newItem to the existing items
// 11. We update the collection with the new data
// 12. If there is an error, we log the error
