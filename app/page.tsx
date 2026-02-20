import content from '@/content/rock-dove'
import EditingProvider from '@/components/editing/EditingProvider'
import EditingToolbar from '@/components/editing/EditingToolbar'
import Hero from '@/components/Hero'
import TextRow from '@/components/TextRow'
import ImageSection from '@/components/ImageSection'
import MediaGrid from '@/components/MediaGrid'
import SiteCompSection from '@/components/SiteCompSection'
import CreditGrid from '@/components/CreditGrid'
import ProjectList from '@/components/ProjectList'
import Footer from '@/components/Footer'
import styles from './page.module.css'

export default function Page() {
  return (
    <EditingProvider initialContent={content}>
      <main className={styles.page}>

        {/* 1 — Hero */}
        <Hero hero={content.hero} logoUrl={content.footer.logoUrl} />

        {/* 2 — Strategy text */}
        <TextRow strategy={content.strategy} />

        {/* 3 — Centered image */}
        <ImageSection
          path={['images', 'centered1']}
          src={content.images.centered1}
          variant="centered"
          spacing="l+m"
        />

        {/* 4 — Full-bleed image */}
        <ImageSection
          path={['images', 'fullBleed1']}
          src={content.images.fullBleed1}
          variant="fullBleed"
          spacing="xl"
        />

        {/* 5 — Centered image */}
        <ImageSection
          path={['images', 'centered2']}
          src={content.images.centered2}
          variant="centered"
          spacing="m"
        />

        {/* 6 — Media grid (2 columns of placeholder frames) */}
        <MediaGrid />

        {/* 7 — Centered image */}
        <ImageSection
          path={['images', 'centered3']}
          src={content.images.centered3}
          variant="centered"
          spacing="l+m"
        />

        {/* 8 — Full-bleed image */}
        <ImageSection
          path={['images', 'fullBleed2']}
          src={content.images.fullBleed2}
          variant="fullBleed"
          spacing="xl"
        />

        {/* 9 — Second media grid */}
        <MediaGrid />

        {/* 10 — Site comp section with dark fade */}
        <SiteCompSection showFade topSpacer />

        {/* 11 — Second site comp section */}
        <SiteCompSection bottomSpacing="xl" />

        {/* 12 — Credits */}
        <CreditGrid credits={content.credits} />

        {/* 13 — Project list */}
        <ProjectList items={content.projectList} />

        {/* 14 — Footer */}
        <Footer footer={content.footer} />

      </main>

      {/* Edit toolbar — only shown in development */}
      {process.env.NODE_ENV === 'development' && <EditingToolbar />}
    </EditingProvider>
  )
}
