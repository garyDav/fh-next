# Temas puntuales de la sección 6

## Temas puntuales de la sección

Esta sección está dedicada principalmente a la generación estática de contenido, el objetivo principal de este mecanismo, es adelantarnos a las posibles solicitudes de nuestros usuarios y tener generadas de antemano las posibles páginas que ellos van a solicitar.

Es decir, en **"build time"** o tiempo de construcción, crearemos todas las páginas acorde a nuestras reglas, y luego le añadiremos condiciones de re-validación para que se renueven cuando el momento lo amerite.

### Generación estática y Revalidación

- Generaremos de manera estática los 151 pokémons, desde la terminal del navegador: `Array.from({ length: 151 }).map( (v, i) => i + 1 )`, algo así lo harímaos con una base de datos real.

- Esto hay que hacerlo, por cáda una de las páginas estáticas que ustedes van a querer, dentro de `@app/dashboard/pokemon/[id]/page.tsx`.

- Luego de `interface Props` creamos la función con exactamente ese nombre:

  ```tsx
  //! Esto sólo se ejecutará en build time
  export async function generateStaticParams() {
    return [ // Debe retornar lo mismo que tiene Props.params
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
      { id: '5' },
      { id: '6' },
    ]
  }
  ```

- Cancelamos la ejecución y realizamos el build `pnpm run build`.

- Para verlo vamos a `.next/server/app/dashboard/pokemon/`.

- Incluimos el script:

  ```tsx
  export async function generateStaticParams() {
    const static151Pokemons = Array.from({ length: 151 }).map( (v, i) => `${i + 1}` )

    return static151Pokemons.map( id => ({
      id: id
    }))
  }
  ```

- No es necesario tener el Revalidate y el Force Cache, en `getPokemon(...)` quitar o comentar `cache: 'force-cache'`.

- Cuando pedimos por ejemplo el pokémon `15000`, se genera también el contenido estático pero del error `404`, y por el tiempo que esté mi revalidate estará con esa página generada estáticamente.

- Tarea crear otra pagina para que busque pokémon por su nombre en: `dashboard/pokemons/[name]` usando el siguiente URL: `https://pokeapi.co/api/v2/pokemon/ditto`, luego configurar la generación estática de los 151 pokémons con `name`, al final cambiar la URL para ver el pokémon `/dashboar/pokemons/${name}`.

- Revalidación - Sin Fetch API: `https://nextjs.org/docs/app/getting-started/fetching-data`.
