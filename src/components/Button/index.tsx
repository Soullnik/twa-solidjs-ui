import { classNames } from '@tma.js/sdk'
import styles from './styles.module.scss'

type ButtonProps = {
  onClick: VoidFunction
  text: string
  class?: string | string[]
}

export const Button = (props: ButtonProps) => {
  const classes = () => {
    return Array.isArray(props.class) ? props.class : [props.class]
  }

  return (
    <button type="button" class={classNames(styles.button, ...classes())} onClick={props.onClick}>
      {props.text}
    </button>
  )
}
