import { useEffect, useState } from "react";

import { THEME_DARK } from "@/constants";

export const useThemeSwitcher = (initialTheme = THEME_DARK) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const switchTheme = (newTheme: ThemeColor) => {
    setTheme(newTheme);
  };

  return { theme, switchTheme };
};
