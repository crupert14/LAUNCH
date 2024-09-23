const https = require("https");
const express = require('express');
const path = require('path');
const session = require("express-session");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', "/Users/caderupert/LAUNCH/app/views");

const SignupRoute = require('../app/routes/Signup');
const LoginRoute = require('../app/routes/Login')
const AboutRoute = require('../app/routes/About');
const BuyRoute = require('../app/routes/Buy');
const ContactRoute = require('../app/routes/Contact');
const HomeRoute = require('../app/routes/Home');

app.use('/Signup', SignupRoute);
app.use('/Login', LoginRoute);
app.use('/About', AboutRoute);
app.use('/Buy', BuyRoute);
app.use('/Contact', ContactRoute);
app.use('/', HomeRoute);

const server = app.listen(port, () => {
    console.log("Server listening on port " + port);
});

app.get('/', (req, res) => {
    res.render(path.join(__dirname, '../app/views/home.ejs'));
});