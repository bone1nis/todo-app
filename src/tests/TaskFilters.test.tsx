import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";

import { renderWithProvider } from "./helpers/renderWithProvider";

describe("TaskFilters", () => {
    let input: HTMLElement;
    let addButton: HTMLElement;

    const addTask = async (task: string, completed = false) => {
        await userEvent.type(input, task);
        await userEvent.click(addButton);
        if (completed) {
            const checkboxes = screen.getAllByRole("checkbox");
            await userEvent.click(checkboxes[checkboxes.length - 1]);
        }
    };

    beforeEach(async () => {
        renderWithProvider(
            <>
                <AddTask />
                <TaskList />
                <TaskFilters />
            </>
        );

        input = screen.getByLabelText("Add Task");
        addButton = screen.getByRole("button", { name: "Add" });

        await addTask("Active Task");
        userEvent.clear(input);
        await addTask("Completed Task", true);
    });

    test("should change on filter all", async () => {
        userEvent.click(screen.getByRole("button", { name: "All" }));

        await waitFor(() => {
            expect(screen.getByText("Active Task")).toBeInTheDocument();
            expect(screen.getByText("Completed Task")).toBeInTheDocument();
        });
    });

    test("should change on filter active", async () => {
        userEvent.click(screen.getByRole("button", { name: "Active" }));

        await waitFor(() => {
            expect(screen.getByText("Active Task")).toBeInTheDocument();
            expect(screen.queryByText("Completed Task")).toBeNull();
        });
    });

    test("should change on filter completed", async () => {
        userEvent.click(screen.getByRole("button", { name: "Completed" }));

        await waitFor(() => {
            expect(screen.queryByText("Active Task")).toBeNull();
            expect(screen.getByText("Completed Task")).toBeInTheDocument();
        });
    });
});
