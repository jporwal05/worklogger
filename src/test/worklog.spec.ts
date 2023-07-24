import chai, { expect } from 'chai';
import { app, appDataSource } from '../server';
import chaihttp from 'chai-http';
import { User } from '../entities/User';
import { Worklog } from '../entities/Worklog';
import { log } from 'console';

chai.use(chaihttp);

before((done) => {
    app.on("app-started-event", () => {
        done();
    });
});

describe('worklog', () => {
    afterEach(async () => {
        await appDataSource.getRepository(User).delete({});
        await appDataSource.getRepository(Worklog).delete({});
    });

    it('should signup, signin but should not log work if there is no log', (done) => {
        const testUser = {
            "username": "jp0505",
            "email": "some@email.com",
            "password": "jp0505"
        };
        // signup
        chai.request(app)
            .post("/auth/signup")
            .send(testUser)
            .end((err, res) => {
                expect(res).to.have.status(200);

                let token: string;
                // signin
                chai.request(app)
                    .post("/auth/signin")
                    .send(testUser)
                    .end((err2, res2) => {
                        token = res2.body.token;
                        expect(res2).to.have.status(200);

                        const worklog = {
                            date: "2023-07-21"
                        };
                        // logwork
                        chai.request(app)
                            .post('/worklog')
                            .send(worklog)
                            .auth(token, { type: 'bearer' })
                            .end((err3, res3) => {
                                expect(res3).to.have.status(400);
                                done();
                            });
                    });
            });
    });


    it('should signup, signin but should not log work if there is no date', (done) => {
        const testUser = {
            "username": "jp0505",
            "email": "some@email.com",
            "password": "jp0505"
        };
        // signup
        chai.request(app)
            .post("/auth/signup")
            .send(testUser)
            .end((err, res) => {
                expect(res).to.have.status(200);

                let token: string;
                // signin
                chai.request(app)
                    .post("/auth/signin")
                    .send(testUser)
                    .end((err2, res2) => {
                        token = res2.body.token;
                        expect(res2).to.have.status(200);

                        const worklog = {
                            log: ["did this", "did that"]
                        };
                        // logwork
                        chai.request(app)
                            .post('/worklog')
                            .send(worklog)
                            .auth(token, { type: 'bearer' })
                            .end((err3, res3) => {
                                expect(res3).to.have.status(400);
                                done();
                            });
                    });
            });
    });

    it('should signup, signin and log work', (done) => {
        const testUser = {
            "username": "jp0505",
            "email": "some@email.com",
            "password": "jp0505"
        };
        // signup
        chai.request(app)
            .post("/auth/signup")
            .send(testUser)
            .end((err, res) => {
                expect(res).to.have.status(200);

                let token: string;
                // signin
                chai.request(app)
                    .post("/auth/signin")
                    .send(testUser)
                    .end((err2, res2) => {
                        token = res2.body.token;
                        expect(res2).to.have.status(200);

                        const worklog = {
                            log: ["did this", "did that"],
                            date: "2023-07-21"
                        };
                        // logwork
                        chai.request(app)
                            .post('/worklog')
                            .send(worklog)
                            .auth(token, { type: 'bearer' })
                            .end((err3, res3) => {
                                expect(res3).to.have.status(200);
                                done();
                            });
                    });
            });
    });

    it('should signup, signin and get all work logs for a user', (done) => {
        const testUser = {
            "username": "jp0505",
            "email": "some@email.com",
            "password": "jp0505"
        };
        // signup
        chai.request(app)
            .post("/auth/signup")
            .send(testUser)
            .end((err, res) => {
                expect(res).to.have.status(200);

                let token: string;
                // signin
                chai.request(app)
                    .post("/auth/signin")
                    .send(testUser)
                    .end((err2, res2) => {
                        token = res2.body.token;
                        expect(res2).to.have.status(200);

                        const worklog = {
                            log: ["did this", "did that"],
                            date: "2023-07-21"
                        };
                        // get all worklogs
                        chai.request(app)
                            .get('/worklog')
                            .auth(token, { type: 'bearer' })
                            .end((err3, res3) => {
                                expect(res3).to.have.status(200);
                                done();
                            });
                    });
            });
    });
});