import { Box, Container, Stack } from "@mui/material";

import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import TaskFilters from "./components/TaskFilters";
import TaskCounter from "./components/TaskCounter";
import TaskClearCompleted from "./components/TaskClearCompleted";

const App: React.FC = () => {
  return (
    <Box
      component="main"
      display="flex"
      justifyContent="center"
      height="100vh">
      <Container>
        <Stack alignItems="center" gap={2} marginTop={10}>
          <AddTask />
          <TaskList />
          <Stack direction="row" gap={4} alignItems="center">
            <TaskClearCompleted />
            <TaskCounter />
            <TaskFilters />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default App;