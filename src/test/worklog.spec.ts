import chai, { expect } from 'chai';
import { app } from '../server';
import chaihttp from 'chai-http';
import Debug from 'debug';

const log = Debug('wl:test:worklog');

chai.use(chaihttp);

before((done) => {
    app.on("app-started-event", () => {
        done();
    });
});

// TODO: will have to use a dummy database for this purpose
// https://stackoverflow.com/questions/59858287/testing-jwt-authentication-using-mocha-and-chai

/* describe('/POST logwork', () => {
    it('it should not POST a work log if there is no log', (done) => {
        const worklog = {
            date: "2023-07-21",
            username: "someUsername"
        }
        chai.request(app)
            .post('/logwork')
            .send(worklog)
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });
}) */