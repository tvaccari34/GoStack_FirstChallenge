const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;

  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs, techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === request.params.id)
  
  if(repositoryIndex < 0){
    return response.status(400).send();
  }

  const { title, url, techs } = request.body;

  const { likes }  = repositories[repositoryIndex];

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repositories[repositoryIndex]);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === request.params.id)

  if(repositoryIndex < 0){
    return response.status(400).send();
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === request.params.id)

  if(repositoryIndex < 0){
    return response.status(400).send();
  }

  const { title, url, techs }  = repositories[repositoryIndex];
  let { likes } = repositories[repositoryIndex];

  likes++;

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  }

  repositories[repositoryIndex] = repository;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
