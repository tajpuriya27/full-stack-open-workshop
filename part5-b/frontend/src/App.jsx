import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import "./index.css";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import NoteForm from "./components/NoteForm";
// console.log(noteService.getAll());

const App = () => {
  // useStates:
  const [notes, setNotes] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();
  const loginFormRef = useRef();

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
    const tokenExpire = window.localStorage.getItem("tokenExpiry");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
    if (new Date() > tokenExpire) {
      window.localStorage.removeItem("loggedNoteappUser");
      window.localStorage.removeItem("tokenExpiry");
      setUser(null);
    }
  }, []);

  //Adding new note via form submit
  const createNote = (noteToCreate) => {
    noteFormRef.current.toggleVisibility();
    noteService
      .create(noteToCreate)
      .then((response) => {
        // console.log(response);
        setNotes(notes.concat(response));
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
    loginFormRef.current.toggleVisibility();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      let tokenExpirationTime = 1 * 60 * 1000;
      let tokenExpiry = Date.now() + tokenExpirationTime;

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      window.localStorage.setItem("tokenExpiry", tokenExpiry);
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

  if (!notes) {
    return null;
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Click to login" ref={loginFormRef}>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  const noteForm = () => {
    return (
      <Togglable buttonLabel="Add note" ref={noteFormRef}>
        <NoteForm createNote={createNote} />
      </Togglable>
    );
  };

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
