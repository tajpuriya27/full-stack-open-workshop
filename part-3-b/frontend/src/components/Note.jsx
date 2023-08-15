const Note = ({ note, toggleImportance, delFun }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={delFun}>Delete</button>
    </li>
  );
};

export default Note;
