# Sección 4

## Todos los componentes son `Server Components`.

Algo que tenemos que tener muy presente es que, todos los archivos que creamos serán `Server Components`, tódo lo que esté conectado a nuestro directorio `app` son `Server Components`.

Pero hay un problema, cuando nosotros queramos manejar un estado local, por ejemplo: quisieramos utilizar nuestro `Context API` o `Redux` o queramos utilizar `Material UI` o `Next UI`, o necesitemos utilizar cualquier cosa que requiera `Java Script` del lado del `cliente`, aquí tenemos esta encrucijada. ¿Cómo ejecutamos del lado del *servidor* contenido del *cliente*?, no tiene sentido, y no se hace hací.

Lo que veremos es:

* Dashboard Administrativo

* Utilizar Tailwind

* Tratar en lo posible todo generar del lado del *servidor*.

* Específicamente lo que nosotros ocupemos o utilicemos, sólo esas pequeñas piezas serán generadas del lado del *cliente*.

### Esta sección nos dará la base de cómo poder utilizar Server Componentes con estado que será manejado del lado del cliente.

Puntualmente veremos:

- Tailwind classes

  * Estructura de un dashboard

- useState

- use-client

- Next Link

- Next Image

- Estructura de proyecto

- Permitir imágenes externas

- Entre otras cosas.

## Creando nuestro Proyecto

my-dashboard

```fish
pnpx create-next-app@latest my-dashboard

Packages: +1
+
Progress: resolved 1, reused 0, downloaded 1, added 1, done
✔ Would you like to use TypeScript? … No / Yes
✔ Which linter would you like to use? › ESLint
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack? (recommended) … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
Creating a new Next.js app in /home/ggary/coder/tests/my-dashboard2.

Using pnpm.
...
```

Renombramos a `02-my-dashboard` ingresamos con `cd 02-my-dashboard`, abrimos con `code .` o `nvim .`, y ejecutamos `pnpm dev`.

En caso de error del eslint:

```fish
╭────────────────────────────────   Error ─────────────────────────────────╮
eslint: -32603: Request textDocument/diagnostic failed with message: Fail…
Require stack: - /home/ggary/coder/tests/my-dashboard2/placeholder.js
Referenced from: /home/ggary/coder/tests/my-dashboard2/node_modules/.pnpm…

# El error es:
placeholder.js
Referenced from: node_modules/.pnpm/...
```

Crear un archivo en la raiz `/` del proyecto, llamado `.npmrc` con el contenido: `public-hoist-pattern[]=*` lo guardan y cierran luego eliminan la carpeta `rm -rf node_modules` y vuelven a instalar los paquete `pnpm install`, ya con eso se arregla.

Ésto es por `pnpm` cómo controla cómo se "**hoistean**" (es decir, se elevan al nivel superior) los paquetes dentro de `node_modules`. El "**hoisting**" de PNPM usa una estructura de `node_modules` más eficiente y aislada. Pero a veces necesitas que ciertos paquetes estén disponibles en la raíz de `node_modules` para que herramientas como `ESLint`, `TypeScript` o `Webpack` los encuentren fácilmente.

## Modificando código

Primero comentamos `@media` de `globals.css`, vamos a `Layout.tsx` y cambiamos el idioma por `es`

* Nos dirigimos a `./src/app/page.tsx` Renombramos nuestro Componente por `HomePage() ...`.

  - Quitamos Todo su contenido `HTML` y lo cambiamos por un fragment `<><h1>Hola Mundo</h1></>`

  - A pesar de ser `<h1>` Tailwindcss unifica todos los estilos a uno solo, pero aún así no afecta al `DOM` se mantiene el `<h1>`.

  - Creamos nuestro archivo `touch dashboard/counter/page.tsx` dentro de `./src/app`, creamos un `functional compoment` llamado `CounterPage() ...` con un `<h1>Page Counter</h1>`.

  - Para no ingresar a `...:3000/dashboard/counter` utilizar `redirect` de `next-navigation` a la anterior ruta, como argumento de la función `redirect`.

  - Ahora cuando entremos a `...3000:/` nos redireccionará a `...:3000/dashboard/counter`

