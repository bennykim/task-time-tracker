import type { IDBPDatabase } from "idb";

type GetTasksProps = {
  db: IDBPDatabase<TaskTimerDatabase>;
  storeName: string;
};

export const getTasks = async ({ db, storeName }: GetTasksProps) => {
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const tasks = await store.getAll();
  await tx.done;
  return tasks;
};

type AddTaskProps = {
  db: IDBPDatabase<TaskTimerDatabase>;
  storeName: string;
  tasks: Task[];
};

export const addTask = async ({ db, storeName, tasks }: AddTaskProps) => {
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  for (const task of tasks) {
    const existingTask = await store.get(task.id);
    if (!existingTask) await store.add(task);
  }
  await tx.done;
};

type DeleteTaskProps = {
  db: IDBPDatabase<TaskTimerDatabase>;
  storeName: string;
  id: Task["id"];
};

export const deleteTask = async ({ db, storeName, id }: DeleteTaskProps) => {
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.delete(id);
  await tx.done;
};
