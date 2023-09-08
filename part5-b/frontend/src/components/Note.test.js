import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./Note";

test("renders content", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  // render(<Note note={note} />);
  // screen.debug();

  // const element = screen.getByText(
  //   "Component testing is done with react-testing-library"
  // );
  // expect(element).toBeDefined();

  const { container } = render(<Note note={note} />);

  const div = container.querySelector(".note");
  screen.debug(div);
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
});

test("renders content1", async () => {
  const note = {
    content: "Does not work anymore :(",
    important: true,
  };

  render(<Note note={note} />);

  // const element = screen.getByText("Does not work anymore :(", {
  //   exact: false,
  // });
  const element = await screen.findByText("Does not work anymore :(");

  expect(element).toBeDefined();
});

test("clicking the button calls event handler once", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const mockHandler = jest.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("does not render this", () => {
  const note = {
    content: "This is a reminder",
    important: true,
  };

  render(<Note note={note} />);

  const element = screen.queryByText("do not want this thing to be rendered");
  expect(element).toBeNull();
});
