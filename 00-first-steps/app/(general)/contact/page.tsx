import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Page',
  description: 'Contact Description',
  keywords: ['Contact Page', 'David', '...'],
}

export default function ContactPage() {
  return (
    <>
      <span className='text-7xl'>Contact Page</span>
    </>
  )
}
