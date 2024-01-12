import { RGB, classNames } from '@tma.js/sdk'
import { useHapticFeedback, useMainButton } from '../../hooks'
import { Component, Show, createEffect, createSignal, onCleanup } from 'solid-js'
import styles from './styles.module.scss'

type MainButtonProps = {
  color?: RGB
  text: string
  onClick: VoidFunction
  loading?: boolean
}

export const MainButton: Component<MainButtonProps> = props => {
  const mainButton = useMainButton()
  const hapticFeedback = useHapticFeedback()
  const [_] = createSignal(props.loading)

  const onClickHandler = () => {
    hapticFeedback().impactOccurred('medium')
    props.onClick()
  }

  createEffect(() => {
    if (mainButton) {
      mainButton().setText(props.text)
    }
  })

  createEffect(() => {
    if (mainButton) {
      mainButton().setText(props.text)
    }
  })

  createEffect(() => {
    if (props.color && mainButton) {
      mainButton().setBackgroundColor(props.color)
    }
  })

  createEffect(value => {
    if (props.onClick !== value && mainButton) {
      mainButton().off('click', onClickHandler)
      mainButton().on('click', onClickHandler)
      if (!mainButton().isVisible) {
        mainButton().show()
      }
    }
  })

  createEffect(() => {
    if (mainButton) {
      if (props.loading) {
        mainButton().disable().showLoader()
      } else {
        mainButton().enable().hideLoader()
      }
    }
  })

  onCleanup(() => {
    if (mainButton) {
      mainButton().off('click', onClickHandler)
      mainButton().hide()
    }
  })

  return (
    <Show when={!mainButton}>
      <button onClick={props.onClick} class={classNames(styles.mainButton)}>
        {props.text}
      </button>
    </Show>
  )
}
