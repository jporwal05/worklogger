import express from 'express';
import Debug from 'debug';
import { appDataSource } from '../server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Worklog } from '../entities/Worklog';

// log
const log = Debug('wl:worklogRouter');

// init router
const worklogRouter = express.Router();

// routes
worklogRouter.post('/', async (req, res) => {
    // extract data
    const worklog: Worklog = req.body;

    // basic validations
    if (!worklog) {
        log('no worklog');
        return res.status(400).send('data required');
    }
    if (!worklog.date) {
        log('no date');
        return res.status(400).send('date required');
    }
    if (!worklog.log || worklog.log.length === 0) {
        log('no log');
        return res.status(400).send('log required');
    }

    // set username
    worklog.createdBy = worklog.lastModifiedBy = worklog.username;

    // save the data in worklog collection
    try {
        await appDataSource.getRepository(Worklog).save(req.body);
        log('worklog saved');
    } catch (err) {
        log(err);
        if (err.code === 11000) {
            // duplicate entry
            return res.status(422).json({ message: 'entry for this date already exists' });
        }
        // some other error
        return res.status(422).json({ message: `error code ${err.code}` });
    }

    return res.sendStatus(200);

});


export default worklogRouter;