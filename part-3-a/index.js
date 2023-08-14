const express = require("express");
const app = express();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

// fetching single resources
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  note ? response.json(note) : response.status(404).end();
});

// deleting single resources
app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  let isNotePresent = false;
  notes = notes.filter((note) => {
    if (note.id === id) {
      isNotePresent = true;
      return false;
    } else {
      return true;
    }
  });

  isNotePresent ? response.status(204).end() : response.status(404).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
