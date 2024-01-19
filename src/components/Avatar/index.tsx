import { Component, Show, createSignal } from 'solid-js'
import styles from './styles.module.scss'
import { classNames } from '@tma.js/sdk'

type AvatarProps = {
  url?: string
  name?: string
  size: number
}

export const Avatar: Component<AvatarProps> = props => {
  const [isPictureLoaded, setIsPictureLoaded] = createSignal<boolean>(false)

  const bgColors = [
    ['#ff885e', '#ff516a'],
    ['#ffcd6a', '#ffa85c'],
    ['#82b1ff', '#665fff'],
    ['#a0de7e', '#54cb68'],
    ['#53edd6', '#28c9b7'],
    ['#72d5fd', '#2a9ef1'],
    ['#e0a2f3', '#d669ed'],
  ]

  const abbreviation = () => {
    if (!props.name) return ''
    return props.name.charAt(0).toUpperCase()
  }

  const backgroundColor = () => {
    const [topColor, bottomColor] = bgColors[
      Math.floor(Math.random() * bgColors.length)
    ] as string[]

    return `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`
  }

  return (
    <div
      class={classNames(styles.avatar)}
      style={{
        'background-image': backgroundColor(),
        width: `${props.size}px`,
        height: `${props.size}px`,
      }}
    >
      <Show when={!isPictureLoaded()}>
        <div class={styles.placeholder}>{abbreviation()}</div>
      </Show>
      <Show when={props.url}>
        <img
          class={styles.image}
          src={props.url}
          alt={props.name ?? ''}
          onLoad={() => setIsPictureLoaded(true)}
        />
      </Show>
    </div>
  )
}

export default Avatar
