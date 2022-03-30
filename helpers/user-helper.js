import supertest from 'supertest';
import 'dotenv/config';
const request = supertest('https://gorest.co.in/public-api/');
const TOKEN = process.env.TOKEN;

export const createRandomUser = async ()=>{
    let ts = Math.round((new Date()).getTime() / 1000);
    let generatedData = {
        "name": `testUser${ts}`,
        "email": `aligator${ts}@gmail.com`,
        "gender": "male",
        "status": "active"
    };
    const res = await request
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(generatedData);
    return res.body.data.id
};
