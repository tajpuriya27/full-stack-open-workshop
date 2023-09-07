import React from "react";
import { createRoot } from "react-dom/client";
import { createStore } from "redux";

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE": {
      return state.concat(action.payload);
    }
    case "TOGGLE_IMPORTANCE": {
      console.log(state);

      return state.map((note) =>
        note.id === action.payload.id
          ? { ...note, important: !note.important }
          : note
      );
    }
    default:
      return state;
  }
};

const store = createStore(noteReducer);

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "the app state is in redux store",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const App = () => {
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    store.dispatch({
      type: "NEW_NOTE",
      payload: {
        content,
        important: false,
        id: generateId(),
      },
    });
  };

  const toggleImportanceOf = (id) => {
    store.dispatch({
      type: "TOGGLE_IMPORTANCE",
      payload: { id },
    });
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id} onClick={() => toggleImportanceOf(note.id)}>
            {note.content} <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
store.subscribe(() => {
  root.render(<App storeToSubscribe={store} />);
});
