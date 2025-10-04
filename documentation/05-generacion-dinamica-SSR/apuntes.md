# Temas puntuales de la sección 5

## Temas puntuales de la sección

**Esta sección tiene por objetivo lo siguiente:**

* Manejo de Metadata dinámica

* Páginas generadas del lado del servidor - SGR

* Páginas de errores

* Validación de argumentos

* Redirecciones

* Prioridad de Carga de imágenes

* Tipos de revalidación con Fetch y sin Fetch

* Estructuras HTML con Tailwind

* Entre otras cosas.

El objetivo es ir creando esta aplicación que pueda aprovechar lo generado del lado del servidor como también contenido generado por el cliente.

---

* Continuamos con el proyecto `02-my-dashboard`.

  - Primero añadimos `app/dashboard/pokemons/page.tsx` con la página `PokemonsPage`.

  - Añadimos esta página a nuestro `Sidebar`, con el icono `IoFootball` y el `subTitle: 'Generación Estática'`.

  - Data fetching `Next13+` [Fetching Data](https://nextjs.org/docs/app/getting-started/fetching-data "Doc. Next Feching Data"), asegurense de estar en `Using App Router`.

  - Este `Fetching Data` está construido basado en `fetch API` sólo que Next añade funcionalidades nuevas.

  - Digamos que 100 000 millones de personas hacen la misma petición al mismo `endpoint` durante esos `10` segundos eso se queda en `cache`, luego se almacenará la nueva respuesta por otros 10 segundos, eso nos ayuda a tener `performance` en nuestra aplicación.

  - Esto es gracias al `revalidate` o el `force-cache`, esto almacena la información al rededor de todos los `request` que se van hacer, o sea se comparten todos. Esto se tiene que evitar si nosotros tenemos data específica del usuario cuando por ejemplo manejamos algo de `cookies`

  - Realizamos una petición a [Pokemon API](https://pokeapi.co/ "API"), abrimos nuestro Postman y pegamos `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`.

  - Vamos al `page` de `pokemons`, antes del `export` de la página.

    ```tsx
    const getPokemons = async(limit = 20, offset = 0) => {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then( res => res.json() )

      return data
    }

    export default async function PokemonsPage() {
      const pokemons = await getPokemons();

      return (
        <div>
          { JSON.stringify(pokemons) }
        </div>
      )
    }
    ```

  - Ahora quisiera crear la interfaz para manejar este tipo de respuesta, ¿Donde Iría?, en `@/components`?, en `@app/dashboard`?, no tiene mucho sentido ponerlo ahí, en `@/shopping-cart`? tampoco.

  - Pero si tendría sentido crearse una carpeta que tenga todo lo relacionado a `pokemons`, una carpeta de módulo relacionado a `pokemons`.

  - Entonces creamos `@/pokemons/interfaces/pokemons-response.ts`, copiamos la data de Postman, estará en nuestro `clipboard`, nos dirigimos a [Quicktype](https://quicktype.io/ "Convert JSON to typesafe"), y pegamos como fuente `JSON` y salida `TypeScript`.

    ```ts
    export interface PokemonsResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];
    }

    export interface Result {
        name: string;
        url:  string;
    }
    ```

  - Adicionalmente creamos otra interfaz `simple-pokemon.ts`.

    ```ts
    export interface SimplePokemon {
      id:   string;
      name: string;
    }
    ```

  - Al tener un nuevo módulo, crearemos nuestro archivo barril `@/pokemons/index.ts`.

    ```ts
    export type { PokemonsResponse } from './interfaces/pokemons-reponse'
    export type { SimplePokemon } from './interfaces/simple-pokemon'
    ```

  - Cerramos todo y nos dirigimos a `dashboard/pokemons/page.tsx`, en la `array function` -> `getPokemons = async(...):Promise<SimplePokemon[]>`, añadimos también el tipo para `data:PokemonsResponse`, pero como la función debe regrear un arreglo de pokemons, para esto moldeamos a partir de `map` para que nuestra función nos devuelva un arreglo de `SimplePokemon[]`.

    ```tsx
    const getPokemons = async ... => {
      // ...

      const pokemons = data.results.map( pokemon => ({
        id: pokemon.url.split('/').at(-2)!, // del arreglo tomaré la "penúltima" posición. '!' para obligar que siempre vendrá.
        name: pokemon.name
      }))

      // ...
    }
    ```

  - Una vez grabado los cambios, ya tendremos un arreglo de objetos con el `id y name`.

  - Para mostrar las imágenes en `dashboard/pokemons/page.tsx`. Buscamos cualquier pokemon `https://pokeapi.co/api/v2/pokemon/1`, vamos a postman y realizamos la petición `http`, buscamos la propiedad `sprites` -> `other` -> `dream_world`, y copiamos el `url`.

    ```tsx
    // ...

    return (
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-10 items-center justigy-center">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg`}
            width={100}
            height={100}
            alt={'nombre'}
          />
        </div>
      </div>
    )
    ```

  - Reto, a partir de toda la lista de `pokemons` añadirlo a nuestro `page`, añadir el `id` a `src` y a `key`.

  - En `Sidebar` en nuestro `<div id="menu">` quitamos la clase `h-screen`

* Pensemos en componentes pequeños.

  - En nuestro `PokemonsPage` despues del primer `div` añadiremos `<span className="text-5xl my-2">Listado de Pokémons <small>estático</small></span>`.

  - Utilizaremos un `card` para cada pokémon [Tailwind Card](https://www.creative-tim.com/twcomponents/component/user-card-7 "TW component Card")

  - Añadimos a nuestro nuevo componente en `@/pokemons/components/PokemonGrid.tsx` cortamos nuestro `div` que envuelve al listado de `pokemons.map(...)`.

    ```tsx
    interface Props {
      pokemons: SimplePokemon[];
    }

    export const PokemonGrid = ({ pokemons }:Props) => {
      return (...)
    }
    ```

  - Antes de usar nuestro `Grid` exportemoslo desde nuestro archivo barril `index.ts` -> `export { PokemonGrid } from './components/PokemonGrid'`.

  - Añadimos a nuestro `page` -> `<PokemonGrid pokemons={ pokemons } />`

  - Creamos otro component para cada Card `PokemonCard.tsx` que será cada tarjeta para cada uno de lo pokémon.

  - Colocamos el contenido necesario en el card.

* Prioridad de carga.

  - Si lo dejamos tal y como está al recargar la página carga todos los pókemos los 151, cosa que no les gustará a los boots de google.

  - En `PokemonCard` Añadir `priority={false}` como propiedad de mi componente `Image`.

  - Ahora sí estas imágenes serán cargadas bajo demanda, por defecto esta propiedad está en `true`.

  - Lo mismo pasa con los `Link` por defecto se realizan las peticiones de los pókemos que se ven en pantalla, eso se guarda en `cache` ya listo para usarlo, podemos probarlo con `pnpm run build` y `pnpm start`.

  - [Doc. NextJS - Image -> priority](https://nextjs.org/docs/app/api-reference/components/image#priority "api-reference -> Image -> priority")

* Error Page - NextJS.

  - Intentemos generar un error desde `pokemons/page.tsx` dentro del método `getPokemons` añadimos un `throw new Error('Esto es un error que no debería de suceder')`

  - Vemos cómo nos muestra ese error Next.

  - Creamos un archivo llamado `app/dashboard/pokemons/error.tsx` y mostramos `error.message`.

  - Para ver como utilizar este archivo [Doc. NextJS - Error Handling](https://nextjs.org/docs/app/getting-started/error-handling "NextJS -> Error Handling").

  - podemos utilizar la [Plantilla Error 500](https://www.creative-tim.com/twcomponents/component/tailwind-css-500-server-error-illustration "TWComponents -> ServerError")

* Rutas dinámicas - Argumentos por URL.

  - Intentaremos generar un error 404.

  - Para esto primero crearemos una ruta dinámica en `app/dashboard/pokemon/[id]/page.tsx` creamos nuestro `functional component`.

  - Ahora si intenamos acceder a cualquier pokemon veremos que la página existe.

    ```tsx
    // [id]/page.tsx
    export default PokemonPage(props: any) {
      console.log({ props })

      return (
        <div>
          <h1>Hello Pokemon Page</h1>
        </div>
      )
    }

    // Accedemos a http://.../pokemon/4?q=char&age=30&gender=female
    ```

    ```fish
    {
      props: { id: '4' },
      searchParams: { q: 'char', age: '30', gender: 'female'}
    }
    ```

  - Añadimos los `Props`.

    ```tsx
    interface Props {
      params: { id: string }
    }

    export default function PokemonPage({ params }: Props) {
      return (
        <div>
          <h1>Pokémon { params.id }</h1>
        </div>
      )
    }
    ```

* Cargar Información del Pokémon por ID.

  - Realizamos la petición por pokémon en `postman` copiamos la respuesta, obtenemos los tipos por `quicktype.io` pegamos y exportamos en `@/pokemons/interfaces/pokemon.ts`, añadimos a nuestro archivo barril `index.ts`.

    ```tsx
    import { Pokemon } from '@/pokemons'

    interface ...

    const getPokemon = async (id: string): Promise<Pokemon> => {
      const pokemon = fetch(`http://.../${id}`, { cache: 'force-cache' }).then( resp => resp.json() ) // force-cache es el valor por defecto

      console.log('Se cargó: ', pokemon.name)

      return pokemon
    }

    export default async function PokemonPage... {
      const pokemon = await getPokemon(params.id)

      return (
        <div>
          { JSON.stringify(pokemon) }
        </div>
      )
    }
    ```

* Metadata dinámica.

  - Antes lo hacíamos con `export const metadata = {...}`.

  - Como queremos que la metadata cambie conforme estamos en la página de un pókemon en particular, necesitamos generar un metadata dinámico.

  - Para que esto funcione debemos exportar una función asíncrona en: `app/dashboard/pokemon/[id]/page.tsx`

    ```tsx
    ...
    // Importamos Metadata
    export async function generateMetadata({ params }: Props): Promise<Metadata> {
      const { id, name } = await getPokemon(params.id)

      return {
        title: `#${ id } - ${ name }`,
        description: `Página del pokémon: ${name}`
      }
    }
    ```

  - En vez de `{ JSON.stringify(pokemon) }` retornamos: `{ pokemon.name }`

  - también podemos revalidar para que nuestra petición se cargue en un tiempo que podríamos determinar con algún calculo:

    ```tsx
    const getPokemon = async (id: string): Promise<Pokemon> => {
      const pokemon = fetch(`http://.../${id}`, {
        cache: 'force-cache'
        // next: {
        //   revalidate: 60 * 60 * 30 * 6
        // }
      }).then( resp => resp.json() )
      console.log('Se cargó: ', pokemon.name)

      return pokemon
    }
    ```

* Pantalla del Pokemon.

  - Añadir los siguientes estilos del card de `https://www.creative-tim.com/twcomponents/component/profile-information-card-horizon-ui-tailwind` para un pokemon en particular, no olviden importar `next/image`:

    ```tsx
    export default async function PokemonPage({ params }: Props) {

      const pokemon = await getPokemon(params.id);

      return (
        <div className="flex mt-5 flex-col items-center text-slate-800">
          <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
            <div className="mt-2 mb-8 w-full">
              <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
                #{pokemon.id} {pokemon.name}
              </h1>
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={pokemon.sprites.other?.dream_world.front_default ?? ''}
                  width={150}
                  height={150}
                  alt={`Imagen del pokemon ${pokemon.name}`}
                  className="mb-5"
                />


                <div className="flex flex-wrap">
                  {
                    pokemon.moves.map(move => (
                      <p key={move.move.name} className="mr-2 capitalize">{move.move.name}</p>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 px-2 w-full">

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
                <p className="text-sm text-gray-600">Types</p>
                <div className="text-base font-medium text-navy-700 flex">
                  {
                    pokemon.types.map(type => (
                      <p key={type.slot} className="mr-2 capitalize">{type.type.name}</p>
                    ))
                  }
                </div>
              </div>

              <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
                <p className="text-sm text-gray-600">Peso</p>
                <span className="text-base font-medium text-navy-700 flex">
                  {
                    pokemon.weight
                  }
                </span>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
                <p className="text-sm text-gray-600">Regular Sprites</p>
                <div className="flex justify-center">

                  <Image
                    src={pokemon.sprites.front_default}
                    width={100}
                    height={100}
                    alt={`sprite ${pokemon.name}`}
                  />

                  <Image
                    src={pokemon.sprites.back_default}
                    width={100}
                    height={100}
                    alt={`sprite ${pokemon.name}`}
                  />

                </div>
              </div>

              <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
                <p className="text-sm text-gray-600">Shiny Sprites</p>
                <div className="flex justify-center">

                  <Image
                    src={pokemon.sprites.front_shiny}
                    width={100}
                    height={100}
                    alt={`sprite ${pokemon.name}`}
                  />

                  <Image
                    src={pokemon.sprites.back_shiny}
                    width={100}
                    height={100}
                    alt={`sprite ${pokemon.name}`}
                  />

                </div>
              </div>



            </div>
          </div>
        </div>
      );
    }
    ```

  - Hay un pequeño error con el dominio de `raw.githubusercontent.com` en `Image`, lo resuelven.

  - Para esto vamos a `next.config.js`, añadimos otra entrada de HTTP.

  - Si intentamos ingresar a una ruta como `localhost:3000/dashboard/pokemon/abc`, obtendremos un error.

* Not found Page - 404.

  - Quiero mostrar un error en caso de quere obtener un pokemon que no existe, oh tratar de ingresar a una dirección que no existe.

  - Creamos un nuevo archivo `@/app/not-found.tsx` a partir del siguiente template: `https://www.creative-tim.com/twcomponents/component/404-page-not-found`, podemos revisar su documetación en: [Doc. Next Not-Found](https://nextjs.org/docs/app/api-reference/file-conventions/not-found "Next Not-Found").

  - Exportamos el componente de not-found como `export default function NotFound() {...}`, importamos el `Sidebar`.

  - Cambiamos las clases por `className`, y las anclas por `Link`.

  - Añadimos un `try catch` a `generateMetadata` en `catch` añadimos cualquier contenido por defecto.

  - Lo que haremos es, si nó se encontró el poquemon que se solicitó, entonces que responda con un `404`, para esto creamos otro archivo similar en `@/app/dashboard/pokemon/[id]/not-found.tsx`.

  - Modificamos el contenido del mensaje que tendría que hacer `Pókemon no encontrado`.

  - Una vez compilado `pnpm build` y `pnpm start`, cuando realizemos una solicitún a una URL en particular, NextJS de antemano generará por ejemplo los 151 pókemons, ésto es ser generado por el servidor.



