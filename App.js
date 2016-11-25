"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const Db_1 = require('./Models/Db');
const Setting_1 = require('./Setting');
const UserServices_1 = require('./Services/UserServices');
const ClientServices_1 = require('./Services/ClientServices');
var app = express();
app.use(session({ secret: Setting_1.default('secret'), saveUninitialized: true, resave: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/travel-monitoring/', express.static(path.join(__dirname, 'Public')));
app.use('/travel-monitoring/modules', express.static(path.join(__dirname, '/node_modules/')));
app.use('/travel-monitoring/local/js', express.static(path.join(__dirname, '/Public/Scripts/')));
app.use('/travel-monitoring/local/css', express.static(path.join(__dirname, '/Public/Css/')));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(UserServices_1.default);
app.use(ClientServices_1.default);
app.listen(Setting_1.default('port'), (error) => {
    Db_1.default.connect(Setting_1.default('dsn'));
    console.log('Travel Monitoring DB is running');
    console.log('Travel Monitoring is running on port %s', Setting_1.default('port'));
});
//# sourceMappingURL=App.js.map