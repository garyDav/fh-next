import { Layout } from '@/components/layouts'
import { Button } from '@nextui-org/react'
import { NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <Layout title='Listado de Pokemons'>
      <h1>Hola Mundo</h1>
      <Button color='gradient'>Hola</Button>
    </Layout>
  )
}

export default HomePage
