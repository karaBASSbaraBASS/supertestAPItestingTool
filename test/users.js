import supertest from 'supertest';
import { expect } from 'chai';
const request = supertest('https://gorest.co.in/public-api/');
const token = '900b1cd10fbc56af3630347fc0f4b402e7903e626c6293d1f49bc61f2af8bcee';
let ts = Math.round((new Date()).getTime() / 1000);
let generatedData = {
    "name": `testUser${ts}`,
    "email": `aligator${ts}@gmail.com`,
    "gender": "male",
    "status": "active"
};

describe('Users', () => {
    it('GET /users', () => {
        return request
            .get(`users`).then((res)=>{
                expect(res.body.data).to.not.be.empty;
            });
    });
    // it('GET /users:id', () => {
    //     return request
    //         .get(`users/2555`).then((res)=>{
    //             expect(res.body.data.id).to.be.eq(2555);
    //         });
    // });

    it('GET /users with paramrters', () => {
        const url = 'users?page=5&gender=female&status=active';

        return request
            .get(url).then((res)=>{
                expect(res.body.data).to.not.be.empty;
                expect(res.body.meta.pagination.page).to.be.eq(5);
                res.body.data.forEach(element => {
                    expect(element.gender).to.eq('female');
                    expect(element.status).to.eq('active');
                });
            });
    });

    it('POST /user can be created', () => {
        const url = 'users';

        return request
            .post(url)
            .set('Authorization', `Bearer ${token}`)
            .send(generatedData)
            .then((res)=>{
                expect(res.body.code).to.be.eq(201);
                // generatedData.email = "ololo.com"
                // deep will iterate assertions
                expect(res.body.data).to.deep.include(generatedData);
            });
    });
})