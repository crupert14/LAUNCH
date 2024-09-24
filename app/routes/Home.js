const express = require('express');
const router = express.Router();
const path = require('path');

const temp = {
    user: 'cade'
}

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../app/views/Home.ejs'));
})

module.exports = router;