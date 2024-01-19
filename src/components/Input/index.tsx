import { JSX, splitProps, createSignal, Show } from 'solid-js'
import { debounce } from '@solid-primitives/scheduled'
import { classNames } from '@tma.js/sdk'
import { InputError } from '../InputError'
import { InputLabel } from '../InputLabel'
import { IoCloseOutline } from 'solid-icons/io'

import styles from './styles.module.scss'

type InputProps = {
  ref?: (element: HTMLInputElement) => void
  platform?: 'ios' | 'android'
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'number' | 'date'
  name: string
  value?: string | number | undefined
  onInput?: JSX.EventHandler<HTMLInputElement, InputEvent>
  onChange?: JSX.EventHandler<HTMLInputElement, Event>
  onBlur?: JSX.EventHandler<HTMLInputElement, FocusEvent>
  required?: boolean
  class?: string
  label?: string
  error?: string
  touched?: boolean
  dirty?: boolean
  debounce?: number
  padding?: 'none'
}

export function Input(props: InputProps) {
  let inputRef: HTMLInputElement | undefined
  const [value, setValue] = createSignal<string>(props.value?.toString() ?? '')

  const [, inputProps] = splitProps(props, [
    'ref',
    'platform',
    'class',
    'value',
    'label',
    'error',
    'padding',
  ])

  const trigger = debounce(
    (
      event: InputEvent & {
        currentTarget: HTMLInputElement
        target: HTMLInputElement
      },
    ) => {
      if (!props.onInput) return
      if (props.debounce) {
        props.onInput(event)
      }
    },
    props.debounce ?? 0,
  )

  const onInput: JSX.InputEventHandler<HTMLInputElement, InputEvent> = e => {
    setValue(e.target.value)
    if (!props.onInput) return
    if (props.debounce) {
      trigger(e)
    } else {
      props.onInput(e)
    }
  }

  const onClear = () => {
    setValue('')
    inputRef?.dispatchEvent(new Event('input', { bubbles: true }))
  }

  const handleRef = (ref: HTMLInputElement) => {
    if (props.ref) {
      props.ref(ref)
    }
    inputRef = ref
  }

  return (
    <div class={classNames(styles.input, props.class)}>
      <div
        class={styles.content}
        classList={{
          error: !!props.error,
        }}
      >
        <input
          class={styles.field}
          ref={handleRef}
          {...inputProps}
          id={props.name}
          value={value()}
          onInput={onInput}
          placeholder={''}
        />
        <InputLabel
          class={classNames(styles.label)}
          name={props.name}
          label={props.label}
          required={props.required}
        />
        <Show when={value()}>
          <IoCloseOutline class={styles.cross} onClick={onClear} />
        </Show>
        <InputError class={styles.error} error={props.error} name={props.name} />
      </div>
    </div>
  )
}
