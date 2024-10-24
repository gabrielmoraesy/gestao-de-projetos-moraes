import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Sun, Moon } from "phosphor-react";

interface ThemeContextValue {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface ThemeProps {
  children: ReactNode;
  theme: { mode: string };
}

const ThemeContext = createContext<ThemeContextValue>({
  isDarkMode: false,
  toggleTheme: () => { },
});

export function ThemeProvider({ children }: ThemeProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("isDarkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("isDarkMode");
    setIsDarkMode(storedTheme === "true");
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className={
        isDarkMode ? "theme-toggle-button darkIcon" : "theme-toggle-button"
      }
      onClick={toggleTheme}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
}
