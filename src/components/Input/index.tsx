import {
  Component,
  JSX,
  splitProps,
  createSignal,
  onMount,
  onCleanup,
  createEffect,
  Show,
} from 'solid-js'
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
  let inputRef: HTMLInputElement | undefined
  const [focused, setFocused] = createSignal<boolean>(false)
  const [touched, setTouched] = createSignal<boolean>(false)
  const [value, setValue] = createSignal<string>(props.value?.toString() ?? '')

  const [, inputProps] = splitProps(props, [
    'ref',
    'platform',
    'class',
    'value',
    'label',
    'error',
    'padding',
    'placeholder',
  ])

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
    setValue(e.currentTarget.value)
    if (!props.onInput) return

    if (props.debounce) {
      trigger(e)
    } else {
      props.onInput(e)
    }
  }

  const onFocusToggle: JSX.EventHandler<HTMLInputElement, FocusEvent> = e => {
    if (!touched()) {
      setTouched(true)
    }
    if (wrapperRef?.classList.contains(styles.focused)) {
      setFocused(false)
    } else {
      setFocused(true)
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

  const isRequireError = () => {
    return !value() && props.required && touched() && !focused() ? `${props.label} is required` : ''
  }

  return (
    <div
      class={classNames(styles.input, props.class, props.platform ?? 'ios')}
      classList={{
        [styles.focused as string]: focused() || !!value(),
      }}
      ref={wrapperRef}
    >
      <div class={styles.content}>
        <InputLabel
          class={classNames(styles.label)}
          name={props.name}
          label={props.label}
          required={props.required}
        />
        <input
          class={styles.field}
          ref={handleRef}
          {...inputProps}
          id={props.name}
          value={value()}
          onInput={onInput}
          onFocus={onFocusToggle}
          onBlur={onFocusToggle}
        />
        <Show when={value()}>
          <IoCloseOutline class={styles.cross} onClick={onClear} />
        </Show>
        <InputError
          class={styles.error}
          error={props.error || isRequireError()}
          name={props.name}
        />
      </div>
    </div>
  )
}
