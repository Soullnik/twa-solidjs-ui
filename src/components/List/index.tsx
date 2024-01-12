import { Accessor, For, JSX, Resource, Show } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { Spinner } from '../Spinner'
import { isAccessor, isResource } from '../../utils'

import styles from './styles.module.scss'

interface ListProps<T> {
  items?: Resource<T[]> | T[] | Accessor<T[]>
  component?: (props: { item: T; index: number }) => JSX.Element
  fallback?: JSX.Element
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
              return (
                <li class={styles.item}>
                  <Dynamic component={props.component} item={item} index={index()}></Dynamic>
                </li>
              )
            }}
          </For>
        </ul>
      </Show>
    </div>
  )
}
