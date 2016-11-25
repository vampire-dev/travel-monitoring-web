import {Request, Response, Router} from 'express';

export default (req: Request, res: Response, next) => {
    if (!req.session['identity'])
        return res.status(401).send('You are not logged in');

    return next();
}