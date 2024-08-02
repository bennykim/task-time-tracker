import { getTimer, updateTimer } from "@/db";
import { act, renderHook } from "@testing-library/react";
import type { IDBPDatabase } from "idb";
import { vi } from "vitest";

import { useDatabaseTimer } from "./useDatabaseTimer";

vi.mock("@/db", () => ({
  getTimer: vi.fn(),
  updateTimer: vi.fn(),
}));

describe("useDatabaseTimer", () => {
  const mockDb = {} as IDBPDatabase<TaskTimerDatabase>;
  const mockStoreName = "timers";

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should load timers successfully", async () => {
    const mockTimers: Timer[] = [
      {
        type: "work",
        title: "Work Timer",
        theme: "default",
        step: 1,
        duration: 25,
      },
    ];
    (getTimer as any).mockResolvedValue(mockTimers);

    const { result } = renderHook(() =>
      useDatabaseTimer(mockDb, mockStoreName)
    );

    await act(async () => {
      await result.current.loadTimers();
    });

    expect(result.current.timers).toEqual(mockTimers);
    expect(getTimer).toHaveBeenCalledWith({
      db: mockDb,
      storeName: mockStoreName,
    });
  });

  it("should update timers successfully", async () => {
    const updatedTimers: Timer[] = [
      {
        type: "work",
        title: "Updated Work Timer",
        theme: "dark",
        step: 2,
        duration: 30,
      },
    ];
    (updateTimer as any).mockResolvedValue(undefined);
    (getTimer as any).mockResolvedValue(updatedTimers);

    const { result } = renderHook(() =>
      useDatabaseTimer(mockDb, mockStoreName)
    );

    await act(async () => {
      await result.current.updateTimers(updatedTimers);
    });

    expect(result.current.timers).toEqual(updatedTimers);
    expect(updateTimer).toHaveBeenCalledWith({
      db: mockDb,
      storeName: mockStoreName,
      timers: updatedTimers,
    });
  });
});
