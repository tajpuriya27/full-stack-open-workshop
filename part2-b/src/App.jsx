import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  console.log("App component rendered", props);
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");

  const addNote = (e) => {
    e.preventDefault();
    console.log("Form submitted", e.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    if (newNote) {
      setNotes(notes.concat(noteObject));
    }

    setNewNote("");
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
