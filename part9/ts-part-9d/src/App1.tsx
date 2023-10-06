import { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";

interface Note {
  id: number;
  content: string;
}

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((res) => setNotes(res.data));
  }, []);

  const noteCreation = (event: SyntheticEvent) => {
    event.preventDefault();
    axios
      .post<Note>("http://localhost:3001/notes", { content: newNote })
      .then((result) => setNotes([...notes, result.data]));
    setNewNote("");
  };

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
