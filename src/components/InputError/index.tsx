import { Show } from 'solid-js'
import { classNames } from '@tma.js/sdk'
import styles from './styles.module.scss'

type InputErrorProps = {
  name: string
  error?: string
  class?: string
}

export function InputError(props: InputErrorProps) {
  return (
    <Show when={props.error}>
      <small class={classNames(styles.inputError, props.class)} id={`${props.name}-error`}>
        {props.error}
      </small>
    </Show>
  )
}
