import { addTask, deleteTask, getTasks } from "@/db";
import { act, renderHook } from "@testing-library/react";
import type { IDBPDatabase } from "idb";
import { vi } from "vitest";

import { useDatabaseTasks } from "./useDatabaseTasks";

vi.mock("@/db", () => ({
  getTasks: vi.fn(),
  addTask: vi.fn(),
  deleteTask: vi.fn(),
}));

type Task = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  totalDuration: number;
};

describe("useDatabaseTasks", () => {
  const mockDb = {} as IDBPDatabase<TaskTimerDatabase>;
  const mockStoreName = "tasks";

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should load tasks successfully", async () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        text: "Test Task",
        completed: false,
        createdAt: "2023-01-01",
        totalDuration: 0,
      },
    ];
    (getTasks as any).mockResolvedValue(mockTasks);

    const { result } = renderHook(() =>
      useDatabaseTasks(mockDb, mockStoreName)
    );

    await act(async () => {
      await result.current.loadTasks();
    });

    expect(result.current.tasks).toEqual(mockTasks);
    expect(getTasks).toHaveBeenCalledWith({
      db: mockDb,
      storeName: mockStoreName,
    });
  });

  it("should add tasks successfully", async () => {
    const newTask: Task = {
      id: 2,
      text: "New Task",
      completed: false,
      createdAt: "2023-01-02",
      totalDuration: 0,
    };
    (addTask as any).mockResolvedValue(undefined);
    (getTasks as any).mockResolvedValue([newTask]);

    const { result } = renderHook(() =>
      useDatabaseTasks(mockDb, mockStoreName)
    );

    await act(async () => {
      await result.current.addTasks([newTask]);
    });

    expect(result.current.tasks).toEqual([newTask]);
    expect(addTask).toHaveBeenCalledWith({
      db: mockDb,
      storeName: mockStoreName,
      tasks: [newTask],
    });
  });

  it("should delete task successfully", async () => {
    const taskId = 1;
    (deleteTask as any).mockResolvedValue(undefined);
    (getTasks as any).mockResolvedValue([]);

    const { result } = renderHook(() =>
      useDatabaseTasks(mockDb, mockStoreName)
    );

    await act(async () => {
      await result.current.deleteTaskById(taskId);
    });

    expect(result.current.tasks).toEqual([]);
    expect(deleteTask).toHaveBeenCalledWith({
      db: mockDb,
      storeName: mockStoreName,
      id: taskId,
    });
  });
});
