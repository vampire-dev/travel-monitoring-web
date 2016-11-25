import {Request, Response, Router} from 'express';
import setting from '../Setting';
import ClientController from '../Controllers/ClientController';
import auth from '../Auth';

var ClientRouter = Router();
var root = setting('service');

ClientRouter.get(root + 'client/get', auth, (req: Request, res: Response) => {
    ClientController.get(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

ClientRouter.get(root + 'client/getByDevice', auth, (req: Request, res: Response) => {
    var query = JSON.parse(req.query.query);
    ClientController.getByDevice(req.query.model, req.query.serial).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

ClientRouter.get(root + 'client/getAll', auth, (req: Request, res: Response) => {
    var query = JSON.parse(req.query.query);
    ClientController.getAll(query).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

ClientRouter.post(root + 'client/save', auth, (req: Request, res: Response) => {
    ClientController.save(req.body).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

ClientRouter.delete(root + 'client/delete', auth, (req: Request, res: Response) => {
    ClientController.delete(req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(exception => {
        res.status(500).send(exception.message);
    });
});

export default ClientRouter;