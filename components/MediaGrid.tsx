import styles from './MediaGrid.module.css'

/** A 2-column grid of placeholder media frames (3 cols × 4 rows of 1:1 cells each) */
export default function MediaGrid() {
  const rows = [0, 1, 2, 3]
  const cols = [0, 1, 2]

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {[0, 1].map(colIdx => (
          <div key={colIdx} className={styles.mediaFrame}>
            {rows.map(r => (
              <div key={r} className={styles.row}>
                {cols.map(c => (
                  <div key={c} className={styles.cell} />
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.spacer} />
    </section>
  )
}
