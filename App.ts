import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as session from 'express-session';
import db from './Models/Db';
import setting from './Setting';
import userRouter from './Services/UserServices';
import clientRouter from './Services/ClientServices';

var app = express();

app.use(session({ secret: setting('secret'), saveUninitialized: true, resave: true }));
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

app.use(userRouter);
app.use(clientRouter);

app.listen(setting('port'), (error) => {
    db.connect(setting('dsn'));
    console.log('Travel Monitoring DB is running');
    console.log('Travel Monitoring is running on port %s', setting('port'));
});