import EditableImage from './editing/EditableImage'
import styles from './ImageSection.module.css'

interface ImageSectionProps {
  /** Path into PageContent for this image URL */
  path: string[]
  src: string
  variant: 'centered' | 'fullBleed'
  /** Extra bottom spacing: 'xl' = 128px, 'l+m' = 128px, 'm' = 48px */
  spacing?: 'xl' | 'l+m' | 'm'
}

export default function ImageSection({
  path,
  src,
  variant,
  spacing = 'xl',
}: ImageSectionProps) {
  return (
    <section className={`${styles.section} ${variant === 'fullBleed' ? styles.fullBleed : ''}`}>
      <div className={variant === 'centered' ? styles.frameCentered : styles.frameFullBleed}>
        <EditableImage path={path} src={src} alt="Project visual" className={styles.img} />
      </div>
      <div
        className={styles.spacer}
        style={{
          height:
            spacing === 'xl' ? 'var(--space-xl)' :
            spacing === 'l+m' ? 'calc(var(--space-l) + var(--space-m))' :
            'var(--space-m)',
        }}
      />
    </section>
  )
}
