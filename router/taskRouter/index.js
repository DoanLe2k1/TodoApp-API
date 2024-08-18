var routerMethods = require("../methods.js");

var routes = require("../routes.js");
const {addTask,getTasks}  = require("../../controller/tasks/index.js");
  var taskRouter = {
  run(req, res) {
    routerMethods.get(req, res, routes.task.value, getTasks);
    routerMethods.post(req, res, routes.task.value, addTask);
    // routerMethods.options(req,res,routes.task.value,fixPreflight);

  },
};
module.exports = taskRouter;