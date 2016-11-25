import {Request, Response, Router} from 'express';
import setting from '../Setting';
import UserController from '../Controllers/UserController';
import auth from '../Auth';

var UserRouter = Router();
var root = setting('service');

UserRouter.get(root + 'user/get', auth, (req: Request, res: Response) => {
    UserController.get(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

UserRouter.get(root + 'user/getAll', auth, (req: Request, res: Response) => {
    var query = JSON.parse(req.query.query);

    UserController.getAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

UserRouter.post(root + 'user/save', auth, (req: Request, res: Response) => {
    UserController.save(req.body).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

UserRouter.delete(root + 'user/delete', auth, (req: Request, res: Response) => {
    UserController.delete(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

UserRouter.post(root + 'user/authenticate', (req: Request, res: Response) => {
    UserController.authenticate(req.body.userName, req.body.password).then(result => {
        req.session['identity'] = { "name": result.name, "userName": result.userName, "token": setting('token') };
        res.status(200).send(req.session['identity']);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

UserRouter.get(root + 'user/getIdentity', auth, (req: Request, res: Response) => {
    res.status(200).send(req.session['identity']);
});

UserRouter.get(root + 'user/logout', auth, (req: Request, res: Response) => {
    req.session.destroy((err) => {
        res.status(200).send('Ok');
    });
});

export default UserRouter;