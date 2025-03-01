import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

import { renderWithProvider } from "./helpers/renderWithProvider";


describe("addTask", () => {
  let input: HTMLElement;
  let button: HTMLElement;
  beforeEach(() => {
    renderWithProvider(
      <>
        <AddTask />
        <TaskList />
      </>
    );

    input = screen.getByLabelText("Add Task");
    button = screen.getByRole("button", { name: "Add" });
  });
  test("should add a task with correct text when the form is submitted", async () => {
    expect(screen.queryAllByTestId("task-item")).toHaveLength(0);

    await userEvent.type(input, "New Task");
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.queryAllByTestId("task-item")).toHaveLength(1);
      expect(screen.getByText("New Task")).toBeInTheDocument();
    });
  });
  test("should not add a task if input is empty", async () => {

    expect(screen.queryAllByTestId("task-item")).toHaveLength(0);

    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.queryAllByTestId("task-item")).toHaveLength(0);
    });
  });
});