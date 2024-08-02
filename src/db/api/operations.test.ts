import { beforeEach, describe, expect, it, vi } from "vitest";

import { addTask, deleteTask, getTasks } from "./task";
import { getTimer, updateTimer } from "./timer";

import {
  BREAK_SHORT,
  TASK_STORE,
  TASK_TIMER,
  TASK_TYPE_BREAK,
  TASK_TYPE_WORK,
  THEME_BLUE,
  THEME_PINK,
  TIMER_STORE,
} from "@/constants";

const mockObjectStore = {
  getAll: vi.fn(),
  get: vi.fn(),
  add: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
};

const mockTransaction = {
  objectStore: vi.fn().mockReturnValue(mockObjectStore),
  done: Promise.resolve(),
};

const mockDB = {
  transaction: vi.fn().mockReturnValue(mockTransaction),
};

describe("Database Operations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Task Operations", () => {
    it("getTasks should return all tasks", async () => {
      const mockTasks: Task[] = [
        {
          id: 1,
          text: "Task 1",
          completed: false,
          createdAt: "2023-08-01",
          totalDuration: 0,
        },
        {
          id: 2,
          text: "Task 2",
          completed: true,
          createdAt: "2023-08-02",
          totalDuration: 1500,
        },
      ];
      mockObjectStore.getAll.mockResolvedValue(mockTasks);

      const result = await getTasks({
        db: mockDB as any,
        storeName: TASK_STORE,
      });

      expect(result).toEqual(mockTasks);
      expect(mockDB.transaction).toHaveBeenCalledWith(TASK_STORE, "readonly");
    });

    it("addTask should add tasks if they do not exist", async () => {
      const newTasks: Task[] = [
        {
          id: 1,
          text: "New Task",
          completed: false,
          createdAt: "2023-08-03",
          totalDuration: 0,
        },
      ];
      mockObjectStore.get.mockResolvedValue(undefined);

      await addTask({
        db: mockDB as any,
        storeName: TASK_STORE,
        tasks: newTasks,
      });
      expect(mockObjectStore.add).toHaveBeenCalledWith(newTasks[0]);
      expect(mockDB.transaction).toHaveBeenCalledWith(TASK_STORE, "readwrite");
    });

    it("deleteTask should delete a task by id", async () => {
      await deleteTask({ db: mockDB as any, storeName: TASK_STORE, id: 1 });
      expect(mockObjectStore.delete).toHaveBeenCalledWith(1);
      expect(mockDB.transaction).toHaveBeenCalledWith(TASK_STORE, "readwrite");
    });
  });

  describe("Timer Operations", () => {
    it("getTimer should return all timers", async () => {
      const mockTimers: Timer[] = [
        {
          type: TASK_TYPE_WORK,
          title: TASK_TIMER,
          duration: 1500,
          theme: THEME_PINK,
          step: 5,
        },
        {
          type: TASK_TYPE_BREAK,
          title: BREAK_SHORT,
          duration: 300,
          theme: THEME_BLUE,
          step: 1,
        },
      ];
      mockObjectStore.getAll.mockResolvedValue(mockTimers);

      const result = await getTimer({
        db: mockDB as any,
        storeName: TIMER_STORE,
      });

      expect(result).toEqual(mockTimers);
      expect(mockDB.transaction).toHaveBeenCalledWith(TIMER_STORE, "readonly");
    });

    it("updateTimer should update all provided timers", async () => {
      const timersToUpdate: Timer[] = [
        {
          type: TASK_TYPE_WORK,
          title: TASK_TIMER,
          duration: 1800,
          theme: THEME_PINK,
          step: 10,
        },
        {
          type: TASK_TYPE_BREAK,
          title: BREAK_SHORT,
          duration: 600,
          theme: THEME_BLUE,
          step: 5,
        },
      ];

      await updateTimer({
        db: mockDB as any,
        storeName: TIMER_STORE,
        timers: timersToUpdate,
      });

      expect(mockObjectStore.put).toHaveBeenCalledTimes(2);
      expect(mockObjectStore.put).toHaveBeenCalledWith(timersToUpdate[0]);
      expect(mockObjectStore.put).toHaveBeenCalledWith(timersToUpdate[1]);
      expect(mockDB.transaction).toHaveBeenCalledWith(TIMER_STORE, "readwrite");
    });
  });
});
