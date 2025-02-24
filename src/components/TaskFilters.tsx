import { useTaskContext } from "../context/TaskContext";
import { Button, Stack } from "@mui/material";

const TaskFilters: React.FC = () => {
  const { filter, setFilter } = useTaskContext();

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant={filter === "all" ? "contained" : "outlined"}
        onClick={() => setFilter("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "contained" : "outlined"}
        onClick={() => setFilter("active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "contained" : "outlined"}
        onClick={() => setFilter("completed")}
      >
        Completed
      </Button>
    </Stack>
  );
};

export default TaskFilters;