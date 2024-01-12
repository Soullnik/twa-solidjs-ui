import { useNavigator } from '../../providers'
import { Component, onCleanup, onMount } from 'solid-js'
import { useBackButton } from '../../hooks'
import styles from './styles.module.scss'

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
    if (navigator) {
      navigator.detach()
    }
  })

  onCleanup(() => {
    backButton().off('click', onClick)
    if (navigator) {
      navigator.attach()
    }
  })

  return <></>
}
