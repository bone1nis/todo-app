import { Box, Checkbox, Stack, Typography } from "@mui/material";

import { useTaskContext } from "../context/TaskContext";

import { Task } from "../type";

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
    const { toggleTask } = useTaskContext();

    return (
        <Box width="100%">
            <Stack direction="row" gap={2}>
                <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} />
                <Typography variant="h5" gutterBottom sx={{ wordBreak: "break-all" }}>
                    {task.text}
                </Typography>
            </Stack>
        </Box>
    );
}

export default TaskItem;