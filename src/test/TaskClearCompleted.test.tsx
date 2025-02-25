import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import TaskProvider from "../context/TaskProvider";
import TaskClearCompleted from "../components/TaskClearCompleted";

describe("TaskClearCompleted", () => {
  test("should clear completed tasks when 'Clear completed' button is clicked", async () => {
    render(
      <TaskProvider>
        <AddTask />
        <TaskList />
        <TaskClearCompleted />
      </TaskProvider>
    );

    const input = screen.getByLabelText("Add Task");
    const addButton = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "Active Task" } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: "Completed Task" } });
    fireEvent.click(addButton);

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);

    expect(screen.getByText("Active Task")).toBeInTheDocument();
    expect(screen.getByText("Completed Task")).toBeInTheDocument();

    const completedButton = screen.getByRole("button", { name: "Clear completed" });
    fireEvent.click(completedButton);

    await waitFor(() => {
      expect(screen.queryByText("Completed Task")).not.toBeInTheDocument();
    });
    expect(screen.queryByText("Active Task")).toBeInTheDocument();
  });
});
