const request = require('supertest');
const app = require('../app');
require('../models');

test('GET /directors', async() => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /directors', async () => {
    const director = {
        firstName: "Marcos",
        lastName: "Marquez",
        nationality: "Estadounidense",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Penny_Marshall_1976.jpg/220px-Penny_Marshall_1976.jpg",
        brithday: "15 de octubre de 1943",
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(director.name);
});

test('PUT /directors/:id', async () => {
    const director = {
        firstName: "Marcos updated",
    }
    const res = await request(app).put('/directors/'+id).send(director);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(director.name);
});

test('DELETE /directors/:id', async () => {
    const res = await request(app).delete('/directors/'+id);
    expect(res.status).toBe(204);
}); 