import { useEffect, useState } from "react";

const DARK_MODE_KEY = "darkMode";

const prefersDarkMode = (): boolean =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const useDarkMode = (): [boolean, () => void] => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    const savedDarkMode = localStorage.getItem(DARK_MODE_KEY);
    return savedDarkMode ? savedDarkMode === "true" : prefersDarkMode();
  });

  useEffect(() => {
    const rootDoc = document.documentElement.classList;
    localStorage.setItem(DARK_MODE_KEY, String(enabled));
    if (enabled) {
      rootDoc.add("dark");
    } else {
      rootDoc.remove("dark");
    }
  }, [enabled]);

  const toggle = (): void => setEnabled((prev) => !prev);

  return [enabled, toggle];
};

export default useDarkMode;
