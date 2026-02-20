import styles from './Nav.module.css'

interface NavProps {
  logoUrl: string
}

export default function Nav({ logoUrl }: NavProps) {
  return (
    <div className={styles.nav}>
      <div className={styles.spacer} />
      <div className={styles.inner}>
        <div className={styles.logo}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt="Logo" />
        </div>
        <nav className={styles.links}>
          <a href="#">Work</a>
          <a href="#">Info</a>
          <a href="#">Blog</a>
          <a href="#">Shop</a>
        </nav>
      </div>
      <div className={styles.spacer} />
    </div>
  )
}
