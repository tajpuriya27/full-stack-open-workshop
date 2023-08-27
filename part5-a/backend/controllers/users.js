const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const allUser = await User.find({}).populate("notes", {
      content: 1,
      important: 1,
    });
    // const allUser = await User.find({});
    res.json(allUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
