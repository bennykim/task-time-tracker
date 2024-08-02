import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";

import { useTimer } from "./useTimer";

describe("useTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should start and stop timer", () => {
    const { result } = renderHook(() => useTimer(60));

    act(() => {
      result.current.toggleTimer();
    });

    expect(result.current.isActive).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.seconds).toBe(59);

    act(() => {
      result.current.toggleTimer();
    });

    expect(result.current.isActive).toBe(false);
  });

  it("should reset timer", () => {
    const { result } = renderHook(() => useTimer(60));

    act(() => {
      result.current.toggleTimer();
      vi.advanceTimersByTime(10000);
      result.current.resetTimer();
    });

    expect(result.current.seconds).toBe(60);
    expect(result.current.isActive).toBe(false);
  });
});
