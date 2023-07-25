import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  console.log("App component rendered", props);
  const [notes, setNotes] = useState(props.notes);
  const addNote = (e) => {
    e.preventDefault();
    console.log("Form submitted", e.target);
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
        <button type="submit">click me</button>
      </form>
    </div>
  );
};

export default App;
