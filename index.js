const router = require("./router/index.js");
const createServer = require("http").createServer;

const server = createServer((req, res) => {
  router.run(req, res);
});

// Starts a simple HTTP server locally on port 3000
server.listen(3000, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:3000");
});

// Run with `node server.js`
