import { useBackButton } from '../../hooks'
import { useNavigator } from '../../providers/index'
import { Component, Show, onCleanup, onMount } from 'solid-js'
import styles from './styles.module.scss'
import { classNames } from '@tma.js/sdk'

type BackButtonProps = {
  onClick: VoidFunction
}

export const BackButton: Component<BackButtonProps> = props => {
  const backButton = useBackButton()
  const navigator = useNavigator()

  const onClick = () => {
    setTimeout(() => {
      props.onClick()
    }, 0)
  }

  onMount(() => {
    backButton().on('click', onClick)
    navigator?.detach()
  })

  onCleanup(() => {
    backButton().off('click', onClick)
    navigator?.attach()
  })

  return (
    <Show when={!backButton}>
      <button onClick={props.onClick} class={classNames(styles.backButton)}>
        {'<-'}
      </button>
    </Show>
  )
}
