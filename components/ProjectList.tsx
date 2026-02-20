import styles from './ProjectList.module.css'
import type { ProjectItem } from '@/content/rock-dove'

interface ProjectListProps {
  items: ProjectItem[]
}

export default function ProjectList({ items }: ProjectListProps) {
  return (
    <section className={styles.list}>
      {items.map((item, i) => (
        <div key={i} className={styles.item}>
          <div className={styles.itemInner}>
            <div className={styles.rowSpacer} />
            <div className={styles.details}>
              <div className={styles.arrow}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.arrowUrl} alt="→" />
              </div>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.role}>{item.role}</p>
              <div className={styles.btn}>
                <span className={styles.btnIcon}>↗</span>
              </div>
            </div>
            <div className={styles.rowSpacer} />
          </div>
        </div>
      ))}
      <div className={styles.spacerXl} />
    </section>
  )
}
