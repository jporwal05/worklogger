import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Debug from "debug";

// log
const log = Debug('wl:authenticator');

const authenticator = (req: Request, res: Response, next: NextFunction) => {
    if (req.path.includes('/signup') || req.path.includes('/signin')) {
        return next();
    }


    let isWorklog = false;
    if (req.path === '/worklog') {
        isWorklog = true;
    }

    // authenticate user
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('unauthorized');
    }
    jwt.verify(token, process.env.JWT_SECRET!, (err, payload: JwtPayload) => {
        if (err) {
            return res.status(401).send('unauthorized');
        }

        // TODO: verify against the database once again
        //  as someone might delete the user after the token is generated

        if (isWorklog) {
            if (req.method === 'GET') {
                req.query.username = payload.username;
            } else if (req.method === 'POST') {
                req.body.username = payload.username;
            }
        }
    });

    next();
}

export default authenticator;