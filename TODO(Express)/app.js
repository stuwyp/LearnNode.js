const routes = require('./routes/todo');
const express = require('express');
const path = require("path");
let app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.listen(3000);
console.log('Server start on http://127.0.0.1:3000');
