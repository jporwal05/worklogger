import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import Debug from 'debug';

// database
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import authRouter from './routers/authRouter';
import worklogRouter from './routers/worklogRouter';
import { Worklog } from './entities/Worklog';
import { WlUniqueIndex1689830330780 } from './migrations/1689830330780-wlUniqueIndex';
import authenticator from './middleware/authenticator';

// env
dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT;
const APPLICATION_NAME = process.env.APPLICATION_NAME;
const DB_URL = process.env.DB_URL;
const DB_SYNCHRONIZE = process.env.DB_SYNCHRONIZE === 'true';
const DB_LOGGING = process.env.DB_LOGGING === 'true';

// debug
const log = Debug('wl:server');
const logError = Debug('wl:server:error');

// data-source preparation
const appDataSource = new DataSource({
    type: "mongodb",
    url: DB_URL,
    entities: [User, Worklog],
    migrations: [WlUniqueIndex1689830330780],
    migrationsTableName: "wl_migration_table",
    useNewUrlParser: true,
    synchronize: DB_SYNCHRONIZE,
    logging: DB_LOGGING,
})

// init data-source
appDataSource
    .initialize()
    .then(() => {
        log('successfully initialized datasource');

        // init express
        log('starting server');
        const app = express()
        app.use(express.json());

        // init middlewares
        app.use(authenticator);

        // init routes
        app.use('/auth', authRouter);
        app.use('/logwork', worklogRouter);

        app.listen(SERVER_PORT, () => {
            log(`${APPLICATION_NAME} listening on port ${SERVER_PORT}`);
        })
    })
    .catch((err) => {
        logError(`could not initialize datasource`, err);
    });

export default appDataSource;