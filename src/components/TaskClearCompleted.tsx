import { Button } from "@mui/material";

import { useTaskContext } from "../context/TaskContext";

const TaskClearCompleted = () => {
    const { removeCompleted } = useTaskContext();

    return (
        <Button variant="contained" color="primary" onClick={removeCompleted}>
            Clear completed
        </Button>
    );
}

export default TaskClearCompleted;