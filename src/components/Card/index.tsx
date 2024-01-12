import { Component, JSX, Show } from 'solid-js'
import { Checkbox } from '../CheckBox'

import styles from './styles.module.scss'

type CardProps = {
  onClick?: () => void
  onSelect?: () => void
  title?: string | number
  selectable?: boolean
}

export const Card: Component<CardProps> = props => {
  const onClick = () => {
    if (props.onClick) {
      props.onClick()
    }
  }

  const onSelect: JSX.EventHandler<HTMLInputElement, Event> = () => {
    if (props.onSelect) {
      props.onSelect()
    }
  }

  return (
    <article class={styles.card} onClick={onClick}>
      <h2>{props.title}</h2>
      <Show when={props.selectable}>
        <Checkbox name="select" onChange={onSelect}></Checkbox>
      </Show>
    </article>
  )
}
