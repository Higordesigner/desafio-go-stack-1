const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());

app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0,
  }
  repositories.push(repository);
  return response.json(repository); 
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body
  const FindRepositoryIndex = repositories.findIndex(repository => repository.id == id);
  if(FindRepositoryIndex == -1){
    return response.status(400).json({erro:'REPOSITORY NAO EXISTE'});
  }
  const repository = {
      id,
      title,
      url,
      techs,
  };
  repositories[FindRepositoryIndex] = repository;
  return response.json([repository]);
});

app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const FindRepositoryIndex = repositories.findIndex(repository => repository.id == id);
    if(FindRepositoryIndex >= 0 ){
      repositories.splice(FindRepositoryIndex, 1);
    }else{
      return response.status(400).json({error: 'Repository not exists'});
    }
    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const FindRepositoryIndex = repositories.findIndex(repository => 
    repository.id == id
    );
    if(FindRepositoryIndex == -1){
      return response.status(400).json({ error: 'Repositorio não existe'});
    }

    repositories[FindRepositoryIndex].likes+=1;

  return response.json(repositories[FindRepositoryIndex]);
  
});

module.exports = app;
