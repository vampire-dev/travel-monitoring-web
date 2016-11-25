"use strict";
const express_1 = require('express');
const Setting_1 = require('../Setting');
const ClientController_1 = require('../Controllers/ClientController');
const Auth_1 = require('../Auth');
var ClientRouter = express_1.Router();
var root = Setting_1.default('service');
ClientRouter.get(root + 'client/get', Auth_1.default, (req, res) => {
    ClientController_1.default.get(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
ClientRouter.get(root + 'client/getByDevice', Auth_1.default, (req, res) => {
    ClientController_1.default.getByDevice(req.query.model, req.query.serial).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
ClientRouter.get(root + 'client/getAll', Auth_1.default, (req, res) => {
    var query = JSON.parse(req.query.query);
    ClientController_1.default.getAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
ClientRouter.post(root + 'client/save', Auth_1.default, (req, res) => {
    ClientController_1.default.save(req.body).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
ClientRouter.delete(root + 'client/delete', Auth_1.default, (req, res) => {
    ClientController_1.default.delete(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClientRouter;
//# sourceMappingURL=ClientServices.js.map