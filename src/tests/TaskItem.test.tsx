import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TaskContext, TaskContextType } from "../context/TaskContext";
import { Task } from "../type";

import TaskItem from "../components/TaskItem";


const createMockContext = (): TaskContextType => ({
    tasks: [],
    activeTasks: 0,
    addTask: jest.fn(),
    toggleTask: jest.fn(),
    removeCompleted: jest.fn(),
    filter: "all",
    setFilter: jest.fn()
});

const renderTaskItem = (task: Task, contextValue: TaskContextType) => {
    return render(
        <TaskContext.Provider value={contextValue}>
            <TaskItem task={task} />
        </TaskContext.Provider>
    );
};

describe("TaskItem", () => {
    let mockContextValue: TaskContextType;

    beforeEach(() => {
        mockContextValue = createMockContext();
    });

    test("should call toggleTask when checkbox is clicked", async () => {
        const task: Task = { id: "id", text: "Test Task", completed: false };

        renderTaskItem(task, mockContextValue);

        const checkbox = screen.getByRole("checkbox");
        await userEvent.click(checkbox);

        expect(mockContextValue.toggleTask).toHaveBeenCalledTimes(1);
        expect(mockContextValue.toggleTask).toHaveBeenCalledWith(task.id);
    });

    test("should render completed task correctly", () => {
        const completedTask: Task = { id: "id", text: "Completed Task", completed: true };

        renderTaskItem(completedTask, mockContextValue);

        expect(screen.getByRole("checkbox")).toBeChecked();
        expect(screen.getByText(completedTask.text)).toBeInTheDocument();
    });

    test("should render active task correctly", () => {
        const activeTask: Task = { id: "id", text: "Active Task", completed: false };

        renderTaskItem(activeTask, mockContextValue);

        expect(screen.getByRole("checkbox")).not.toBeChecked();
        expect(screen.getByText(activeTask.text)).toBeInTheDocument();
    });

    test("should display correct task text", () => {
        const task: Task = { id: "id", text: "Some Task", completed: false };

        renderTaskItem(task, mockContextValue);

        expect(screen.getByText(task.text)).toBeInTheDocument();
    });
});
