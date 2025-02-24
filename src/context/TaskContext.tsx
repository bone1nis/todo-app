import { createContext, useContext } from "react";

import { Task } from "../type";

export type FilterType = "all" | "completed" | "active";

export type TaskContextType = {
    tasks: Task[];
    activeTasks: number;
    addTask: (text: string) => void;
    toggleTask: (id: string) => void;
    removeCompleted: () => void;
    filter: FilterType;
    setFilter: (filter: FilterType) => void;
}

export const TaskContext = createContext<TaskContextType | null>(null);


export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('Error');
    return context;
}