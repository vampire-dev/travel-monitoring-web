"use strict";
const express_1 = require('express');
const Setting_1 = require('../Setting');
const Auth_1 = require('../Auth');
var UserRouter = express_1.Router();
var root = Setting_1.default('service');
UserRouter.get(root + 'user/get', Auth_1.default, (req, res) => {
});
UserRouter.get(root + 'user/getAll', Auth_1.default, (req, res) => {
});
UserRouter.post(root + 'user/save', Auth_1.default, (req, res) => {
});
UserRouter.delete(root + 'user/delete', Auth_1.default, (req, res) => {
});
UserRouter.post(root + 'user/authenticate', (req, res) => {
});
UserRouter.get(root + 'user/getIdentity', Auth_1.default, (req, res) => {
});
UserRouter.get(root + 'user/logout', Auth_1.default, (req, res) => {
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserRouter;
//# sourceMappingURL=UserServices.js.map