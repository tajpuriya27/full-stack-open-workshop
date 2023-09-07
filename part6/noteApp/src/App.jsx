import NewNote from "./components/NewNote";
import Notes from "./components/Note";
import VisibilityFilter from "./components/VisibilityFilter";
const App = () => {
  return (
    <>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </>
  );
};

export default App;
