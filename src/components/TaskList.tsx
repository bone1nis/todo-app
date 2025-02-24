import { Stack } from "@mui/material";
import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList: React.FC = () => {
    const { tasks } = useTaskContext();

    return (
        <Stack alignItems="center">
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
        </Stack>
    );
}

export default TaskList;