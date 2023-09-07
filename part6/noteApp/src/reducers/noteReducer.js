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

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceof = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: { id },
  };
};

export default noteReducer;
