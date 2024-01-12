import {
  For,
  JSX,
  ParentComponent,
  ResourceReturn,
  children,
  createResource,
  createSignal,
} from 'solid-js'
import styles from './styles.module.scss'

export interface TabProps<T> {
  name: string
  text?: string
  fetcher?: () => Promise<T>
  children: JSX.Element | ((resource: ResourceReturn<T, T>) => JSX.Element)
}

export function Tab<T>(props: TabProps<T>) {
  return props as unknown as JSX.Element
}

export const Tabs: ParentComponent<{ default?: string }> = props => {
  const tabs = children(() => props.children) as unknown as () => TabProps<unknown>[]

  const getTab = (name?: string) => {
    return tabs().find(tab => tab.name === name) || tabs()[0]
  }

  const [selectedTab, setSelectedTab] = createSignal<TabProps<unknown>>(getTab(props.default))

  const renderTabContent = () => {
    const tab = selectedTab()
    if (tab.fetcher && typeof tab.children === 'function') {
      const resource = createResource(tab.fetcher)
      return tab.children(resource)
    }
    return tab.children
  }

  return (
    <div class={styles.tabs}>
      <nav class={styles.navigation}>
        <ul class={styles.list}>
          <For each={tabs()}>
            {child => (
              <li class={styles.item}>
                <button
                  aria-current={child === selectedTab() ? true : undefined}
                  class={styles.button}
                  onClick={() => setSelectedTab(child)}
                >
                  {child.text}
                </button>
              </li>
            )}
          </For>
        </ul>
      </nav>
      <div class={styles.content}>{renderTabContent() as unknown as JSX.Element}</div>
    </div>
  )
}
