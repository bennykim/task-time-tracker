import { formatRemainingTime } from "./time";

describe("formatRemainingTime Utility Function", () => {
  test("should format time correctly", () => {
    expect(formatRemainingTime(0)).toBe("00:00");
    expect(formatRemainingTime(60)).toBe("01:00");
    expect(formatRemainingTime(90)).toBe("01:30");
    expect(formatRemainingTime(3600)).toBe("60:00");
  });
});
