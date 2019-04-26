const CustomerModel = require('../models/customer.model');
const express = require('express');
let router = express.Router();


// Get all customers
router.get('/customers', (req,res) => {
    CustomerModel.find({}, (err, customers) => {
        if(err){
            res.send('Could not get all customers');
            next();
        }
        res.json(customers);
    })
});


// Get a customer by id
router.get('/customer/:id', (req,res) => {
    CustomerModel.findById(req.params.id)
    .then(doc => {
        if(!doc || doc.length === 0){
            return res.status(404).send("Invalid Id");
        }
        res.status(201).send(doc)
    })
    .catch(err => {
        err.mesage = "It looks like the ID provided is invalid"
        res.status(500).json(err);
    })
});

// Get a customer by id
// router.get('/customer/:id', (req,res) => {
//     CustomerModel.findById(req.params.id)
//     .then(doc => {
//         if(!doc || doc.length === 0){
//             return res.status(404).send("Invalid Id");
//         }
//         res.status(201).send(doc)
//     })
//     .catch(err => {
//         err.mesage = "It looks like the ID provided is invalid"
//         res.status(500).json(err);
//     })
// });


// Create a new customer
router.post('/customer', (req, res) => {
    if(!req.body){
        return res.status(400).send('Request body is missing');
    }
    let model = new CustomerModel(req.body)
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0){
                return res.status(404).send(doc);
            }
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

module.exports = router;