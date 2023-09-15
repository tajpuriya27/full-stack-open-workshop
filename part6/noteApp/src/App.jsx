import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeNotes } from "./reducers/noteReducer";
import NewNote from "./components/NewNote";
import Notes from "./components/Note";
import VisibilityFilter from "./components/VisibilityFilter";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
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
