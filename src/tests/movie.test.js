const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');

require('../models');

let id;

test('GET /movies', async() => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /movies', async () => {
    const movie = {
        name: "Big",
        image: "https://img.maspormas.com/2016/04/peli-poster.jpg",
        synopsis: "Relata la historia de Josh Baskin, un niño que pide el deseo de ser mayor y luego al día siguiente, se convierte en un adulto de 30 años de edad.",
        releaseYear: "1988"
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
});

test('PUT /movies/:id', async () => {
    const movie = {
        name: "Big updated",
    }
    const res = await request(app).put('/movies/'+id).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test('POST /movies/:id/genres', async () => {
    const genre = await Genre.create({ name: "Comedia update" });
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/actors', async () => {
    const actor = await Actor.create({
        firstName: "Thomas",
        lastName: "Hanks",
        nationality: "Estadounidense",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Tom_Hanks_2016.jpg/220px-Tom_Hanks_2016.jpg",
        brithday: "9 de julio de 1956",
    });
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/directors', async () => {
    const director = await Director.create({
        firstName: "Michael J.",
        lastName: "Bassett",
        nationality: "Británica",
        image: "https://images.fandango.com/ImageRenderer/400/0/redesign/static/img/default_poster.png/0/images/masterrepository/performer%20images/45252/silenthillrevelation-pm-6.jpg",
        brithday: "15 de mayo de 1985"
    });
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
 
test('DELETE /movies/:id', async () => {
    const res = await request(app).delete('/movies/'+id);
    expect(res.status).toBe(204);
});