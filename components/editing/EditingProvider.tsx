'use client'

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import type { PageContent } from '@/content/rock-dove'

interface EditingContextValue {
  isEditing: boolean
  draft: PageContent
  setField: (path: string[], value: string) => void
  save: () => Promise<void>
  isSaving: boolean
  toggleEditing: () => void
}

const EditingContext = createContext<EditingContextValue | null>(null)

export function useEditing() {
  const ctx = useContext(EditingContext)
  if (!ctx) throw new Error('useEditing must be used inside <EditingProvider>')
  return ctx
}

function setNestedValue(obj: Record<string, unknown>, path: string[], value: string): Record<string, unknown> {
  const [head, ...rest] = path
  if (rest.length === 0) {
    return { ...obj, [head]: value }
  }
  return {
    ...obj,
    [head]: setNestedValue((obj[head] ?? {}) as Record<string, unknown>, rest, value),
  }
}

export default function EditingProvider({
  children,
  initialContent,
}: {
  children: React.ReactNode
  initialContent: PageContent
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<PageContent>(initialContent)
  const [isSaving, setIsSaving] = useState(false)
  // Keep a ref to the latest draft so the save handler always reads fresh data
  const draftRef = useRef(draft)
  draftRef.current = draft

  const setField = useCallback((path: string[], value: string) => {
    setDraft(prev =>
      setNestedValue(prev as unknown as Record<string, unknown>, path, value) as unknown as PageContent
    )
  }, [])

  const save = useCallback(async () => {
    setIsSaving(true)
    try {
      await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draftRef.current),
      })
    } finally {
      setIsSaving(false)
    }
  }, [])

  const toggleEditing = useCallback(() => {
    setIsEditing(v => !v)
  }, [])

  return (
    <EditingContext.Provider value={{ isEditing, draft, setField, save, isSaving, toggleEditing }}>
      {children}
    </EditingContext.Provider>
  )
}
