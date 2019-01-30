const QueryString = require("querystring");
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "todo"
});


function index(req, res) {
    const fs = require("fs");
    console.log("Request handler 'index' was called.");
    fs.readFile('./index.html', 'utf-8', function (err, data) {//读取内容
        if (err) throw err;
        res.writeHead(200, {"Content-Type": "text/html"});//注意这里
        res.write(data);
        res.end();
    });
}

function todo(req, res) {
    console.log("Request handler 'todo' was called.");
    let ret_data = {};
    switch (req.method) {
        //get
        case 'GET':

            con.query("SELECT * FROM todos ", (err, result) => {
                if (err) {
                    console.log(err.message);
                    ret_data['errMsg'] = 'Error';
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(ret_data));
                }
                else{
                    console.log(result);
                    ret_data['data'] = result;
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(ret_data));
                }


            });
            break;

        //post
        case 'POST':
            let post_data = '';
            req.setEncoding('utf8');
            req.on('data', (chunk) => {
                post_data += chunk;
            });
            req.on('end', () => {
                post_data = QueryString.parse(post_data);
                console.log(JSON.stringify(post_data));
                let content = post_data['content'];
                let deadline = post_data['deadline'];
                if (content && deadline) {
                    con.query("INSERT INTO todos (content,deadline) VALUES(?,?)", [content, deadline], (err, result) => {
                        if (err) {
                            console.log(err.message);
                            ret_data['errMsg'] = 'Error';
                            res.writeHead(400, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify(ret_data));
                        }
                        else {
                            ret_data['id'] = result['id'];
                            ret_data['status'] = 'Created';

                            res.writeHead(201, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify(ret_data));
                        }
                    });

                }
                else {
                    ret_data['errMsg'] = 'Error';
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(ret_data));
                }
            });
            break;


        case 'PUT':
            let put_data = '';
            req.setEncoding('utf8');
            req.on('data', (chunk) => {
                put_data += chunk;
            });
            req.on('end', () => {
                put_data = QueryString.parse(put_data);
                console.log(JSON.stringify(put_data));
                let todo_id = put_data['id'];
                let content = put_data['content'];
                let deadline = put_data['deadline'];
                if (content && deadline) {
                    con.query("UPDATE todos SET content = ?,deadline = ?  WHERE id  = ?", [content, deadline, todo_id], (err, result) => {
                        if (err) {
                            console.log(err.message);
                            ret_data['errMsg'] = 'Error';
                            res.writeHead(400, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify(ret_data));
                        }
                        else {
                            ret_data['status'] = 'updated';
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify(ret_data));
                        }
                    });

                }
                else {
                    ret_data['errMsg'] = 'Error';
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify(ret_data));
                }
            });
            break;


        case 'DELETE':
            let headers_data = '';
            req.setEncoding('utf8');
            headers_data = req.headers;
            let todo_id = headers_data['id'];
            if (todo_id) {
                // console.log(todo_id);
                con.query("DELETE FROM todos WHERE id  = ?", [todo_id], (err, result) => {
                    if (err) {
                        console.log(err.message);
                        ret_data['errMsg'] = 'Error';
                        res.writeHead(400, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(ret_data));
                    }
                    else if (result['affectedRows'] > 0) {
                        ret_data['status'] = 'deleted';
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(ret_data));
                    }
                    else {
                        ret_data['errMsg'] = 'Not found';
                        res.writeHead(404, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(ret_data));
                    }
                });
            }
            break;

        default:
            ret_data['errMsg'] = 'Method error';
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(ret_data));
    }

}

function todo_item(id, req, res) {
    console.log("Request handler 'todo_item' was called.");
    if (req.method === 'GET') {
        let ret_data = {};

        con.query("SELECT * FROM todos WHERE id = ?", [id], (err, result) => {
            if (err) {
                console.log(err.message);

                ret_data['errMsg'] = 'Error';
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(ret_data));
            }
            else if (result.length > 0) {
                console.log(result);
                ret_data['data'] = result;
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(ret_data));
            }
            else {
                ret_data['errMsg'] = 'Not found';
                res.writeHead(404, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(ret_data));
            }

        });

    }
    else {
        let ret_data = {'errMsg': 'Error'};
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(ret_data));
    }

}

exports.index = index;
exports.todo = todo;
exports.todo_item = todo_item;


