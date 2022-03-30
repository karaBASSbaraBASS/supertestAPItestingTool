import request from '../config/common';
import { expect } from 'chai';
import 'dotenv/config';

const TOKEN = process.env.TOKEN;
let ts = Math.round((new Date()).getTime() / 1000);
let generatedData = {
    "name": `testUser${ts}`,
    "email": `aligator${ts}@gmail.com`,
    "gender": "male",
    "status": "active"
};
const editedStatus = {
    "status": "inactive"
};

describe('Users', () => {
let createdUserId;

    describe('POST', () => {
        it('/user can be created', async () => {
            const url = 'users';
            const res = await request
                .post(url)
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(generatedData);
            expect(res.body.code).to.be.eq(201);
            // generatedData.email = "ololo.com"
            // deep will iterate assertions
            expect(res.body.data).to.deep.include(generatedData);
            createdUserId = res.body.data.id;
        });
    });
    describe('GET', () => {
        it('/users', async () => {
            const res = await request
                .get(`users`);
            expect(res.body.data).to.not.be.empty;
        });

        it('/users with paramrters', async () => {
            const url = 'users?page=5&gender=female&status=active';

            const res = await request
                .get(url);
            expect(res.body.data).to.not.be.empty;
            expect(res.body.meta.pagination.page).to.be.eq(5);
            res.body.data.forEach(element => {
                expect(element.gender).to.eq('female');
                expect(element.status).to.eq('active');
            });
        });
    });
    describe('PUT', () => {
        it('/user:id can be edited', async () => {
            const url = `users/${createdUserId}`;

            const res = await request
                .put(url)
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(editedStatus);
            expect(res.body.code).to.be.eq(200);
            expect(res.body.data.status).to.be.eq(editedStatus.status);
        });
    });
    describe('DELETE', () => {
        it('/users', async () => {
            const url = `users/${createdUserId}`;

            const res = await request
                .delete(url)
                .set('Authorization', `Bearer ${TOKEN}`);
            expect(res.body.code).to.be.eq(204);
            expect(res.body.data).to.be.eq(null);
        });
    });
});