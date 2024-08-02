import { openDB } from "idb";

import type { IDBPDatabase } from "idb";

export const createDB = async <T>(
  databaseName: string,
  stores: string[],
  version: number
): Promise<IDBPDatabase<T>> => {
  const db = await openDB(databaseName, version, {
    upgrade(db) {
      stores.forEach((store) => {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, { keyPath: "id", autoIncrement: true });
        }
      });
    },
  });

  return db as IDBPDatabase<T>;
};
