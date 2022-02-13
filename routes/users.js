const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log("users vue");
    res.render("users", {  });
});

router.post('/', (req, res, next) => {
    res.send("Get dev name");
});

router.get('/:id', (req, res, next) => {
    res.send(`Get ${req.params.id} developer`);
});

module.exports = router;