* Creamos un **Dashboard** basándonos en esta plantilla [Creative Tim](https://www.creative-tim.com/ "creative-tim.com") -> `Tailwind CSS` -> `Components for TailwindCSS` buscamos `Dashboard Navigation` y escogemos de `pantazisoftware`.

  - Para añadir esta plantilla creamos `./src/app/dashboard/layout.tsx` con el siguiente contenido:

    ```tsx
    export default function DashboardLayout({ children }: {children: React.ReactNode}) {
      return (
        <div>
          <h1>Dashboard Layout</h1>
          {children}
        </div>
      )
    }
    ```

  - Copiar el `div` padre de la plantilla de `dashboard` a nuestro `DashboardLayout` dentro de `return`. Cambiar el atributo `class` por `className` con `%s /class/className/g`, añadir el cierre de etiqueta en `<img />` y cambiar las propiedades como: `stroke-linecap`, `stroke-linejoin`, `stroke-width` por `camelCase`, sino como es una expresión en `JavaScript` pensará que se quiere realizar la resta de dos variables.

  - Cuando estamos trabajando con `NextJS` no se recomienda utilizar la etiqueta `<img />`, en su lugar se utiliza un componente propio de `NextJS` un componente especializado que funciona muy bien `<Image />` de un rato ya lo veremos.

* **Sidebar** y contenido principal: separamos con `enter` los dos primeros `div` y en el *segundo* `div` quitamos `flex-col relative w-screen`.

  - En el `div` que tiene `id="menu"` todo lo que tiene ahí, `compáctenlo` -> `zc`, despues de ese bloque, será donde colocaremos nuestro `children`.

  - Verán que no aparece nuestro `component` y es porque nuestro `sidebar` tiene posisión fija `fixed` si lo quitamos ya queda.

  - Arreglamos el color de texto colocando nuestro `children` dentro de un `div` y que tenga la clase `text-slate-900`.

  - Aprovechamos y también añadimos las clases `p-2 w-full`.

  - Antes de hacer cualquier otra modificación, quiero que noten algo, vamos a tener que cambiar la opción del `menu` acorde al `url`, eso significa que tenemos que hacer "algo" renderizado del lado del **cliente** para determinar, (hey estoy en esta ruta o esta otra) o sea para poder poner la clase respectiva.

  - Uno puede pensar, ésto puede ser generado del lado del servidor, pero bueno, la idea y la recomendación que les doy, es que ustedes no se preocupen que es del **lado del servidor** y que es del **lado del cliente** por ahora piensen que todo es generado del **lado del servidor**, y hasta que necesitemos algo que realmente cambie el `state` o sea parte del `navegador`, ustedes van a chocar con un error en la pantalla que les dirá (hey estas haciendo uso de este `hook` o que estas usando una propiedad propia del `navegador`) y esto solo funciona del lado del **cliente**, pues usa `use client`, ése sería el tip.

  - Todo lo que tenemos del `<div id="menu" ...></div>` lo cortamos graben los cambios y vean como todo el `sidebar` desapareció.

  - Con lo copiado me voy a `./src/app/components` todo lo que esté en `../components/*` no son específicos a un módulo.

  - Creamos el archivo `./src/app/components/Sidebar.tsx` y dentro del `html` del `functional component`:

    ```tsx
    export const Sidebar = () => {
      return (
        // ... Paste the code here.
      )
    }
    ```

  - Grabo los cambios. Si vuelvo a mi página, aún no veo nada, lo cual es obvio porque todavía no lo incluí en mi `page`.

  - Dentro de `components/` incluiré un archivo barril `index.ts` aquí es donde voy a exportar mi `export { Sidebar } from './Sidebar'`, por que vamos a tener varios elementos acá.

  - Regresamos a nuestro `./src/app/dashboard/layout.tsx` y donde teníamos el código colocaremos nuestro componente `<Sidebar />` no se olviden de importarlo, ahí lo tenemos.

  - Ahora en nuestro `Sidebar.tsx` añadiré una propiedad en mi `<div id="menu"...>` llamado `style={{ width: '400px'}}`

  - 😱 Nos equivocamos!!! la carpeta `components` tendría que estar en `./src/components/*` para cambiar en `nvim-tree` movernos a `components` y presionamos `r` y quitamos `/app`, ahora dentro de `layout.tsx` cambiamos ` from "../components"` por `"@/components"`.

  - Ahora en nuestro `Sidebar.tsx` vamos a buscar nuestro `<div id="nav" ...>`, lo que vamos hacer es tratar de aislarlos `<a>...</a>` el segundo (Anchor tag) lo cambiamos `Database` por `Counter` y `Data Overview` por `Estado Local`, todos los demas anclas los borramos.

  - Lo que notamos es que cada (Anchor tag) al final serán mis `Links` esto es `algo` que voy a querer renderizar del **lado del cliente**, acorde al `url` en el cual se encuentra, por que cuando la persona cambie y navegue quiero que esa parte cambie de manera dinámica, no tener que hacer `refresh` ni nada, y se verá bonito.

  - Por último cambien ese nombre por su nombre `Gary Guzman`, grábense los cambios, si quieren cambiar el otro texto lo hacen.

* NextImage, es importante revisar la documentación oficial para este caso [Next Image](https://nextjs.org/docs/app/api-reference/components/image "Doc. Next Image").

  - Hay muchas cosas interesantes que tenemos por acá, por ejemplo, este componente nos dice, cuando se termina de cargar, cuando empieza a cargar, el estilo, la prioridad en caso de querer darle alguna prioridad al momento de cargar la imagen, la calidad que ustedes pueden ponerle, esto trabaja también de la mano con `Server Side`, ésto nos ayuda a mandar una imagen específica, y diseñada específicamente para las dimenciones que ustedes van a usar y el espacio donde va aparecer, hay muchas cosas útilies con este componente y nuevamente pueden venir a leerla. Noten que hay unas propiedades que son obligatorias, otra cosa importantes de la documentación de `Next Image` hay dos versiones uno `Using App Roputer` que es el que estamos usando a partir de `>Next v13` y otro para proyectos que utilizan `Using Page Router` para versiones anteriores a la `v13` se utilizaba la carpeta `pages/` para crear sus rutas.

  - Buscamos en `layout.tsx` la etiqueta `<img .../>` lo reemplazamos por `<Image />` de `next/image` si yo grabo los cambios y regresamos voy a tener un error, leamos el error, nos dice que nos falta una propiedad requerida, añadimos `alt="User avatar" width={50} height={50}`.

  - Ahora tenemos otro error `Invalid src prop` me dice que no puede ser mostrada, por que no está configurada en nuestro `next.config.js`, cuando ustedes están sirviendo imágenes que están fuera de este dominio, necesitamos decir a `Next` que puede confiar en esas imágenes, esto evita posibles `hackeos` si se quiere mostrar una imagen pues realmente es un código malisioso que se esté ejecutando, en fin.

  - Abrimos nuestro archivo `next.config.js`, y añadimos:

  ```js
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com'
        },
      ]
    }

  }
  module.exports = nextConfig
  ```

  - Eso es todo, guardamos, paramos la ejecución del programa, volvemos a levantar el modo desarrollo, recargamos el navegador web.

  - Si ustedes la inspeccionan, van a ver que la imagen no es tan grande, la imagen fué cortada, la original es bastante grande, pero la imagen que regresa `next/image` automáticamente lo adaptó al tamaño que yo ocupaba para que se mirara bien, en lugar de poner una imagen super grande que iba a tardar en cargar lo creo por mí.

---

* Utilizaremos [React Icons](https://react-icons.github.io/react-icons/icons/io5/ "react-icons.github.io") esto es super útil, por que con tan solo instalar el paquete `react-icons` ustedes ya tienen a su disposición todos esos íconos, y como nostros lo importaremos de manera granular el `tree shaking` es perfecto.

  - Iremos trabajando con los íconos de `Ionicons 5`, pueden ir al paquete oficial de sus ínoconos y poder buscarlos.

  - En `Sidebar` antes del `<span> Dash</span>` añadir `<IoLogoReact />` de `react-icons/io5`.

  - Para alinearlo añadimos en su `h1` la clase `flex items-center` y en el ícono `mr-2`.

  - Ahora para separar el menú, creamos un componente `SidebarMenuItem`, aquí pegamos un "Anchor tag" que forma parte del menú.

  - En éste componente creamos una:

    ```ts
    interface Props {
      path: string;
      icon: JSX.Element;
      title: string;
      subTitle: string
    }

    // Desestructuramos esos Props
    export const SidebarMenuItem = ({ path, icon, title, subTitle }: Props)
    ```

  - Tan pronto empecemos a utilizar el componente, el editor pide las propiedades que necesita:

    ```ts
    <SidebarMenuItem
      path={''}
      icon={undefined}
      title={''}
      subTitle={''}
    />
    ```

  - Para crearlos antes de la exportación del componente `Sidebar` añadimos:

    ```ts
    const menuItems = [
      {
        path: '/dashboard/main',
        icon: <IoBrowsersOutline size={40} />,
        title: 'Dashboard',
        subTitle: 'Visualización',
      },
      {
        path: '/dashboard/counter',
        icon: <IoCalculator size={40} />,
        title: 'Counter',
        subTitle: 'Contador Client Side',
      }
    ]
    ```

  - Dentro del `<div id="nav" ...>` iteramos `menuItems` con la función `map` que permite transformar cada elemento en uno nuevo, en nuestro caso `item => (<SidebarMenuItem key={item.path} {...item} />)`.

  - Dentro de `./src/dashboard` creamos `main/page.tsx` con el nombre `MainPage`.

  - El reto es que puedan mostrar el ícono, título, y subtítulo de nuestro `SidebarMenuItem`, inclusive cual es la opción seleccionada basada en el `url` necesitarán el `usePathname`.

* Solución del reto, añadimos `usePathname()`, cambiamos el "Anchor tag" por `Link`, cambiamos a las propieadades del componente.

  - Envolvemos entre backticks el `className` comparamos `currentPath` con el `path` añadimos `bg-blue-800` y si no `''`.

  - Envolvemos al `svg` y reemplazamos con nuestro `{ icon }`.

  - Añadimos las demás propieadades y listo.

* Counter - Manejo de estado - useState.

  - Desde `@/app/counter/page.tsx` insertamos:

    ```tsx
    export default function CounterPage() {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <span>Productos en el carrito</span>
          <span className="text-9xl"> 10 </span>

          <div className="flex">
            <button className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">
              + 1
            </button>

            <button className="flex items-center justify-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2">
              - 1
            </button>
          </div>
        </div>
      )
    }
    ```

  - Reto: poner a funcionar el contador utilizando `useState`.

  - Ahora si queremos añadir `export const metadata = { title: '...', description: '...'}`, nos aparece un error `Either remove the export, or the "use client" directive.`.

  - ¿Cómo hacemos para que nuestro `metadata` funcione desde el lado del servidor, sin perder la funcionalidad del contador?

  - Pensemos en hojas y pequeños componentes, el árbol podría ser todo nuestro Server Component y las hojas podría ser nuestro Client Component.

  - Creamos nuestro componente `CartCounter` dentro de un módulo propio de `@/shopping-cart/components/CartCoutner.tsx`, podríamos tener mas archivos relacionanos a nuestro módulo, como: `intercafe`, `types`, `modules`, migramos sólo el código necesario de nuestro contador.

  - Ahora si en nuestro `counter/page.tsx` tenemos nuestro `metadata`, y en nuestro componente `CartCounter` nuestro `useState` del lado del cliente `use client`.

  - Recuerden que si deshabilitamos `Ctrl + Shit + P` -> `Disable javascript` nuestro contador no funcionará, por que lo tengo desactivado `javascript` del lado del navegador, lo demás sigue funcionando.

  - Realizamos un `pnpm run build` si realizamos un `pnpm start` vamos a poder ver nuestra aplicación en modo de `production`.

