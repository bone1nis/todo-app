import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskFilters from "../components/TaskFilters";
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

describe("TaskFilters Component", () => {
    test("should update filter when 'All' button is clicked", () => {
        const setFilterMock = jest.fn();
        const mockContextValue = createMockContext({ filter: "active", setFilter: setFilterMock });

        render(
            <TaskContext.Provider value={mockContextValue}>
                <TaskFilters />
            </TaskContext.Provider>
        );

        const allButton = screen.getByRole("button", { name: "All" });

        fireEvent.click(allButton);

        expect(setFilterMock).toHaveBeenCalledWith("all");
    });

    test("should update filter when 'Active' button is clicked", () => {
        const setFilterMock = jest.fn();
        const mockContextValue = createMockContext({ filter: "completed", setFilter: setFilterMock });

        render(
            <TaskContext.Provider value={mockContextValue}>
                <TaskFilters />
            </TaskContext.Provider>
        );

        const activeButton = screen.getByRole("button", { name: "Active" });

        fireEvent.click(activeButton);

        expect(setFilterMock).toHaveBeenCalledWith("active");
    });

    test("should update filter when 'Completed' button is clicked", () => {
        const setFilterMock = jest.fn();
        const mockContextValue = createMockContext({ filter: "all", setFilter: setFilterMock });

        render(
            <TaskContext.Provider value={mockContextValue}>
                <TaskFilters />
            </TaskContext.Provider>
        );

        const completedButton = screen.getByRole("button", { name: "Completed" });

        fireEvent.click(completedButton);

        expect(setFilterMock).toHaveBeenCalledWith("completed");
    });
});
