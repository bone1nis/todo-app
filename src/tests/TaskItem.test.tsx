import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TaskItem from "../components/TaskItem";
import { TaskContext, TaskContextType } from "../context/TaskContext";
import { Task } from "../type";

const createMockContext = (): TaskContextType => ({
    tasks: [],
    activeTasks: 0,
    addTask: jest.fn(),
    toggleTask: jest.fn(),
    removeCompleted: jest.fn(),
    filter: "all",
    setFilter: jest.fn()
});

describe("TaskItem", () => {

    let mockContextValue: TaskContextType;

    beforeEach(() => {
        mockContextValue = createMockContext();
    });

    test("should call toggleTask when checkbox is clicked", async () => {
        const task: Task = { id: "id", text: "Test Task", completed: false };

        render(
            <TaskContext.Provider value={mockContextValue}>
                <TaskItem task={task} />
            </TaskContext.Provider>
        );

        const checkbox = screen.getByRole("checkbox");

        await userEvent.click(checkbox);

        expect(mockContextValue.toggleTask).toHaveBeenCalledWith("id");
    });

    test("should render completed task correctly", () => {
        const completedTask: Task = { id: "id", text: "Completed Task", completed: true };

        render(
            <TaskContext.Provider value={mockContextValue}>
                <TaskItem task={completedTask} />
            </TaskContext.Provider>
        );

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeChecked();
    });

    test("should render active task correctly", () => {
        const activeTask: Task = { id: "id", text: "Active Task", completed: false };

        render(
            <TaskContext.Provider value={mockContextValue}>
                <TaskItem task={activeTask} />
            </TaskContext.Provider>
        );

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
    });
});
