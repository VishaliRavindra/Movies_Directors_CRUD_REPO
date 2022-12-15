const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "moviesData.db");
const app = express();
app.use(express.json());
let db = null;
initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log(
        "server is successfully connected to https://localhost:3000/"
      );
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();

const convertDbObjectToResponseObject = (dbObject) => {
  return {
    movieName: dbObject.movie_name,
  };
};

api.get("/movies/", async (request, response) => {
  const getMovieQuery = `
    SELECT 
        * 
    FROM
        movie;`;
  const movieList = await db.all(getMovieQuery);
  response.send(
    movieList.map((eachMovie) => convertDbObjectToResponseObject(eachMovie))
  );
});

module.exports = app;
