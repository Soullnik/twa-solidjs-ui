import { ParentComponent } from 'solid-js'
import styles from './styles.module.scss'

type ArticleProps = { title: string }

export const Article: ParentComponent<ArticleProps> = props => {
  return (
    <article class={styles.article}>
      <h2 class={styles.title}>{props.title}</h2>
      <hr class={styles.divider} />
      <div class={styles.container}>{props.children}</div>
    </article>
  )
}
