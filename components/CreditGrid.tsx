import styles from './CreditGrid.module.css'
import type { CreditColumn } from '@/content/rock-dove'

interface CreditGridProps {
  credits: CreditColumn[]
}

export default function CreditGrid({ credits }: CreditGridProps) {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {credits.map((col, i) => (
          <div key={i} className={styles.col}>
            <p className={styles.label}>{col.label}</p>
            <div className={styles.spacer} />
            <div className={styles.list}>
              {col.names.map(name => (
                <p key={name}>{name}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.spacerXl} />
    </section>
  )
}
