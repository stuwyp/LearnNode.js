const mysql = require('mysql');
const conf = require('../conf/db');
const sql = require('./sql_mapping');
const QueryString = require("querystring");

// 使用连接池
let pool = mysql.createPool(conf.mysql);

response = (res, ret_data, code, kind) => {
    switch (code) {
        case 404:
            ret_data['errMsg'] = 'Not found';
            break;
        case 400:
            ret_data['errMsg'] = 'Request error';
            break;
        case 201:
            ret_data['status'] = 'created';
            break;
        case 200:
            if (kind === 1)
                ret_data['status'] = 'updated';
            else if (kind === -1)
                ret_data ['status'] = 'deleted';
            break;
    }
    res.writeHead(code, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(ret_data));
};

add_function = (req, res) => {
    let post_data = '';
    let ret_data = {};
    pool.getConnection((err, con) => {
        req.on('data', (chunk) => {
            post_data += chunk;
        });
        req.on('end', () => {
            post_data = QueryString.parse(post_data);
            console.log(JSON.stringify(post_data));
            let content = post_data['content'];
            let deadline = post_data['deadline'];
            if (content && deadline) {
                con.query(sql.insert, [content, deadline], (err, result) => {
                    if (err) {
                        console.log(err.message);
                        response(res, 400);
                        con.release();
                    }
                    else {
                        ret_data['id'] = result['insertId'];
                        response(res, ret_data, 201);
                        con.release();
                    }
                });

            }
            else {
                response(res, ret_data, 400);
                con.release();
            }
        });
    })
};

delete_function = (req, res) => {
    let ret_data = {};
    let id = req.params.id;
    if (id) {
        pool.getConnection((err, con) => {
            con.query(sql.delete, [id], (err, result) => {
                if (err) {
                    console.log(err.message);
                    response(res, ret_data, 400);
                    con.release();
                }
                else if (result.affectedRows > 0) {
                    response(res, ret_data, 200, -1);
                    con.release();
                }
                else {
                    response(res, ret_data, 404);
                    con.release();
                }
            });
        });
    }
    else {
        response(res, ret_data, 400);
    }
};

update_function = (req, res) => {
    let put_data = '';
    let ret_data = {};
    let id = req.params.id;
    pool.getConnection((err, con) => {
        req.on('data', (chunk) => {
            put_data += chunk;
        });
        req.on('end', () => {
            put_data = QueryString.parse(put_data);
            console.log(JSON.stringify(put_data));
            let content = put_data['content'];
            let deadline = put_data['deadline'];
            if (id && content && deadline) {
                con.query(sql.update, [content, deadline, id], (err, result) => {
                    if (err) {
                        console.log(err.message);
                        response(res, ret_data, 400);
                        con.release();
                    }
                    else if (result.affectedRows > 0) {
                        response(res, ret_data, 200, 1);
                        con.release();
                    }
                    else {
                        response(res, ret_data, 404);
                        con.release();
                    }
                });
            }
            else {
                response(res, ret_data, 400);
                con.release();
            }
        });
    })
};

get_by_id_function = (req, res) => {
    let id = req.params.id;
    pool.getConnection((err, con) => {
        con.query(sql.query_by_id, id, (err, result) => {
            let ret_data = {};
            if (err) {
                console.log(err.message);
                response(res, ret_data, 400);
                con.release();
            }
            else if (result.length > 0) {
                console.log(result);
                ret_data['data'] = result;
                response(res, ret_data, 200, 0);
                con.release();
            }
            else {
                response(res, ret_data, 404);
                con.release();
            }

        });
    });
};

get_all_function = (req, res) => {
    pool.getConnection((err, con) => {
        con.query(sql.query_all, (err, result) => {
            let ret_data = {};
            if (err) {
                console.log(err.message);
                response(res, ret_data, 400);
                con.release();
            }
            else if (result.length > 0) {
                console.log(result);
                ret_data['data'] = result;
                response(res, ret_data, 200, 0);
                con.release();
            }
            else {
                response(res, ret_data, 404);
                con.release();
            }
        });
    });
};

module.exports = {
    add: add_function,
    update: update_function,
    delete: delete_function,
    get_by_id: get_by_id_function,
    get_all: get_all_function
};
