const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Actor.belongsToMany(Movie, {through: "ActorsMovies"});
Movie.belongsToMany(Actor, {through: "ActorsMovies"});

Director.belongsToMany(Movie, {through: "DirectorsMovies"});
Movie.belongsToMany(Director, {through: "DirectorsMovies"});

Genre.belongsToMany(Movie, {through: "MoviesGenres"});
Movie.belongsToMany(Genre, {through: "MoviesGenres"});