import { FC, PropsWithChildren } from 'react'

import Head from 'next/head'
import { Navbar } from '../ui'

interface Props {
  title?: string
}

export const Layout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Gary Guzman' />
        <meta
          name='description'
          content={`Información sobre el pokemon ${title}`}
        />
        <meta name='keywords' content={`${title}, pokemon, pokedex`} />
      </Head>

      <Navbar />

      <main
        style={{
          padding: '0px, 20px',
        }}>
        {children}
      </main>
    </>
  )
}
