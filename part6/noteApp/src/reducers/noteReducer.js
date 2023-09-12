import { createSlice } from "@reduxjs/toolkit";

// const initialState = [
//   {
//     content: "reducer defines how redux store works",
//     important: true,
//     id: 1,
//   },
//   {
//     content: "state of store can contain any data",
//     important: false,
//     id: 2,
//   },
// ];

// const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, action) {
      const content = action.payload;
      state.push({
        content,
        important: false,
      });
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

// const noteReducer = (state = initialState, action) => {
//   console.log(`Logging from NoteReducer:: state: ${state}, action:`, action);
//   switch (action.type) {
//     case "NEW_NOTE": {
//       return state.concat(action.payload);
//     }
//     case "TOGGLE_IMPORTANCE": {
//       return state.map((note) =>
//         note.id === action.payload.id
//           ? { ...note, important: !note.important }
//           : note
//       );
//     }
//     default:
//       return state;
//   }
// };

// export const createNote = (content) => {
//   return {
//     type: "NEW_NOTE",
//     payload: {
//       content,
//       important: false,
//       id: generateId(),
//     },
//   };
// };

// export const toggleImportanceof = (id) => {
//   return {
//     type: "TOGGLE_IMPORTANCE",
//     payload: { id },
//   };
// };

// export default noteReducer;
console.log("From ntoeREducer end", noteSlice);
export const { createNote, toggleImportanceOf, appendNote, setNotes } =
  noteSlice.actions;
export default noteSlice.reducer;
