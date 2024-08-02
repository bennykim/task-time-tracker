import type { IDBPDatabase } from "idb";

type GetTimerProps = {
  db: IDBPDatabase<TaskTimerDatabase>;
  storeName: string;
};

export const getTimer = async ({ db, storeName }: GetTimerProps) => {
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const tasks = await store.getAll();
  await tx.done;
  return tasks;
};

type UpdateTimerProps = {
  db: IDBPDatabase<TaskTimerDatabase>;
  storeName: string;
  timers: Timer[];
};

export const updateTimer = async ({
  db,
  storeName,
  timers,
}: UpdateTimerProps) => {
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  for (const timer of timers) {
    await store.put(timer);
  }
  await tx.done;
};
