'use client'

import { useEditing } from './EditingProvider'
import styles from './EditableImage.module.css'

interface EditableImageProps {
  path: string[]
  src: string
  alt?: string
  className?: string
  style?: React.CSSProperties
}

export default function EditableImage({
  path,
  src,
  alt = '',
  className,
  style,
}: EditableImageProps) {
  const { isEditing, setField } = useEditing()

  function handleClick() {
    if (!isEditing) return
    const url = window.prompt('Enter image URL:', src)
    if (url && url.trim()) {
      setField(path, url.trim())
    }
  }

  return (
    <div
      className={`${styles.wrapper} ${isEditing ? styles.editing : ''} ${className ?? ''}`}
      style={style}
      onClick={handleClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={styles.img} />
      {isEditing && (
        <div className={styles.overlay}>
          <span className={styles.icon}>🖼</span>
          <span className={styles.label}>Click to change image</span>
        </div>
      )}
    </div>
  )
}
