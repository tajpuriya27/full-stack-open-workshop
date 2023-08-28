import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import "./index.css";
import loginService from "./services/login";
// console.log(noteService.getAll());

const App = () => {
  // useStates:
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [errMessage, setErrMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  //Adding new note via form submit
  const addNote = (e) => {
    e.preventDefault();
    // console.log("Form submitted", e.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService
      .create(noteObject)
      .then((response) => {
        // console.log(response);
        setNotes(notes.concat(response));
        setNewNote("");
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        setErrMessage(err.response.data.error);
        if (err.response.data.error === "token expired") {
          window.localStorage.removeItem("loggedNoteappUser");
          setUser(null);
        }
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

  // Delete the note
  const delFun = (id) => {
    noteService
      .del(id)
      .then(() => {
        setNotes(notes.filter((n) => n.id !== id));
      })
      .catch((err) => {
        setErrMessage(`Delete error: ${err.message}!! Removed from front-end.`);
        setTimeout(() => {
          setErrMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
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

  // Handle login
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrMessage("Wrong credentials");
      setTimeout(() => {
        setErrMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleChange} />
      <button type="submit">save</button>
    </form>
  );

  if (!notes) {
    return null;
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}

      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
            delFun={() => delFun(note.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
