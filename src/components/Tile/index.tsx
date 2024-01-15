import { Component } from 'solid-js'
import { classNames } from '@tma.js/sdk'

import styles from './styles.module.scss'

export const Tile: Component<{
  class?: string
  text?: string
  onClick?: VoidFunction
  picture?: string
}> = props => (
  <button
    class={classNames(styles.tile, props.class)}
    style={{
      'background-image': props.picture ? `url(${props.picture})` : 'none',
    }}
    onClick={props.onClick}
  >
    <span>{props.text}</span>
  </button>
)
