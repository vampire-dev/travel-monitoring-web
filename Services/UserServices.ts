import {Request, Response, Router} from 'express';
import setting from '../Setting';
import UserController from '../Controllers/UserController';
import auth from '../Auth';

var UserRouter = Router();
var root = setting('service');

UserRouter.get(root + 'user/get', auth, (req: Request, res: Response) => {

});

UserRouter.get(root + 'user/getAll', auth, (req: Request, res: Response) => {

});

UserRouter.post(root + 'user/save', auth, (req: Request, res: Response) => {

});

UserRouter.delete(root + 'user/delete', auth, (req: Request, res: Response) => {

});

UserRouter.post(root + 'user/authenticate', (req: Request, res: Response) => {

});

UserRouter.get(root + 'user/getIdentity', auth, (req: Request, res: Response) => {

});

UserRouter.get(root + 'user/logout', auth, (req: Request, res: Response) => {

});

export default UserRouter;