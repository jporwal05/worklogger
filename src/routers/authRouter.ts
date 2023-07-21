import express from 'express';
import Debug from 'debug';
import { User } from '../entities/User';
import { appDataSource } from '../server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// debug
const log = Debug('wl:authRouter');

// init router
const authRouter = express.Router();

// routes
authRouter.post('/signup', async (req, res) => {
    // set response header
    res.append('Content-Type', 'application/json; charset=UTF-8');

    const reqUser: User = req.body;

    // basic validation
    if (reqUser.username == null) {
        res.status(400);
        return res.json({ message: 'username is required' });
    }
    if (reqUser.password == null) {
        res.status(400);
        return res.json({ message: 'password is required' });
    }

    // check if already exists
    if ((await appDataSource.getRepository(User).findOne({ where: { username: reqUser.username } }))) {
        const message: string = `user ${reqUser.username} already exists`;
        log(message);
        res.status(409);
        return res.json({ message });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(reqUser.password, 10);
    reqUser.password = hashedPassword;

    // populate createdBy and lastModifiedBy
    reqUser.createdBy = reqUser.lastModifiedBy = reqUser.username;

    // save the user in database
    await appDataSource.getRepository(User).save(reqUser);

    log(`user ${reqUser.username} created`);

    return res.sendStatus(200);
});

authRouter.post('/signin', async (req, res) => {
    // set response header
    res.append('Content-Type', 'application/json; charset=UTF-8');

    const reqUser: User = req.body;

    // validate if username and password are present
    if (reqUser.username === null) {
        res.status(400);
        return res.json({ message: 'username is required' });
    }

    if (reqUser.password === null) {
        res.status(400);
        return res.json({ message: 'password is required' });
    }

    // validate from database
    const user = await appDataSource.getRepository(User).findOne({ where: { username: reqUser.username } });
    if (user === null) {
        const message: string = `user ${reqUser.username} not found`;
        log(message);
        res.status(404);
        return res.json({ message });
    } else if (!(await bcrypt.compare(reqUser.password, user.password))) {
        const message: string = `invalid password`;
        log(message);
        res.status(401);
        return res.json({ message });
    } else {
        // prepare and share jwt
        log(`user ${user.username} signed in`);
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: `user ${user.username} signed in`, token });
    }
});

export default authRouter;