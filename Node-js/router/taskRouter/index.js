var routerMethods = require("../methods");

var routes = require("../routes.js");
const addTask  = require("../../controller/tasks/index.js");
  var taskRouter = {
  run(req, res) {
    routerMethods.post(req, res, routes.task.value, addTask);
  },
};
module.exports = taskRouter;