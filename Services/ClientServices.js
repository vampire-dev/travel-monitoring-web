"use strict";
const express_1 = require('express');
const Setting_1 = require('../Setting');
const Auth_1 = require('../Auth');
var ClientRouter = express_1.Router();
var root = Setting_1.default('service');
ClientRouter.get(root + 'client/get', Auth_1.default, (req, res) => {
});
ClientRouter.get(root + 'client/getByDevice', Auth_1.default, (req, res) => {
});
ClientRouter.get(root + 'client/getAll', Auth_1.default, (req, res) => {
});
ClientRouter.post(root + 'client/save', Auth_1.default, (req, res) => {
});
ClientRouter.delete(root + 'client/delete', Auth_1.default, (req, res) => {
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClientRouter;
//# sourceMappingURL=ClientServices.js.map