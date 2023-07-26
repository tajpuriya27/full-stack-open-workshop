import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

console.log(noteService);

const App = () => {
  // console.log("App component rendered", props);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    noteService.getAll().then((res) => {
      // console.log(res);
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
    noteService.create(noteObject).then((response) => {
      // console.log(response);
      setNotes(notes.concat(response.data));
      setNewNote("");
    });
  };

  const toggleImportance = (id) => {
    // console.log(`importance of ${id} need to be toggled!!!`);
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(id, changedNote).then((response) => {
      setNotes(notes.map((n) => (n.id === id ? response.data : n)));
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
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportance(note.id)}
            />
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
