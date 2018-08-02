const jsonServer = require("json-server");
const { join } = require("path");

const server = jsonServer.create();
const router = jsonServer.router(join(process.cwd(), "tools", "server", "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

module.exports = server;
