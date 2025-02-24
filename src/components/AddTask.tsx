import { FormEvent, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";

import { useTaskContext } from "../context/TaskContext";

const AddTask: React.FC = () => {
    const [text, setText] = useState("");
    const { addTask } = useTaskContext();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (text) {
            addTask(text);
        }
    }

    return (
        <Stack component="form" direction="row" gap={4} onSubmit={handleSubmit}>
            <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                label="Add Task"
                variant="outlined"
                size="small"
            />
            <Button type="submit" variant="contained" color="primary">
                Add
            </Button>
        </Stack>
    );
}


export default AddTask;