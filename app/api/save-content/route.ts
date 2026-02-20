import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import type { PageContent } from '@/content/rock-dove'

// Only allow writes in development
export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 })
  }

  const content: PageContent = await req.json()

  const filePath = path.join(process.cwd(), 'content', 'rock-dove.ts')

  const fileContent = `export interface CreditColumn {
  label: string
  names: string[]
}

export interface ProjectItem {
  title: string
  role: string
  arrowUrl: string
}

export interface FooterLinkColumn {
  heading: string
  links: string[]
}

export interface PageContent {
  hero: {
    label: string
    title: string
    description: string
    role: string
    heroImage: string
    hrImage: string
  }
  strategy: {
    label: string
    body: string
  }
  images: {
    centered1: string
    fullBleed1: string
    centered2: string
    centered3: string
    fullBleed2: string
  }
  credits: CreditColumn[]
  projectList: ProjectItem[]
  footer: {
    logoUrl: string
    newsletter: {
      label: string
      placeholder: string
      buttonLabel: string
    }
    hrImage: string
    linkColumns: FooterLinkColumn[]
    origin: {
      geoIconUrl: string
      label: string
      logoUrl: string
    }
  }
}

const content: PageContent = ${JSON.stringify(content, null, 2)}

export default content
`

  await fs.writeFile(filePath, fileContent, 'utf-8')

  return NextResponse.json({ ok: true })
}
