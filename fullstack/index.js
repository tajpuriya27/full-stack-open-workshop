const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: false,
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

const presentDate = new Date();
console.log(presentDate);
const noteCount = notes.length;

app.get("/", (req, res) => {
  res.send(
    "<h1>Exe 3.1 completed.</h1> <a href='http://localhost:3001/api/notes'>Click here for API</a>"
  );
});

app.get("/api/notes", (req, res) => {
  res.send(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    res.send(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    notes = notes.filter((note) => note.id !== id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

const generateId = () => Math.round(Math.random() * 1000);

app.post("/api/notes", (req, res) => {
  const sentData = req.body;
  //   console.log(sentData.content);
  if (!sentData.content) {
    return res.status(400).json({ error: "content missing!" });
  }
  const note = {
    id: generateId(),
    content: sentData.content,
    important: sentData.important,
  };
  notes = notes.concat(note);
  res.json(note);
});

// info route
app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${noteCount} people, <br/> ${presentDate}</p>`
  );
});

const PORT = process.env.PORT ? process.env.PORT : 3001;
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
