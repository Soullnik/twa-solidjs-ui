import {
  type Component,
  JSX,
  splitProps,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
} from 'solid-js'
import { InputError } from '../InputError'
import { InputLabel } from '../InputLabel'
import { classNames } from '@tma.js/sdk'

import styles from './styles.module.scss'

type TextAreaProps = {
  ref?: (element: HTMLTextAreaElement) => void
  name: string
  value?: string | number | undefined
  onInput?: JSX.EventHandler<HTMLTextAreaElement, InputEvent>
  onChange?: JSX.EventHandler<HTMLTextAreaElement, Event>
  onBlur?: JSX.EventHandler<HTMLTextAreaElement, FocusEvent>
  placeholder?: string
  required?: boolean
  class?: string
  label?: string
  error?: string
  touched?: boolean
  dirty?: boolean
  padding?: 'none'
}

export const TextArea: Component<TextAreaProps> = props => {
  let wrapperRef: HTMLDivElement | undefined
  const [focused, setFocused] = createSignal(false)
  const [, inputProps] = splitProps(props, [
    'class',
    'value',
    'label',
    'error',
    'padding',
    'placeholder',
  ])

  const getValue = createMemo<string | number | undefined>(
    prevValue =>
      props.value === undefined ? '' : !Number.isNaN(props.value) ? props.value : prevValue,
    '',
  )

  const handleClick = (event: MouseEvent) => {
    if (!wrapperRef?.contains(event.target as Node)) {
      setFocused(false)
    } else {
      setFocused(true)
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClick)
  })

  onCleanup(() => {
    document.removeEventListener('click', handleClick)
  })

  return (
    <div
      class={classNames(styles.textareaWrapper, props.class)}
      classList={{
        [styles.focused]: focused() || !!props.value,
      }}
      ref={wrapperRef}
    >
      <InputLabel
        class={styles.label}
        name={props.name}
        label={props.label}
        required={props.required}
      />
      <textarea
        {...inputProps}
        class={styles.textarea}
        id={props.name}
        contenteditable={true}
        value={getValue()}
        aria-invalid={props.touched && props.required ? !!props.error : undefined}
        aria-errormessage={`${props.name}-error`}
      />
      <InputError error={props.error} name={props.name} />
    </div>
  )
}
