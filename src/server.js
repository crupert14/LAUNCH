require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require('../app/database/database');
const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../app/views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Navbar
const SignupRoute = require(path.join(__dirname, '../app/routes/Signup'));
const LoginRoute = require(path.join(__dirname, '../app/routes/Login'));
const AboutRoute = require(path.join(__dirname, '../app/routes/About'));
const BuyRoute = require(path.join(__dirname, '../app/routes/Buy'));
const ContactRoute = require(path.join(__dirname, '../app/routes/Contact'));
const HomeRoute = require(path.join(__dirname, '../app/routes/Home'));

//Indirect
const ProfileRoute = require('../app/routes/Profile');

//Navbar
app.use('/Signup', SignupRoute);
app.use('/Login', LoginRoute);
app.use('/About', AboutRoute);
app.use('/Buy', BuyRoute);
app.use('/Contact', ContactRoute);
app.use('/', HomeRoute);

//Indirect
app.use('/MyProfile', ProfileRoute);

const server = app.listen(port, () => {
    console.log("Server listening on port " + port);
});

app.get('/', (req, res) => {
    res.render(path.join(__dirname, '../app/views/home.ejs'));
});
