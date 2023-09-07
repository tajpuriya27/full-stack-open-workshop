import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceof } from "../reducers/noteReducer";

// Note component is presentational in React terminology as is not aware that the event handler it gets as props dispatches an action.
const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? "important" : ""}</strong>
    </li>
  );
};

// Notes component is called  container component, as it contains some application logic
const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note);

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceof(note.id))}
        />
      ))}
    </ul>
  );
};

export default Notes;
