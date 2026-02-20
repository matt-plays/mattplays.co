import Nav from './Nav'
import EditableText from './editing/EditableText'
import EditableImage from './editing/EditableImage'
import styles from './Hero.module.css'
import type { PageContent } from '@/content/rock-dove'

interface HeroProps {
  hero: PageContent['hero']
  logoUrl: string
}

export default function Hero({ hero, logoUrl }: HeroProps) {
  return (
    <section className={styles.heroWrap}>
      <div className={styles.heroSection}>
        {/* Nav sits on the page-bg color strip */}
        <Nav logoUrl={logoUrl} />

        {/* Hero image (1920×1080, clips to container width) */}
        <div className={styles.imageContainer}>
          <div className={styles.imageFrame}>
            <EditableImage
              path={['hero', 'heroImage']}
              src={hero.heroImage}
              alt="Hero case study image"
              className={styles.heroImg}
            />
          </div>

          {/* Type section below the image */}
          <div className={styles.typeSection}>
            <div className={styles.typeContent}>
              <div className={styles.typeInner}>
                <EditableText
                  path={['hero', 'label']}
                  value={hero.label}
                  className={styles.label}
                />

                <div className={styles.spacerM} />

                <EditableText
                  path={['hero', 'title']}
                  value={hero.title}
                  className={styles.h1}
                />

                <div className={styles.spacerM} />

                {/* Horizontal rule */}
                <div className={styles.hr}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={hero.hrImage} alt="" />
                </div>

                <div className={styles.spacerM} />

                <div className={styles.meta}>
                  <EditableText
                    path={['hero', 'description']}
                    value={hero.description}
                    className={styles.description}
                  />
                  <EditableText
                    path={['hero', 'role']}
                    value={hero.role}
                    className={styles.role}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
