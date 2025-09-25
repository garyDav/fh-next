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

* Prioridad de carga, añadir `priority={false}` como propiedad de mi componente `Image`.
