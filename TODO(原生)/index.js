const server = require('./server');
const router = require("./router");
const requestHandlers = require("./requestHandlers");

//对象构造
var handle = {};
handle["/"] = requestHandlers.index;
handle["/todo"] = requestHandlers.todo;
handle["/todo/"] = requestHandlers.todo_item;
//启动服务器
server.start(router.route, handle);
