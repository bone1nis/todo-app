import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import AddTask from "../components/AddTask";
import { TaskContext, TaskContextType } from "../context/TaskContext";

const createMockContext = (overrides: Partial<TaskContextType> = {}): TaskContextType => ({
  tasks: [],
  activeTasks: 0,
  addTask: jest.fn(),
  toggleTask: jest.fn(),
  removeCompleted: jest.fn(),
  filter: "all",
  setFilter: jest.fn(),
  ...overrides,
});

describe("AddTask Component", () => {
  test("should call addTask with correct text when form is submitted", () => {
    const mockContextValue = createMockContext();

    render(
      <TaskContext.Provider value={mockContextValue}>
        <AddTask />
      </TaskContext.Provider>
    );

    const input = screen.getByLabelText("Add Task");
    const button = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    expect(mockContextValue.addTask).toHaveBeenCalledWith("New Task");
  });

  test("does not call addTask if input is empty", () => {
    const addTaskMock = jest.fn();
    const mockContextValue = createMockContext({ addTask: addTaskMock });

    render(
      <TaskContext.Provider value={mockContextValue}>
        <AddTask />
      </TaskContext.Provider>
    );

    const input = screen.getByLabelText("Add Task");
    const button = screen.getByRole("button", { name: "Add" });

    expect(input).toHaveValue("");
    fireEvent.click(button);

    expect(addTaskMock).not.toHaveBeenCalled();
  });
});
