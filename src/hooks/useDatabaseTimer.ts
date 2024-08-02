import { useCallback, useState } from "react";

import { timerData } from "@/data";
import { getTimer, updateTimer } from "@/db";

import type { IDBPDatabase } from "idb";

export const useDatabaseTimer = (
  db: IDBPDatabase<TaskTimerDatabase> | null,
  storeName: string
) => {
  const [timers, setTimers] = useState<Timer[]>(timerData);

  const loadTimers = useCallback(() => {
    if (db) {
      getTimer({ db, storeName })
        .then((timers) => {
          if (timers.length > 0) setTimers(timers);
        })
        .catch((error) => console.error("Failed to load timers:", error));
    } else {
      console.warn("Database is not available");
    }
  }, [db, storeName]);

  const updateTimers = useCallback(
    (newTimers: Timer[]) => {
      if (db) {
        updateTimer({
          db,
          storeName,
          timers: newTimers,
        })
          .then(loadTimers)
          .catch((error) =>
            console.error("Failed to add or update timers:", error)
          );
      } else {
        console.warn("Database is not available");
      }
    },
    [db, storeName, loadTimers]
  );

  return {
    timers,
    loadTimers,
    updateTimers,
  };
};
