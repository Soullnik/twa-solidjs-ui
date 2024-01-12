import { Accessor } from 'solid-js'
import { isAccessor } from '../../utils'

import styles from './styles.module.scss'

type ProgressProps = {
  max: number
  value: number | Accessor<number>
}

export function Progress(props: ProgressProps) {
  const widthPercentage = () => {
    const value = isAccessor(props.value) ? props.value() : props.value
    return (value / props.max) * 100
  }

  return (
    <div class={styles.progress}>
      <div class={styles.value} style={{ width: `${widthPercentage()}%` }}></div>
    </div>
  )
}
