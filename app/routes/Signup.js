const express = require('express');
const router = express.Router();
const path = require('path');
const { User } = require(path.join(__dirname, '..', '/models/schemas'))

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../app/views/Signup.ejs'));
})

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const { User } = require(path.join(__dirname, '..', 'schemas'));

// router.get('/', (req, res) => {
//     res.render('signup.pug');
// })

// router.post('/', async (req, res) => {
//     let username = req.body.user;
//     let password = req.body.pass;
//     let confPassword = req.body.conf;
//     let email = req.body.email;

//     try {
//         const existingUser = await User.findOne({
//             $or: [
//                 { username: username },
//                 { email: email }
//             ]
//         });

//         if (existingUser) {
//             return res.render('signup-err', { errorM: "Either username or email is already in use!" });
//         }

//         const newUser = await User.create({
//             username: username,
//             password: password,
//             email: email
//         });

//         req.session.user = {
//             username: newUser.username,
//             email: newUser.email,
//         };

//         res.render('profile', { name: username });
//     } catch (error) {
//         console.error('Error:', error);
//         res.render('signup-err', { errorM: "An error occurred while processing your request." });
//     }
// });

// module.exports = router;