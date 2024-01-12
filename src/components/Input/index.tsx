import { Component, JSX, splitProps, createMemo, createSignal, onMount, onCleanup } from 'solid-js'
import { debounce } from '@solid-primitives/scheduled'
import { classNames } from '@tma.js/sdk'
import { InputError } from '../InputError'
import { InputLabel } from '../InputLabel'

import styles from './styles.module.scss'

type InputProps = {
  ref?: (element: HTMLInputElement) => void
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'number' | 'date'
  name: string
  value?: string | number | undefined
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>
  onChange?: JSX.EventHandler<HTMLInputElement, Event>
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>
  placeholder?: string
  required?: boolean
  class?: string
  label?: string
  error?: string
  touched?: boolean
  dirty?: boolean
  debounce?: number
  padding?: 'none'
}

export const Input: Component<InputProps> = props => {
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

  const trigger = debounce(
    (
      value: InputEvent & {
        currentTarget: HTMLInputElement
        target: Element
      },
    ) => {
      if (!props.onInput) return

      props.onInput(value)
    },
    props.debounce ?? 0,
  )

  const onInput: JSX.EventHandler<HTMLInputElement, InputEvent> = e => {
    if (!props.onInput) return

    if (props.debounce) {
      trigger(e)
    } else {
      props.onInput(e)
    }
  }

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
      class={classNames(styles.inputWrapper, props.class)}
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
      <input
        class={styles.input}
        {...inputProps}
        id={props.name}
        value={getValue()}
        onInput={onInput}
      />
      <InputError error={props.error} name={props.name} />
    </div>
  )
}
