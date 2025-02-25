import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import AddTask from "../components/AddTask";
import TaskProvider from "../context/TaskProvider";
import TaskList from "../components/TaskList";


describe("TaskProvider", () => {
  test("should add a task with correct text when the form is submitted", async () => {
    const { rerender } = render(
      <TaskProvider>
        <AddTask />
        <TaskList />
      </TaskProvider>
    );

    const input = screen.getByLabelText("Add Task");
    const button = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    rerender(
      <TaskProvider>
        <AddTask />
        <TaskList />
      </TaskProvider>
    );

    const task = await screen.findByText("New Task");

    expect(task).toBeInTheDocument();
  });
  test("should does not add a task if input is empty", () => {
    render(
      <TaskProvider>
        <AddTask />
        <TaskList />
      </TaskProvider>
    );

    const input = screen.getByLabelText("Add Task");
    const button = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(screen.queryByText("New Task")).toBeNull();
  });
});