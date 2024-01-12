import { type Component, JSX, splitProps } from 'solid-js'
import { classNames } from '@tma.js/sdk'
import { InputError } from '../InputError'
import { InputLabel } from '../InputLabel'

import styles from './styles.module.scss'

type CheckboxProps = {
  ref?: (element: HTMLInputElement) => void
  name: string
  value?: string
  checked?: boolean
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>
  onChange?: JSX.EventHandler<HTMLInputElement, Event>
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>
  required?: boolean
  class?: string
  label?: string
  touched?: boolean
  dirty?: boolean
  error?: string
  padding?: 'none'
  disabled?: boolean
}

export const Checkbox: Component<CheckboxProps> = props => {
  const [, inputProps] = splitProps(props, ['class', 'value', 'label', 'error', 'padding'])

  return (
    <div class={classNames(styles.checkboxWrapper, props.class)} onClick={e => e.stopPropagation()}>
      <InputLabel
        class={styles.label}
        name={props.name}
        label={props.label}
        required={props.required}
      />
      <input
        {...inputProps}
        type="checkbox"
        class={styles.checkbox}
        id={props.name}
        value={props.value || ''}
        checked={props.checked}
        aria-invalid={props.touched && props.required ? !!props.error : undefined}
        disabled={props.disabled}
        aria-errormessage={`${props.name}-error`}
      />

      <InputError error={props.error} name={props.name} />
    </div>
  )
}
