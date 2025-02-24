import React, { ReactNode, useState } from "react";

import { FilterType, TaskContext } from "./TaskContext";

import { Task } from "../type";

const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<FilterType>("all");

    const addTask = (text: string) => {
        setTasks(prev => [...prev, { id: crypto.randomUUID(), text, completed: false }]);
    };

    const toggleTask = (id: string) => {
        setTasks(prev => prev.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };

    const removeCompleted = () => {
        setTasks(prev => prev.filter(task => !task.completed));
    };

    const getFilteredTasks = (filter: FilterType, tasks: Task[]) => {
        let result;

        if (filter === "completed") {
            result = tasks.filter((task) => task.completed);
        } else if (filter === "active") {
            result = tasks.filter((task) => !task.completed);
        } else {
            result = tasks;
        }

        return result;
    };

    const filterTasks = getFilteredTasks(filter, tasks);

    const getActiveTasks = (tasks: Task[]) => {
        let count = 0;
        tasks.forEach(item => {
            if (!item.completed) {
                count += 1;
            }
        })

        return count;
    }

    const activeTasks = getActiveTasks(tasks);

    return (
        <TaskContext.Provider value={{ tasks: filterTasks, activeTasks, addTask, toggleTask, removeCompleted, filter, setFilter }}>
            {children}
        </TaskContext.Provider>
    );
}


export default TaskProvider;