import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskClearCompleted from "../components/TaskClearCompleted";
import { TaskContext, TaskContextType } from "../context/TaskContext";

const mockRemoveCompleted = jest.fn();

const mockContextValue: TaskContextType = {
  tasks: [],
  activeTasks: 0,
  addTask: jest.fn(),
  toggleTask: jest.fn(),
  removeCompleted: mockRemoveCompleted,
  filter: "all",
  setFilter: jest.fn(),
};

describe("TaskClearCompleted component", () => {
  test("renders the button with correct text", () => {
    render(
      <TaskContext.Provider value={mockContextValue}>
        <TaskClearCompleted />
      </TaskContext.Provider>
    );

    const button = screen.getByRole("button", { name: "Clear completed" });
    expect(button).toBeInTheDocument();
  });

  test("calls removeCompleted when the button is clicked", () => {
    render(
      <TaskContext.Provider value={mockContextValue}>
        <TaskClearCompleted />
      </TaskContext.Provider>
    );

    const button = screen.getByRole("button", { name: "Clear completed" });
    fireEvent.click(button);

    expect(mockRemoveCompleted).toHaveBeenCalled();
  });
});
