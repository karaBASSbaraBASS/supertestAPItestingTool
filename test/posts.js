import request from '../config/common';
import { expect } from 'chai';
import 'dotenv/config';
import {createRandomUser} from '../helpers/user-helper';

describe('Posts', () => {
    let createdPostId, createdUserId;
    const TOKEN = process.env.TOKEN;

    before( async ()=>{
        createdUserId = await createRandomUser();
    });

    describe('POST', () => {
        it.only('/posts can be created', async () => {
            const url = 'posts';
            let postData = {
                "user_id": createdUserId,
                "title": "My post title.",
                "body": "Degeneroe substantia. Ab theatrum animus. Dolores aqua conqueror. Tandem quibusdam consequatur. Thermae tactus apud. Vorago ater caterva."
            }
           
            const postReq = await request
                .post('posts/')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(postData);
            expect(postReq.body.code).to.be.eq(201);    
            expect(postReq.body.data).to.deep.include(postData);
            createdPostId = postReq.body.data.id
        });
    });
});