import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {
  // console.log("App component rendered", props);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((res) => {
      console.log(res);
      setNotes(res.data);
    });
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    // console.log("Form submitted", e.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    axios.post("http://localhost:3001/notes", noteObject).then((response) => {
      // console.log(response);
      setNotes(notes.concat(response.data));
      setNewNote("");
    });
  };

  const handleChange = (e) => {
    console.log("from handleChange fun", e.target.value);
    setNewNote(e.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        <ul>
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </ul>
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleChange} />
        <button type="submit">click me</button>
      </form>
    </div>
  );
};

export default App;
