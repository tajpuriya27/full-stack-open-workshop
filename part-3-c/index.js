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
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  Note.findById(id)
    .then((note) => {
      note ? response.json(note) : response.status(404).send("wrong id");
    })
    .catch((err) => {
      console.log("error");
      response.status(404).send(err);
    });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
