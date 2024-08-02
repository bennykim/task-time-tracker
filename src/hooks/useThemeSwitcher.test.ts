import { act, renderHook } from "@testing-library/react";

import { useThemeSwitcher } from "./useThemeSwitcher";

describe("useThemeSwitcher", () => {
  it("should switch theme", () => {
    const { result } = renderHook(() => useThemeSwitcher());

    act(() => {
      result.current.switchTheme("pink");
    });

    expect(result.current.theme).toBe("pink");
    expect(document.documentElement.getAttribute("data-theme")).toBe("pink");
  });
});
