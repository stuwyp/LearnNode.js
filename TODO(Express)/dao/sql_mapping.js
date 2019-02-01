// CRUD SQL语句
var todo = {
    insert: 'insert into todos(id,content,deadline) values(0,?,?);',
    update: 'update todos set content=?, deadline=? where id=?;',
    delete: 'delete from todos where id=?;',
    query_by_id: 'select * from todos where id=?;',
    query_all: 'select * from todos;'
};

module.exports = todo;
