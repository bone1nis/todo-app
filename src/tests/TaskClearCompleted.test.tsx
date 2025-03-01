import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import TaskClearCompleted from "../components/TaskClearCompleted";

import { renderWithProvider } from "./helpers/renderWithProvider";

describe("TaskClearCompleted", () => {
  let input: HTMLElement;
  let addButton: HTMLElement;
  let completedButton: HTMLElement;
  beforeEach(() => {
    renderWithProvider(
      <>
        <AddTask />
        <TaskList />
        <TaskClearCompleted />
      </>
    );

    input = screen.getByLabelText("Add Task");
    addButton = screen.getByRole("button", { name: "Add" });
    completedButton = screen.getByRole("button", { name: "Clear completed" });
  });

  test("should not show any tasks if all tasks are completed and cleared", async () => {
    await userEvent.type(input, "Completed Task");
    await userEvent.click(addButton);

    const checkboxes = screen.getAllByRole("checkbox");
    await userEvent.click(checkboxes[0]);

    await userEvent.click(completedButton);

    expect(screen.queryByText("Completed Task")).not.toBeInTheDocument();
  });
  test("should clear completed tasks when 'Clear completed' button is clicked", async () => {

    await userEvent.type(input, "Active Task");
    await userEvent.click(addButton);

    userEvent.clear(input);

    await userEvent.type(input, "Completed Task");
    await userEvent.click(addButton);

    expect(screen.getAllByTestId("task-item")).toHaveLength(2);

    const checkboxes = screen.getAllByRole("checkbox");
    await userEvent.click(checkboxes[1]);

    expect(screen.getByText("Active Task")).toBeInTheDocument();
    expect(screen.getByText("Completed Task")).toBeInTheDocument();

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();

    await userEvent.click(completedButton);

    expect(screen.queryByText("Completed Task")).not.toBeInTheDocument();

    expect(screen.getAllByTestId("task-item")).toHaveLength(1);

    expect(screen.getByText("Active Task")).toBeInTheDocument();
  });
});
