import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'about - fisrt steps',
  description: 'About - Description',
  keywords: ['About Page', 'Acerca de', 'información', '...'],
}

export default function AboutPage() {
  return (
    <>
      <span className="text-7xl">AboutPage</span>
    </>
  )
}
