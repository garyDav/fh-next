import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Title',
  description: 'About Description',
  keywords: ['About Page', 'Gary', 'información', '...'],
}

export default function AboutPage() {
  return (
    <>
      <span className='text-7xl'>About Page</span>
    </>
  )
}
