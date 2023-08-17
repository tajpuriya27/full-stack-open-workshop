const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config;
const Note = require("./models/note");
const app = express();

app.use(express.json());
app.use(express.static("dist"));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((result) => {
    response.json(result);
  });
});

// fetching single resources
app.get("/api/notes/:id", (request, response, next) => {
  const id = request.params.id;
  Note.findById(id)
    .then((note) => {
      note ? response.json(note) : response.status(404).send("wrong id");
    })
    .catch((err) => next(err));
});

// deleting single resources
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  Note.findByIdAndDelete(id)
    .then((res) => {
      console.log(res);
      res
        ? response.status(204).end()
        : response.status(404).send("already deleted!!");
    })
    .catch(() => {
      response.status(404).end();
    });
});

// adding data to server

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content is missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

// updating resource
app.put("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const body = request.body;
  Note.findByIdAndUpdate(id, body)
    .then((res) => {
      response.json(res);
    })
    .catch((error) => {
      response.status(404).send({ error: "malformated id" });
    });
});

// Error handling
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
