import styles from './SiteCompSection.module.css'

interface SiteCompSectionProps {
  /** Show the dark fade overlay (first instance only) */
  showFade?: boolean
  /** Show top spacer (first instance only) */
  topSpacer?: boolean
  /** Bottom spacer height */
  bottomSpacing?: 'xl' | 'none'
}

export default function SiteCompSection({
  showFade = false,
  topSpacer = false,
  bottomSpacing = 'xl',
}: SiteCompSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.bg}>
        {topSpacer && <div className={styles.spacerSquare} />}
        <div className={styles.wrapper}>
          {showFade && (
            <div className={styles.fade}>
              <div className={styles.fadeSolid} />
              <div className={styles.fadeGradient} />
            </div>
          )}
          {/* Website screenshot placeholder */}
          <div className={styles.visual} />
        </div>
        <div className={styles.spacerSquare} />
      </div>
      {bottomSpacing === 'xl' && <div className={styles.spacerBottom} />}
    </section>
  )
}
