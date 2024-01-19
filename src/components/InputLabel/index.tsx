import { Component, Show } from 'solid-js'
import { classNames } from '@tma.js/sdk'

import styles from './styles.module.scss'

type InputLabelProps = {
  name: string
  label?: string
  required?: boolean
  margin?: 'none'
  class?: string
}

export const InputLabel: Component<InputLabelProps> = (props: InputLabelProps) => {
  return (
    <Show when={props.label}>
      <label class={classNames(styles.label, props.class)} for={props.name}>
        {props.label} {props.required && <span class={styles.required}>*</span>}
      </label>
    </Show>
  )
}
