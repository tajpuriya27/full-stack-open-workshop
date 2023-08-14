# Fullstack Open

## Part 3.a - Node.js and Express

### `Part3.1` : Code commited on part3.1 - simple webserver with node's inbuilt http library.

```js
const http = require("http");

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

const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(notes));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
```

### `part3.2` Simple webserver with express.js

```js
const express = require("express");
const app = express();

... notes

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

...
```

### Part3.3 fetching single resources using express params

```js
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  response.json(note);
});
```

### Part3.4 Error handling if tried to fetch wrong resource

```diff
app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
+ note ? response.json(note) : response.status(404).end();
});
```

### Part3.5 Deleting single resource and handling error if wrong resource id is provided.

```js
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
```

### Part3.6 Adding data to the server and generating id

> Use of POST route.  
>  use of spread operator i.e. three dots... - special focus!!

```js
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content is missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});
```

---

    END OF WORKSHOP PART 3.A
