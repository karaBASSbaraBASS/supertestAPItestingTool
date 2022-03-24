import supertest from 'supertest';
import { expect } from 'chai';
const request = supertest('https://gorest.co.in/public-api/');
const token = '900b1cd10fbc56af3630347fc0f4b402e7903e626c6293d1f49bc61f2af8bcee';
//Primary Token
//900b1cd10fbc56af3630347fc0f4b402e7903e626c6293d1f49bc61f2af8bcee

describe('Users', () => {
    it('GET /users', (done) => {
        request
            .get(`users?access-token=${token}`).end((err, res)=>{
                expect(res.body.data).to.not.be.empty;
                done()
            });
    });
})