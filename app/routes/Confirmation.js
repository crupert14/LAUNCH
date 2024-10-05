const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/:token', (req, res) => {
    console.log(req.params.token);
})

module.exports = router;