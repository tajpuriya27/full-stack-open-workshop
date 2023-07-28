import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import "./index.css";
// console.log(noteService.getAll());

const App = () => {
  // useStates:
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [errMessage, setErrMessage] = useState(null);

  //UseEffect
  useEffect(() => {
    noteService
      .getAll()
      .then((res) => setNotes(res))
      .catch((err) => {
        setErrMessage(`Server is not seding data: ${err.message}`);
        console.log(err);
      });
  }, []);

  //Adding new note via form submit
  const addNote = (e) => {
    e.preventDefault();
    // console.log("Form submitted", e.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService.create(noteObject).then((response) => {
      // console.log(response);
      setNotes(notes.concat(response));
      setNewNote("");
    });
  };

  // Toggling importance
  const toggleImportance = (id) => {
    // console.log(`importance of ${id} need to be toggled!!!`);
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((n) => (n.id === id ? response : n)));
      })
      .catch((err) => {
        setErrMessage(`Note '${note.content}' was already removed from server`);
        setTimeout(() => {
          setErrMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
        console.log(err.message);
        // alert("Trying to update hardcoded value");
      });
  };

  // Taking input from input field and updating NewNote State.
  const handleChange = (e) => {
    // console.log("from handleChange fun", e.target.value);
    setNewNote(e.target.value);
  };

  // Customize Error Message using React component
  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errMessage} />
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleChange} />
        <button type="submit">click me</button>
      </form>
    </div>
  );
};

export default App;
