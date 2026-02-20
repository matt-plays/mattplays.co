'use client'

import { useEffect, useRef } from 'react'
import { useEditing } from './EditingProvider'

interface EditableTextProps {
  /** Dot-path into PageContent, e.g. ['hero', 'title'] */
  path: string[]
  value: string
  className?: string
  style?: React.CSSProperties
}

export default function EditableText({ path, value, className, style }: EditableTextProps) {
  const { isEditing, setField } = useEditing()
  const ref = useRef<HTMLDivElement>(null)

  // When editing is turned off, sync the source-of-truth value back into the DOM
  useEffect(() => {
    if (!isEditing && ref.current) {
      ref.current.innerHTML = value.replace(/\n/g, '<br>')
    }
  }, [isEditing, value])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        outline: isEditing ? '2px solid rgba(59,130,246,0.5)' : 'none',
        outlineOffset: isEditing ? '3px' : undefined,
        borderRadius: isEditing ? '3px' : undefined,
        cursor: isEditing ? 'text' : undefined,
        whiteSpace: 'pre-wrap',
      }}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onBlur={e => {
        if (isEditing) {
          setField(path, e.currentTarget.innerText)
        }
      }}
      dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br>') }}
    />
  )
}
