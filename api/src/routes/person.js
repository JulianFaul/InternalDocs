const express = require('express');
let router = express.Router();

router.get('/person', (req,res) => {
    res.send('getting a person')
});

router.get('/person/:id', (req,res) => {
    res.send(`You have a requested a person by id ${req.params.id}`)
});

router.get('/error', (req,res) => {
    throw new Error('This is a forced error');
});

module.exports = router;