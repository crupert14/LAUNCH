const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../app/views/InvestorsCenter.ejs'));
})

module.exports = router;