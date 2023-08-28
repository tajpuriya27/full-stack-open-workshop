const NoteForm = (props) => {
  const { newNote, addNote, handleChange } = props;
  return (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleChange} />
      <button type="submit">save</button>
    </form>
  );
};

export default NoteForm;
