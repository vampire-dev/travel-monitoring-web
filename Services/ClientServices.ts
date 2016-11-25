import {Request, Response, Router} from 'express';
import setting from '../Setting';
import UserController from '../Controllers/ClientController';
import auth from '../Auth';

var ClientRouter = Router();
var root = setting('service');

ClientRouter.get(root + 'client/get', auth, (req: Request, res: Response) => {

});

ClientRouter.get(root + 'client/getByDevice', auth, (req: Request, res: Response) => {

});

ClientRouter.get(root + 'client/getAll', auth, (req: Request, res: Response) => {

});

ClientRouter.post(root + 'client/save', auth, (req: Request, res: Response) => {

});

ClientRouter.delete(root + 'client/delete', auth, (req: Request, res: Response) => {

});

export default ClientRouter;