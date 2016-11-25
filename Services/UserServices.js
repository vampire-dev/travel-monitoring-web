"use strict";
const express_1 = require('express');
const Setting_1 = require('../Setting');
const UserController_1 = require('../Controllers/UserController');
const Auth_1 = require('../Auth');
var UserRouter = express_1.Router();
var root = Setting_1.default('service');
UserRouter.get(root + 'user/get', Auth_1.default, (req, res) => {
    UserController_1.default.get(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
UserRouter.get(root + 'user/getAll', Auth_1.default, (req, res) => {
    var query = JSON.parse(req.query.query);
    UserController_1.default.getAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
UserRouter.post(root + 'user/save', Auth_1.default, (req, res) => {
    UserController_1.default.save(req.body).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
UserRouter.delete(root + 'user/delete', Auth_1.default, (req, res) => {
    UserController_1.default.delete(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
UserRouter.post(root + 'user/authenticate', (req, res) => {
    UserController_1.default.authenticate(req.body.userName, req.body.password).then(result => {
        req.session['identity'] = { "name": result.name, "userName": result.userName, "token": Setting_1.default('token') };
        res.status(200).send(req.session['identity']);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
UserRouter.get(root + 'user/getIdentity', Auth_1.default, (req, res) => {
    res.status(200).send(req.session['identity']);
});
UserRouter.get(root + 'user/logout', Auth_1.default, (req, res) => {
    req.session.destroy((err) => {
        res.status(200).send('Ok');
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserRouter;
//# sourceMappingURL=UserServices.js.map