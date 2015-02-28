// 'use strict';

var mongoose = require('mongoose');

var localDevPath = 'mongodb://localhost:27017/worldOrchestra-dev';
var dbPath = process.env.MONGODB_URI || localDevPath;

mongoose.connect(dbPath);

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){ console.log('Mongodb connection is open!')});

module.exports = db;