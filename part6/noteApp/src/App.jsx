import NewNote from "./components/NewNote";
import Notes from "./components/Note";

const App = () => {
  const filterSelected = (value) => {
    console.log(`Filter \`${value}\` is selected`);
  };
  return (
    <div>
      <input
        type="radio"
        value=""
        id="all"
        name="filterRadio"
        onChange={() => filterSelected("ALL")}
      />
      <label htmlFor="all">All</label>
      <label>
        <input
          type="radio"
          value=""
          name="filterRadio"
          onChange={() => filterSelected("IMPORTANT")}
        />
        Important Only
      </label>
      <label>
        <input
          type="radio"
          value=""
          name="filterRadio"
          onChange={() => filterSelected("NOT-IMPORTANT")}
        />
        Not-Important Only
      </label>

      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
