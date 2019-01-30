const Http = require('http');
const url = require("url");

// const util = require("util");

let start = (route, handle) => {
    let server = Http.createServer((req, res) => {

        let pathname = url.parse(req.url, true).pathname;
        let reg = new RegExp('\/todo\/(\\d+)');
        let id = undefined;

        console.log("Request for '" + pathname + "' received.");
        if (reg.test(pathname)) {

            id = reg.exec(pathname)[1];
            pathname = '/todo/';
        }

        route(handle, pathname, id, req, res);

    });
    server.listen(3000, () => {
        console.log('listening on port 3000');
    });
};

exports.start = start;
