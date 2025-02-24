import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../components/TaskItem";
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

describe("TaskItem Component", () => {
    test("should display the task text", () => {
        const task = { id: "id", text: "Test 1", completed: false };

        render(
            <TaskContext.Provider value={createMockContext()}>
                <TaskItem task={task} />
            </TaskContext.Provider>
        );

        expect(screen.getByText("Test 1")).toBeInTheDocument();
    });

    test("should call toggleTask when checkbox is clicked", () => {
        const toggleTaskMock = jest.fn();
        const task = { id: "id", text: "Test 2", completed: false };

        const mockContextValue = createMockContext({ toggleTask: toggleTaskMock });

        render(
            <TaskContext.Provider value={mockContextValue}>
                <TaskItem task={task} />
            </TaskContext.Provider>
        );

        const checkbox = screen.getByRole("checkbox");

        fireEvent.click(checkbox);

        expect(toggleTaskMock).toHaveBeenCalledWith(task.id);
    });

    test("should mark checkbox as checked if task is completed", () => {
        const task = { id: "id", text: "Test 3", completed: true };

        render(
            <TaskContext.Provider value={createMockContext()}>
                <TaskItem task={task} />
            </TaskContext.Provider>
        );

        const checkbox = screen.getByRole("checkbox");

        expect(checkbox).toBeChecked();
    });

    test("should mark checkbox as unchecked if task is not completed", () => {
        const task = { id: "id", text: "Test 4", completed: false };

        render(
            <TaskContext.Provider value={createMockContext()}>
                <TaskItem task={task} />
            </TaskContext.Provider>
        );

        const checkbox = screen.getByRole("checkbox");

        expect(checkbox).not.toBeChecked();
    });
});
