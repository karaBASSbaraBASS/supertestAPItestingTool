import supertest from 'supertest';
import { expect } from 'chai';
const request = supertest('https://gorest.co.in/public-api/');
const token = '900b1cd10fbc56af3630347fc0f4b402e7903e626c6293d1f49bc61f2af8bcee';

const postData = {
    "user_id": 8,
    "title": "My post title.",
    "body": "Degeneroe substantia. Ab theatrum animus. Dolores aqua conqueror. Tandem quibusdam consequatur. Thermae tactus apud. Vorago ater caterva."
}

describe('Posts', () => {
let createdPostId

    describe('POST', () => {
        it.only('/posts can be created', async () => {
            const url = 'posts';
            const req = await request
                .post(url)
                .set('Authorization', `Bearer ${token}`)
                .send(postData);
            expect(req.body.code).to.be.eq(201);    
            expect(req.body.data).to.deep.include(postData);
            createdPostId = req.body.data.id
        });
    });
});