import { useEffect } from "react";
import { useDispatch } from "react-redux";
import noteService from "./services/notes";
import { setNotes } from "./reducers/noteReducer";
import NewNote from "./components/NewNote";
import Notes from "./components/Note";
import VisibilityFilter from "./components/VisibilityFilter";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)));
  }, []);
  return (
    <>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </>
  );
};

export default App;
