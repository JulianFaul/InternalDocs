const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/User.model.js');
const mongoose = require('mongoose');

exports.index = (req, res) => {
    User.find({})
    .populate('__histories')
  
    .exec((err, details) => {
        if(err){
            res.send(err)
        }
        res.send(details)
    })
}
exports.create = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).send({ message: "User already exists"});;
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
        } else {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            userName: req.body.userName,
            lastname: req.body.lastname,
            department: req.body.department,
            role: req.body.role
        });
            user
              .save()
              .then(result => {
                  res.send(user);
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
}
exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Could not find the user"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
          );
          return res.status(200).json({
            _id: user[0]._id,
            department: user[0].department,
            email: user[0].email,
            lastname: user[0].lastname,
            role: user[0].role,
            userName: user[0].userName,
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.update = (req, res) => {

}

exports.destroy = (req, res, next) => {
    User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}