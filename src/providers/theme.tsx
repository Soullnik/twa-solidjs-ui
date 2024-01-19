import { createContext, useContext, ParentComponent, createSignal } from 'solid-js'

type Theme = 'dark' | 'light'

type ThemeContextValue = [() => Theme, (mode: Theme) => void]

const ThemeContext = createContext<ThemeContextValue>()

export const AppThemeProvider: ParentComponent = props => {
  const [modeTheme, setModeTheme] = createSignal<Theme>('dark')

  const toggleTheme = (mode: Theme) => {
    setModeTheme(mode)
  }

  const theme = () => {
    return modeTheme()
  }

  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>{props.children}</ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
