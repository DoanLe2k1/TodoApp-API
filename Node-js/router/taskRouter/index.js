var routerMethods = require("../methods");

var routes = require("../routes.js");
var getTasks  = require("../../controller/tasks/index.js");
  var taskRouter = {
  run(req, res) {
    routerMethods.get(req, res, routes.user.value, getTasks);
  },
};
module.exports = taskRouter;