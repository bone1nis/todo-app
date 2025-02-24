import { Typography } from "@mui/material";
import { useTaskContext } from "../context/TaskContext";

const TaskCounter = () => {
    const { activeTasks } = useTaskContext();
    return (
        <Typography variant="h5">
            {activeTasks} items left
        </Typography>
    );
}

export default TaskCounter;