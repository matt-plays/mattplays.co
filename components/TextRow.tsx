import EditableText from './editing/EditableText'
import styles from './TextRow.module.css'
import type { PageContent } from '@/content/rock-dove'

interface TextRowProps {
  strategy: PageContent['strategy']
}

export default function TextRow({ strategy }: TextRowProps) {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <EditableText
          path={['strategy', 'label']}
          value={strategy.label}
          className={styles.label}
        />
        <div className={styles.spacer} />
        <EditableText
          path={['strategy', 'body']}
          value={strategy.body}
          className={styles.body}
        />
      </div>
      <div className={styles.spacerXl} />
    </section>
  )
}
