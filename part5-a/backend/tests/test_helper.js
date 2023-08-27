const Note = require("../models/note");
const User = require("../models/user");

const initialNotes = [
  {
    content: "Notes created for testing purpose 00",
    important: false,
  },
  {
    content: "Notes created for testing purpose 01",
    important: true,
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: "willremovethissoon" });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
};
