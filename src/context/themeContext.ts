import { createContext } from "react";

export enum ThemeType {
  LIGHT = "fantasy",
  DARK = "night",
}

interface Theme {
  theme: ThemeType,
  setTheme: (theme: ThemeType) => void
}

export const ThemeContext = createContext<Theme | undefined>(undefined);
