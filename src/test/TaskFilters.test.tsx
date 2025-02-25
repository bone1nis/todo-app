import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import TaskProvider from "../context/TaskProvider";
import TaskFilters from "../components/TaskFilters";

describe("TaskFilters", () => {
    let input: HTMLElement;
    let addButton: HTMLElement;
    
    beforeEach(() => {
        render(
            <TaskProvider>
                <AddTask />
                <TaskList />
                <TaskFilters />
            </TaskProvider>
        );

        input = screen.getByLabelText("Add Task");
        addButton = screen.getByRole("button", { name: "Add" });

        fireEvent.change(input, { target: { value: "Active Task" } });
        fireEvent.click(addButton);

        fireEvent.change(input, { target: { value: "Completed Task" } });
        fireEvent.click(addButton);

        const checkboxes = screen.getAllByRole("checkbox");
        fireEvent.click(checkboxes[1]);
    });

    test("should change on filter all", async () => {
        fireEvent.click(screen.getByRole("button", { name: "All" }));

        expect(await screen.findByText("Active Task")).toBeInTheDocument();
        expect(await screen.findByText("Completed Task")).toBeInTheDocument();
    });

    test("should change on filter active", async () => {
        fireEvent.click(screen.getByRole("button", { name: "Active" }));

        expect(await screen.findByText("Active Task")).toBeInTheDocument();
        expect(screen.queryByText("Completed Task")).not.toBeInTheDocument();
    });

    test("should change on filter completed", async () => {
        fireEvent.click(screen.getByRole("button", { name: "Completed" }));

        expect(screen.queryByText("Active Task")).not.toBeInTheDocument();
        expect(await screen.findByText("Completed Task")).toBeInTheDocument();
    });
});
