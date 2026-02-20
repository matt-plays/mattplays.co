'use client'

import { useEditing } from './EditingProvider'
import styles from './EditingToolbar.module.css'

export default function EditingToolbar() {
  const { isEditing, toggleEditing, save, isSaving } = useEditing()

  return (
    <div className={styles.toolbar}>
      {isEditing && (
        <button
          className={`${styles.btn} ${styles.save}`}
          onClick={save}
          disabled={isSaving}
        >
          {isSaving ? 'Saving…' : 'Save'}
        </button>
      )}
      <button
        className={`${styles.btn} ${isEditing ? styles.active : ''}`}
        onClick={toggleEditing}
      >
        {isEditing ? 'Done' : 'Edit'}
      </button>
    </div>
  )
}
