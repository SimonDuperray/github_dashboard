const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Users list');
});

router.get('/new', (req, res, next) => {
    res.send('Users new form');
});

module.exports = router;