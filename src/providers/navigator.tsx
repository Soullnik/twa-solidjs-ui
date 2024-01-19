import { Router } from '@solidjs/router'
import { createIntegration } from '@tma.js/solid-router-integration'
import { retrieveLaunchData, HashNavigator, type HashNavigatorOptions } from '@tma.js/sdk'
import { ParentProps, createContext, useContext } from 'solid-js'

const NavigatorContext = createContext<HashNavigator>()

export function createNavigator(): HashNavigator {
  let navigator: HashNavigator | undefined
  const navigatorOptions: HashNavigatorOptions = {
    debug: true,
  }

  if (retrieveLaunchData().isPageReload) {
    const stateRaw = sessionStorage.getItem('hash-navigator-state')
    if (stateRaw) {
      try {
        const { cursor, entries } = JSON.parse(stateRaw)
        navigator = new HashNavigator(entries, cursor, navigatorOptions)
      } catch (e) {
        console.error('Unable to restore hash navigator state.', e)
      }
    }
  }

  if (!navigator) {
    navigator = new HashNavigator([{}], 0, navigatorOptions)
  }

  const saveState = (nav: HashNavigator) => {
    sessionStorage.setItem(
      'hash-navigator-state',
      JSON.stringify({
        cursor: nav.cursor,
        entries: nav.getEntries(),
      }),
    )
  }

  navigator.on('change', ({ navigator: nav }) => saveState(nav))

  saveState(navigator)

  return navigator
}

export function NavigatorProvider(props: ParentProps) {
  const navigator = createNavigator()
  void navigator.attach()

  return (
    <NavigatorContext.Provider value={navigator}>
      <Router source={createIntegration(() => navigator)}>{props.children}</Router>
    </NavigatorContext.Provider>
  )
}

export const useNavigator = () => useContext(NavigatorContext)
