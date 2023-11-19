const request = require('supertest');
const app = require('../app');
require('../models');

test('GET /actors', async() => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /actors', async () => {
    const actor = {
        firstName: "Thomas",
        lastName: "Hanks",
        nationality: "Estadounidense",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Tom_Hanks_2016.jpg/220px-Tom_Hanks_2016.jpg",
        brithday: "9 de julio de 1956",
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(actor.name);
});

test('PUT /actors/:id', async () => {
    const actor = {
        firstName: "Thomas updated",
    }
    const res = await request(app).put('/actors/'+id).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actor.name);
});

test('DELETE /actors/:id', async () => {
    const res = await request(app).delete('/actors/'+id);
    expect(res.status).toBe(204);
});