import { Accessor, For, JSX, Resource, Show } from 'solid-js'
import { Spinner } from '../Spinner'
import { isAccessor, isResource } from '../../utils'

import styles from './styles.module.scss'

interface ListProps<T> {
  items?: Resource<T[]> | T[] | Accessor<T[]>
  fallback?: JSX.Element
  children: (props: { item: T; index: number }) => JSX.Element | JSX.Element
}

export function List<T>(props: ListProps<T>) {
  const itemsIsLoading = () => {
    if (isResource(props.items)) return props.items.loading
    return false
  }

  const getItems = () => {
    if (isResource(props.items) || isAccessor(props.items)) return props.items()
    return props.items
  }

  return (
    <div class={styles.listContainer}>
      <Show when={itemsIsLoading()}>
        <Spinner />
      </Show>
      <Show when={!itemsIsLoading()}>
        <ul class={styles.list}>
          <For
            each={getItems()}
            fallback={
              <div class={styles.empty}>{props.fallback || <span>Items not Found</span>}</div>
            }
          >
            {(item, index) => {
              return <li class={styles.item}>{props.children({ item, index: index() })}</li>
            }}
          </For>
        </ul>
      </Show>
    </div>
  )
}
