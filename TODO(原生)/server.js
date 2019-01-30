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

// let counter = 0;
// let todolist = {};
//
// function add_item(req, res) {
//     let id = counter += 1;
//     let post = '';
//
//     req.on('data', (chunk) => {
//         post += chunk;
//     });
//
//     req.on('end', () => {
//         post = QueryString.parse(post);
//         console.log(JSON.stringify(post))
//     });
//     // let item = req.body;
//
//     console.log('create item', id);
//     // todolist[id] = item;
//     res.writeHead(201, {
//         'Content-Type': 'text/plain',
//         // 'Location': '/todo/' + id
//     });
//     res.end('\n');
// }
//
// router.post('/todo', add_item);
//
// function get_item(req, res) {
//     let id = req.params.id;
//     let item = todolist[id];
//     if (typeof  item !== 'string') {
//         console.log('item not found', id);
//         res.writeHead(404);
//         res.end('\n');
//         return;
//     }
//
//     console.log('read item', id, item);
//
//     res.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });
//     res.end(item);
// }
//
// router.get('/todo/:id', get_item);
//
// function delete_item(req, res) {
//     let id = req.params.id;
//     if (typeof  todolist['id'] !== 'string') {
//         console.log('item not found', id);
//         res.writeHead(404);
//         res.end('\n');
//         return;
//     }
//     console.log('delete item', id);
//
//     todolist[id] = undefined;
//     res.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });
//     res.end('\n');
// }
//
// router.delete('/todo/:id', delete_item);
//
// function get_list(req, res) {
//     let item, item_list = [], list_string;
//
//     for (id in todolist) {
//         if (!todolist.hasOwnProperty(id)) {
//             continue;
//         }
//         item = todolist[id];
//
//         if (typeof item !== 'string') {
//             continue;
//         }
//         item_list.push(item);
//     }
//     console.log('read list : \n', JSON.stringify(
//         item_list, null, ''
//     ));
//     list_string = item_list.join('\n');
//
//     res.writeHead(200, {
//         'Content-Type': 'text/plain'
//     });
//     res.end(list_string)
// }
//
// router.get('/todo', get_list);
//
// function update_item(req, res) {
//     let id = req.params.id;
//     let item = req.body;
//
//     if (typeof  todolist[id] !== 'string') {
//         console.log('item not found', id);
//         res.writeHead(404);
//         res.end('\n');
//         return;
//     }
//
//     console.log('update item', id, item);
//
//     todolist[id] = item;
//     res.writeHead(201, {
//         'Content-Type': 'text/plain',
//         'Location': '/todo/' + id
//     });
//     res.end(item);
// }
//
// router.put('/todo/:id', update_item);
