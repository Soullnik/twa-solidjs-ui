import { createContext, useContext, ParentComponent, createSignal } from 'solid-js'
import { Theme, ThemeName, themes } from 'src/styles/theme'

export type ThemeContextState = {
  theme: () => Theme
}

export type ThemeContextValue = [
  state: ThemeContextState,
  actions: {
    toggleTheme: (selectTheme: ThemeName) => void
    themeName: () => ThemeName
  },
]

const AppThemeContext = createContext<ThemeContextValue>([
  {
    theme: () => themes.dark,
  },
  {
    toggleTheme: () => {},
    themeName: () => 'dark' as ThemeName,
  },
])

export const AppThemeProvider: ParentComponent = props => {
  const [modeTheme, setModeTheme] = createSignal<ThemeName>('dark')

  const toggleTheme = (mode: ThemeName) => {
    setModeTheme(mode)
  }

  const themeName = () => {
    return modeTheme()
  }

  const theme = () => {
    return themes[modeTheme()]
  }

  return (
    <AppThemeContext.Provider value={[{ theme }, { toggleTheme, themeName }]}>
      {props.children}
    </AppThemeContext.Provider>
  )
}

export const useTheme = () => useContext(AppThemeContext)
