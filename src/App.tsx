import { TaskTimerContextProvider } from "@/provider";
import TaskTimer from "@/views/TaskTimer";

function App() {
  return (
    <TaskTimerContextProvider>
      <TaskTimer />
    </TaskTimerContextProvider>
  );
}

export default App;
