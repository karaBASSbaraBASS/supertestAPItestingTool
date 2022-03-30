import request from '../config/common';
import { expect } from 'chai';
import 'dotenv/config';
import {createRandomUser} from '../helpers/user-helper';

describe('Posts', () => {
    let createdPostId, createdUserId;
    const TOKEN = process.env.TOKEN;
    let postData = {
        "user_id": 4,
        "title": "My post title.",
        "body": "Degeneroe substantia. Ab theatrum animus. Dolores aqua conqueror. Tandem quibusdam consequatur. Thermae tactus apud. Vorago ater caterva."
    }

    before( async ()=>{
        createdUserId = await createRandomUser();
        postData.user_id = createdUserId;
    });

    describe('POST', () => {
        it('/posts can be created', async () => {
            const url = 'posts';
            
           
            const postReq = await request
                .post('posts/')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(postData);
            expect(postReq.body.code).to.be.eq(201);    
            expect(postReq.body.data).to.deep.include(postData);
            createdPostId = postReq.body.data.id
        });
    });
    describe('POST negative tests', () => {
        it.only('/posts data validation error', async () => {
            const postReq = await request
                .post('posts/')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send("wrong data");
            expect(postReq.body.code).to.be.eq(422); 
        });
        it.only('/posts autentivation failed', async () => {
            const postReq = await request
                .post('posts/')
                .send(postData);
            expect(postReq.body.code).to.be.eq(401); 
            expect(postReq.body.data.message).to.be.eq("Authentication failed");
        });
    });
});