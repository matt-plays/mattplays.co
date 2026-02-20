import styles from './Footer.module.css'
import type { PageContent } from '@/content/rock-dove'

interface FooterProps {
  footer: PageContent['footer']
}

export default function Footer({ footer }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.spacerL} />

        {/* Logo */}
        <div className={styles.logo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={footer.logoUrl} alt="Logo" />
        </div>

        <div className={styles.spacerXl} />

        {/* Nav + Newsletter row */}
        <div className={styles.mainRow}>
          <nav className={styles.navList}>
            <a href="#">Work</a>
            <a href="#">Info</a>
            <a href="#">Blog</a>
            <a href="#">Shop</a>
          </nav>

          <div className={styles.newsletter}>
            <p className={styles.newsletterLabel}>{footer.newsletter.label}</p>
            <div className={styles.emailCatcher}>
              <div className={styles.emailInput}>
                <span className={styles.inputText}>{footer.newsletter.placeholder}</span>
              </div>
              <button className={styles.emailBtn}>{footer.newsletter.buttonLabel}</button>
            </div>
          </div>
        </div>

        <div className={styles.spacerL} />

        {/* Horizontal rule */}
        <div className={styles.hr}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={footer.hrImage} alt="" />
        </div>

        <div className={styles.spacerM} />

        {/* Link columns + origin */}
        <div className={styles.bottomRow}>
          <div className={styles.linkCols}>
            {footer.linkColumns.map(col => (
              <div key={col.heading} className={styles.linkCol}>
                <p className={styles.linkColLabel}>{col.heading}</p>
                <div className={styles.linkColSpacer} />
                <div className={styles.linkList}>
                  {col.links.map(link => (
                    <a key={link} href="#">{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.origin}>
            <div className={styles.geoIcon}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={footer.origin.geoIconUrl} alt="" />
            </div>
            <p className={styles.originLabel}>{footer.origin.label}</p>
            <div className={styles.originLogo}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={footer.origin.logoUrl} alt="New England" />
            </div>
          </div>
        </div>

        <div className={styles.spacerM} />
      </div>
    </footer>
  )
}
