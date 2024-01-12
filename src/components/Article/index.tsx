import { Component } from 'solid-js'
import styles from './styles.module.scss'

export const Article: Component<{ item: string; OnClick?: VoidFunction }> = ({ item, OnClick }) => {
  return (
    <article class={styles.article} onClick={OnClick}>
      {item}
    </article>
  )
}
