import { ReactNode } from "react";

import TaskProvider from "../../context/TaskProvider";
import { render } from "@testing-library/react";

export const renderWithProvider = (ui: ReactNode) => {
    return render(
        <TaskProvider>
            {ui}
        </TaskProvider>
    );
};