const express = require('express');
const path = require('path');
const session = require("express-session");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', 'src')));

const server = app.listen(port, () => {
    console.log("Server listening on port " + port);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src/html/index.html'));
});