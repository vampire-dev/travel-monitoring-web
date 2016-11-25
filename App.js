"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const Setting_1 = require('./Setting');
var app = express();
app.use(session({ secret: Setting_1.default('secret'), saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/travel-tracking/', express.static(path.join(__dirname, 'Public')));
app.use('/travel-tracking/modules', express.static(path.join(__dirname, '/node_modules/')));
app.use('/travel-tracking/local/js', express.static(path.join(__dirname, '/Public/Scripts/')));
app.use('/travel-tracking/local/css', express.static(path.join(__dirname, '/Public/Css/')));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(Setting_1.default('port'), (error) => {
    console.log('Travel Monitoring is running on port %s', Setting_1.default('port'));
});
//# sourceMappingURL=App.js.map