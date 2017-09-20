var mongoose = require('mongoose');
var Model = mongoose.model('Model');

var chalk = require('chalk');
var app = require('../app');

exports.showAll = function(req, res) {
    Model.find({}, function(err, obj) {
        console.log(obj);
        res.send(obj)
    });
};

exports.insert = function(req, res) {
    var user = new Model();
    user.name = req.body.Name;
    user.email = req.body.Email;
    user.dob = req.body.DOB;
    user.age = req.body.Age;
    user.department = req.body.Department;
    user.gender = req.body.Gender;
    user.save(function(err, savedUser) {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            Model.find({}, function(err, obj) {
                res.send(obj)
            });
        }
    });
};

exports.update = function(req, res) {
    Model.update({ email: req.body.Email }, {
            $set: {
                name: req.body.Name,
                email: req.body.Email,
                dob: req.body.DOB,
                gender: req.body.Gender,
                age: req.body.Age,
                department: req.body.Department
            }
        }, { multi: false },
        function(err, obj) {
            if (err) {
                console.log("error");
                console.log(JSON.stringify(err));
                res.send("error");
            } else {
                Model.find({}, function(err, obj) {
                    res.send(obj)
                });
            }
        });
};

exports.delete = function(req, res) {
    Model.remove({ name: req.body.name }, function(err, obj) {
        if (err) {
            console.log("error");
            console.log(JSON.stringify(err));
            res.send("error");
        } else {
            Model.find({}, function(err, obj) {
                res.send(obj)
            });
        }
    });
}