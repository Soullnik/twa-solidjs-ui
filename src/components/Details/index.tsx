import { ParentComponent } from 'solid-js'
import styles from './styles.module.scss'

type DetailsProps = {
  title: string
}

export const Details: ParentComponent<DetailsProps> = props => {
  return (
    <details>
      <summary>{props.title}</summary>
      {props.children}
    </details>
  )
}
