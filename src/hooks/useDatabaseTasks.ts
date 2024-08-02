import { useCallback, useState } from "react";

import { addTask, deleteTask, getTasks } from "@/db";

import type { IDBPDatabase } from "idb";

export const useDatabaseTasks = (
  db: IDBPDatabase<TaskTimerDatabase> | null,
  storeName: string
) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = useCallback(() => {
    if (db) {
      getTasks({ db, storeName })
        .then(setTasks)
        .catch((error) => console.error("Failed to load tasks:", error));
    } else {
      console.warn("Database is not available");
    }
  }, [db]);

  const addTasks = useCallback(
    (newTasks: Task[]) => {
      if (db) {
        addTask({
          db,
          storeName,
          tasks: newTasks,
        })
          .then(loadTasks)
          .catch((error) => console.error("Failed to add tasks:", error));
      } else {
        console.warn("Database is not available");
      }
    },
    [db, loadTasks]
  );

  const deleteTaskById = useCallback(
    (id: Task["id"]) => {
      if (db) {
        deleteTask({ db, storeName, id })
          .then(loadTasks)
          .catch((error) => console.error("Failed to delete task:", error));
      } else {
        console.warn("Database is not available");
      }
    },
    [db, loadTasks]
  );

  return {
    tasks,
    loadTasks,
    addTasks,
    deleteTaskById,
  };
};
