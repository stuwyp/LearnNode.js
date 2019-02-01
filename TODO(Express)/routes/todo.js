let express = require('express');
let router = express.Router();
let todo_dao = require('../dao/todo_dao');

router.post('/todo', (req, res, next) => {
    todo_dao.add(req, res, next);
});

router.put('/todo/:id', (req, res, next) => {
    todo_dao.update(req, res, next);
});

router.delete('/todo/:id', (req, res, next) => {
    todo_dao.delete(req, res, next);
});


router.get('/todo/:id', (req, res, next) => {
    todo_dao.get_by_id(req, res, next);
});

router.get('/todo', (req, res, next) => {
    todo_dao.get_all(req, res, next);
});

module.exports = router;
