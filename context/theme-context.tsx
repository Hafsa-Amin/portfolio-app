"use client"

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextProviderProps = {
  children: React.ReactNode;
}
type themeContextType = {
  theme: Theme,
  toggleTheme: () => void,
}
export const ThemeContext = createContext<themeContextType | null>(null);

export default function ThemeContextProvider({
  children
}: ThemeContextProviderProps){
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => {
    if(theme === "dark"){
      setTheme("light");
      window.localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      window.localStorage.setItem("theme", "dark");
      document.documentElement.classList.remove("light");
    }
  }
  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme") as Theme | null;
    if(localTheme) {
      setTheme(localTheme);
      if(localTheme === "dark") {
        document.documentElement.classList.add("dark");  
      } 
    } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");  
    }
  }, []);
  return(
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )

}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if(context === null) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }
  return context;
}