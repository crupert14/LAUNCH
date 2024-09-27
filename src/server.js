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
app.set('views', "/Users/caderupert/LAUNCH/app/views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Navbar
const SignupRoute = require('../app/routes/Signup');
const LoginRoute = require('../app/routes/Login')
const AboutRoute = require('../app/routes/About');
const BuyRoute = require('../app/routes/Buy');
const ContactRoute = require('../app/routes/Contact');
const HomeRoute = require('../app/routes/Home');

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