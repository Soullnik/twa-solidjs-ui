import { createMemo, createSignal, For, JSX, onCleanup, onMount, splitProps } from 'solid-js'
import { InputError } from '../InputError'
import { InputLabel } from '../InputLabel'
import { classNames } from '@tma.js/sdk'

import styles from './styles.module.scss'

type SelectProps = {
  ref?: (element: HTMLSelectElement) => void
  name: string
  value: string | string[] | undefined
  onInput?: JSX.EventHandler<HTMLSelectElement, InputEvent>
  onChange?: JSX.EventHandler<HTMLSelectElement, Event>
  onBlur?: JSX.EventHandler<HTMLSelectElement, FocusEvent>
  options: { label: string; value: string }[]
  multiple?: boolean
  size?: string | number
  placeholder?: string
  required?: boolean
  class?: string
  label?: string
  error?: string
  touched?: boolean
}

export function Select(props: SelectProps) {
  let wrapperRef: HTMLDivElement | undefined
  const [focused, setFocused] = createSignal(false)
  const [, selectProps] = splitProps(props, [
    'class',
    'value',
    'options',
    'label',
    'error',
    'placeholder',
  ])

  const getValues = createMemo(() =>
    Array.isArray(props.value) ? props.value : typeof props.value === 'string' ? [props.value] : [],
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
      class={classNames(styles.selectWrapper, props.class)}
      classList={{
        [styles.focused as string]: focused() || !!props.value,
      }}
      ref={wrapperRef}
    >
      <InputLabel
        class={styles.label}
        name={props.name}
        label={props.label}
        required={props.required}
      />
      <select
        {...selectProps}
        class={styles.select}
        id={props.name}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
      >
        <option class={styles.options} value="" hidden selected disabled></option>
        <For each={props.options}>
          {({ label, value }) => (
            <option class={styles.option} value={value} selected={getValues().includes(value)}>
              {label}
            </option>
          )}
        </For>
      </select>
      <InputError class={styles.error} name={props.name} error={props.error} />
    </div>
  )
}
