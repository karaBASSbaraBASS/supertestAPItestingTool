import supertest from 'supertest';
import 'dotenv/config';
import faker from 'faker';
const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = process.env.TOKEN;

export const createRandomUser = async ()=>{
    let generatedData = {
        "name": faker.name.firstName(),
        "email": faker.internet.email(),
        "gender": "male",
        "status": "active"
    };
    
    const res = await request
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(generatedData);
    return res.body.data.id
};
