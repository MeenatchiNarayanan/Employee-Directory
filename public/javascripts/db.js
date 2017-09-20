var chalk = require('chalk');
var mongoose = require('mongoose');

var databaseURI = 'mongodb://EMP:E123@ds123456.mlab.com:23456/bsmdb';
console.log(chalk.yellow("Establishing connection to the DB"));

//   ****** CONNECTIONS
mongoose.connect(databaseURI);
mongoose.connection.on('connected', function() {
    console.log(chalk.yellow('Mongoose connected to ' + databaseURI));
});

mongoose.connection.on('error', function(err) {
    console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function() {
    console.log(chalk.red('Mongoose disconnected'));
});

// ***** *******  *  *****   Schema defs
var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    age: { type: String, required: true },
    department: { type: String, required: true },
    gender: { type: String, required: true }
}, { collection: 'EmployeeCollection' });

// register the User model
mongoose.model('user', userSchema);