import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  TASK_STORE,
  TASK_TIMER_DATABASE_NAME,
  TASK_TIMER_DATABASE_VERSION,
  TIMER_STORE,
} from "@/constants";
import { createDB } from "@/db";

import type { IDBPDatabase } from "idb";

type TaskTimerContextType = {
  database: IDBPDatabase<TaskTimerDatabase> | null;
  tasks: Task[];
  coords: Coordinates | null;
  updateTasks: (task: Task[]) => void;
};

const TaskTimerContext = createContext<TaskTimerContextType>({
  database: null,
  tasks: [],
  coords: null,
  updateTasks: () => null,
});

type TaskTimerContextProviderProps = {
  children: React.ReactNode;
};

const TaskTimerContextProvider = ({
  children,
}: TaskTimerContextProviderProps) => {
  const [database, setDatabase] =
    useState<IDBPDatabase<TaskTimerDatabase> | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [coords, setCoords] = useState<Coordinates | null>(null);

  useEffect(() => {
    const initDB = async () => {
      const db = await createDB<TaskTimerDatabase>(
        TASK_TIMER_DATABASE_NAME,
        [TIMER_STORE, TASK_STORE],
        TASK_TIMER_DATABASE_VERSION
      );
      setDatabase(db);
    };

    initDB();
    updateCoords();
  }, []);

  const updateTasks = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
  }, []);

  const updateCoords = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
      },
      (error) => console.error("Error getting geolocation:", error)
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      database,
      tasks,
      coords,
      updateTasks,
    }),
    [database, tasks, coords, updateTasks]
  );

  return (
    <TaskTimerContext.Provider value={contextValue}>
      {children}
    </TaskTimerContext.Provider>
  );
};

export { TaskTimerContext, TaskTimerContextProvider };
