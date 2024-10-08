require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const bodyParser = require("body-parser");
const expressratelimiter = require('express-rate-limit');
const mongoose = require('../app/database/database');
const passport = require(path.join(__dirname, '../app/config/passport-setup'));
const app = express();
const port = process.env.PORT;

const limiter = expressratelimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later."
});

app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../app/views'));
app.set('trust proxy', 1);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(limiter);

app.use(session({
    secret: process.env.WEBSITE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60
    }),
    cookie: {
         maxAge: 1000 * 60 * 60 * 24 
        },
    isLoggedIn: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect();

//Navbar
const SignupRoute = require(path.join(__dirname, '../app/routes/Signup'));
const LoginRoute = require(path.join(__dirname, '../app/routes/Login'));
const AboutRoute = require(path.join(__dirname, '../app/routes/About'));
const BuyRoute = require(path.join(__dirname, '../app/routes/Buy'));
const ContactRoute = require(path.join(__dirname, '../app/routes/Contact'));
const HomeRoute = require(path.join(__dirname, '../app/routes/Home'));

//Indirect
const ProfileRoute = require(path.join(__dirname, '../app/routes/Profile'));
const ConfirmationRoute = require(path.join(__dirname, '../app/routes/Confirmation'));

//Profile Page
const ProfileInfoRoute = require(path.join(__dirname, '../app/routes/ProfileInfo'));
const LogoutRoute = require(path.join(__dirname, '../app/routes/Logout'));

//Navbar
app.use('/Signup', SignupRoute);
app.use('/Login', LoginRoute);
app.use('/About', AboutRoute);
app.use('/Buy', BuyRoute);
app.use('/Contact', ContactRoute);
app.use('/', HomeRoute);

//Indirect
app.use('/MyProfile', ProfileRoute);
app.use('/Confirmation', ConfirmationRoute);

//Profile Page
app.use('/ProfileInfo', ProfileInfoRoute);
app.use('/Logout', LogoutRoute);

const server = app.listen(port, () => {
    console.log("Server listening on port " + port);
});

app.get('/', (req, res) => {
    res.render(path.join(__dirname, '../app/views/Home.ejs'), { active: req.session.isLoggedIn });
});
