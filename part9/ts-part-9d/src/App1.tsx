import { SyntheticEvent, useState } from "react";
interface Note {
  id: number;
  content: string;
}

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([{ id: 1, content: "testing" }]);

  const noteCreation = (event: SyntheticEvent) => {
    event.preventDefault();
    setNotes([...notes, { id: notes.length + 1, content: newNote }]);
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
