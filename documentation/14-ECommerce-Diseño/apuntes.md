# Temas puntuales de la sección

En esta sección empezaremos a trabajar en la maquetación de nuestra aplicación de e-commerce "TesloShop"

Aquí aprenderemos sobre:

- Server Components

- Client Components

- Zustand

- Tailwind

- CLSX

- Estructura de directorios

- Layouts anidados

- Componentes reutilizables

- Efectos de Blur con Tailwind

- Efectos con las imágenes de productos

- Rutas de nuestra aplicación

Y mucho más.

Este es el inicio de nuestro proyecto final, el cual es una tienda

---

# Sección 14

#### Inicio del proyecto

- Crear Proyecto `pnpm create next-app@latest teslo-shop --yes`

- Renonbrar `mv teslo-shop 04-teslo-shop`

- Añadimos los archivos del material, copiamos todos los archivos de `public`, la carpeta de `seed` añadimos a `src/seed` y el archivo `styles/globals.css` a `src/app/globals.css`

- Eliminamos todo el contenido de `src/app/page.tsx`, lo dejamos que retorne un `<h1>Hola Mundo</h1>`

- Para trabajar con `pnpm` en `nvim` tengo un error, para eso añado `04-teslo-shop/.npmrc` con el contenido `public-hoist-pattern[]=*`

- Reinstalamos todo `pnpm install` ejecutamos el proyecto con `pnpm dev` y vemos como queda.

#### NextJS Fonts

- Separamos las fuentes de `layout` a `src/config/fonts.ts`

- Exportamos la que utiliza el layout, e incluimos `Montserrat_Alternates`, así quedaría `src/config/fonts.ts`:

  ```ts
  import { Geist, Geist_Mono, Montserrat_Alternates } from "next/font/google";

  export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  export const titleFont = Montserrat_Alternates({
    subsets: ["latin"],
    weight: ["500", "700"],
  })
  ```

- No nos olvidemos volver a importar de donde lo utilizamos, observar que en vez de colocar en nombre de la fuente lo creamos con un numbre generico que nuestra aplicación utilizará y si en el futuro queremos cambiar esa fuente solo lo hacemos desde este archivo, añadimos esta nueva fuente en nuestro `page.tsx`:

  ```ts
  import { titleFont } from "@/config/fonts";

  export default function Home() {
    return (
      <>
        <h1>Hola Mundo</h1>
        <h1 className={`${titleFont.className} font-bold`}>Hola Mundo</h1>
        <h1 className={titleFont.className}>Hola Mundo</h1>
      </>
    );
  }
  ```

#### Estructura de directorios y primeras páginas

- Antes que nada reemplazamos el `public/favicon.ico` a `src/app/favicon.ico`.

- Recuerden todo lo que tendremos dentro de `src/app/*` serán nuestras `rutas`, `errores`, y los `layouts` básicamente.

- La primera carpeta que necesitaremos será `src/components`, estará todo lo que **no** son páginas, todos mis componentes que utilizará mi aplicación web.

- También lo tendremos separado por categorías como: `src/components/cart`, `src/components/product`, `src/components/products` y `src/components/ui`.

- También tendremos un archivo barril donde exportaremos todos nuestro compomentes `src/components/index.ts`.

- Necesitaremos añadir algunas interfaces para esto añadimos `src/interfaces`.

- Como manejador de estado utilizaremos `zustand`, para ello creamos `src/store`

- Para nuestras páginas crearemos: `src/app/auth`, `src/app/shop`.

- Arrastramos, o cortamos nuestro `src/app/page.tsx` a `src/app/shop/page.tsx`, y creamos un `app/shop/layout.tsx`, quedaría:

  ```tsx
  export default function ShopLayout({ children }: {
    children: React.ReactNode
  }) {
    return (
      <main className="min-h-screen bg-red-500">
        {children}
      </main>
    )
  }
  ```

- Realizamos lo mismo para `auth`, copiamos y pegamos `page.tsx` y `layout.tsx` para auth, modificamos el nobmre de la función `Home` y que devuelva `<h1>Login Page</h1>` con otro color.

- Movemos `app/page.tsx` a `app/login/page.tsx`.

- Como queremos que la ruta `localhost:3000/shop` sea la por defecto `localhost:3000/` renombramos a `app/(shop)`.

- Copiamos `app/auth/login/*` a `app/auth/new-account/*` y ya tenemos otra ruta.

#### Creando rutas de la aplicación

- Antes cambiaremos de nuestro `/app/(shop)/page.tsx` la etiqueta `main` por `div`.

- Creamos una carpeta `app/(shop)/admin` y en su `page.tsx` lo dejamos como un componente anónimo.

  ```tsx
  export default function () {
    return (
      <div>
        <h1>Admin Page</h1>
      </div>
    )
  }
  ```

- Copiamos `(shop)/admin` y pegamos en `(shop)/cart` para nuestro carrito de compras.

- Luego creamos otro `(shop)/category/[id]/page.tsx` que devuelva `<h1>Category Page</h1>`

- Copiamos del `cart` para `app/checkout/page.tsx`, este es para realizar el cierre de la venta, tendremos otro para `app/checkout/address/page.tsx`, probamos.

- Nuevamente copiamos para `app/empty/page.tsx`, lo redireccionamos acá por si el carrito de compras no tiene ningún item seleccionado.

- Otro para `app/orders/page.tsx`, para el listado de órdenes, otro para cada orden como `app/orders/[id]/page.tsx`

- Otro para `app/product/page.tsx` añadimos un argumento: `app/product/[slug]/page.tsx`, es lo que tiene un identificador humanamente legible.

- Otro para `app/products/page.tsx`, por ahora son las que crearemos, mas adelante dependerá de la necesidad.

#### TopMenu

- Instalamos íconos `pnpm add react-icons` desde `https://react-icons.github.io/react-icons/` utilizaremos `Ionicons 5`, nos basaremos en `https://shop.tesla.com/category/apparel`

- El primer componente que crearemos será `src/components/ui/top-menu/TopMenu.tsx`:

  ```tsx
  import { titleFont } from '@/config/fonts'
  import Link from 'next/link'

  export default TopMenu = () => {
    return (
      <nav className="flex px-5 justify-between items-center w-full">
        {/* Logo */}
        <div>
          <Link href="/">
            <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <Link>
        </div>
      </nav>
    )
  }
  ```

- Empezamos a exportar desde nuestro archivo barril `components/index.ts` añadimos `export * from './ui/top-menu/TopMenu`.

- Vamos al Layout de la tienda `app/(shop)/layout.tsx` y justo arriba del children añadimos:

```tsx
...
return (
  <main className="min-h-screen">
    <TopMenu />

    { children }
  </main>
)
...
```

- Sientanse libres de añadir cambios y personalizarlo a como mas les parezca.

- En `TopMenu` añadimos:

  ```tsx
  ...
  <nav>
    {/* Logo */}
    <div>
      <Link href="/">
        <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
        <span> | Shop</span>
      <Link>
    </div>

    {/* Center Menu*/}
    <div className="">
      <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/men">Hombres</Link>
      <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/women">Mujeres</Link>
      <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100" href="/category/kids">Niños</Link>
    </div>
  </nav>
  ...
  ```

- En el `div` de `{/* Center Menu*/}` lo ocultamos, como Tailwind por defecto es mobile first, nos permite esto `<div className="hidden sm:block">...</div>`

>Probamos desde el navegador

- Para la parte de la izquierda del menú, creamos:

  ```tsx
  import { IoSearchOutline, IoCartOutline } from 'react-icons/io5'

  //...
  <nav>
    //...

    {/* Center Menu*/}
    <div className="hidden sm:block">
      // ...
    </div>

    {/* Search, Cart, Menu */}
    <div className="flex items-center">
      <Link href="/search">
        <IoSearchOutline className="w-5 h-5" />
      </Link>

      <Link href="/cart">
        <div className="relative">
          <IoCartOutline className="size-5" />
        </div>
      </Link>
    </div>
  </nav>
  // ...
  ```

- Para añadir el ícono arriba del Cart.

  ```tsx
  ...
  <Link href="/cart" className="mx-2">
    <div className="relative">
      <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">3</span>
      <IoCartOutline className="size-5" />
    </div>
  </Link>
  ...
  ```

- Por último falta un botón

  ```tsx
  ...
  <button className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
    Menú
  </button>
  ...
  ```

>Probamos en el navegador que estén todas nuestras páginas excepto el de `search`

#### Página 404 - Categorías

- Crearemos un componente con un nombre particular que es: `(shop)/category/not-found.tsx`.

  ```tsx
  import Link from 'next/link'

  export default function() {
    return (
      <div>
        <h1> 404 Not Found</h1>
        <Link href="/">Regresar</Link>
      </div>
    )
  }
  ```

- Ahora como hacemos para lanzar la excepción, solo permitiendo que algunas categorías se permita como `localhost:3000/category/men` y `localhost:3000/category/women`.

- Para esto necesitamos recibir nuestras `Props` desde `(shop)/category/[id]/page.tsx`.

```tsx
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

export default function({params}: Props) {
  const { id } = params;

  if ( id === 'kids' ) {
    notFound()
  }

  return (
    <div>
      <h1>Category Page {id}</h1>
    </div>
  )
}
```

#### Página 404 - Personalizada

- Para esto creamos `src/components/ui/not-found/PageNotFound.tsx`:

```tsx
export const PageNotFound = () => {
  return (
    <div>PageNotFound</div>
  )
}
```

- Éste PageNotFound lo exportamos en nuestro archivo barril `ui/index.ts`.

```ts
export * from './ui/not-found/PageNotFound'
...
```

- Ahora en la pantalla de `(shop)/category/not-found.tsx`, regresamos:

```tsx
// No se olviden importar, y borrar el Link

return (
  <PageNotFound />
)
```

- Ahora podemos personalizar nuestro nor-found `ui/not-found/PageNotFound.tsx`:

```tsx
export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={ `${titleFont.className} antialiased text-9xl` }>404</h2>
        <p className="font-semibold text-xl">Whoops! Lo sentimos mucho.</p>
        <p className="font-light">
          <span>Puedes regresar al&nbsp;</span>
          <Link
            href="/"
            className="font-normal hover:underline transition-all"
          >
            inicio
          </Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="Starman"
          className="p-5 sm:p-0"
          width={ 550 }
          height={ 550 }
        />
      </div>
    </div>
  )
}
```

#### Componente - Title

- Para nuestras páginas reutilizaremos la parte del título `src/components/ui/title/Title.tsx`.

```tsx
export const Title = () => {
  return (
    <div>Title</div>
  )
}
```

- No olvidemos incluirlo a nuestro archivo vaul.

- Nos dirigimos a nuestro `(shop)/page.tsx` y modificamos nuestro HomePage.

```tsx
export default function Home() {
  return (
    <Title />
  )
}
```

- Volvemos a nuestro componente Title y empezamos a personalizar.

```tsx
interface Props {
  title: string
  subtitle?: string
  className?: string
}

export const Title = ({ title, subtitle, className }:Props) => {
  return (
    <div className={`mt-3 ${ className }`}>
      <h1 className={ `${titleFont.className} antialiased text-4xl font-semibold my-7` }>
        { title }
      </h1>
      {
        subtitle && (
          <h3 className="text-xl mb-5">{ subtitle }</h3>
        )
      }
    </div>
  )
}
```

- Este componente desde el archivo que lo llama se estará quejando `(shop)/page.tsx`.

```tsx
export default function Home() {
  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />
    </>
  )
}
```

- También (opcional) en `(shop)/layout.tsx` podemos envolver el `children` con un `<div className="px-0 sm:px-10">`

#### Grid de Productos

- Para todas las categorías será el mismo diseño para mostrar los productos.

- Aún no tenemos ninguna base de datos, pero tenemos nuestro `seed data`.

- Vamos a `(shop)/app/page.tsx`:

```tsx
...
import { initialData } from '@/seed/seed'

const products = initialData.products
...
```

- Vamos a `src/seed/seed.ts` copiamos: `interface` y los dos `type` lo pegamos a `src/interfaces/product.interface.ts`, renombramos la interface a solo `Product` añadimos una propiedad más, el `id: string` comentado y con un `todo:` para cambiarlo después, no nos olvidemos exportar.

- Adicionalmente crearemos nuestro archivo barril `index.ts` y realizamos el `export * from './product.interface`.

- Creamos nuestro componente `src/components/products/product-grid/ProductGrid.tsx`:

```tsx
interface Props {
  products: Product[]
}

export const ProductGrid = ({ products }:Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {
        products.map(product => (
          <span key={product.slug}>{product.title}</span>
        ))
      }
    </div>
  )
}
```

- Utilizaremos este Grid, pero antes añadimos a nuestro archivo barril `src/components/index.ts`, `export * from './products/product-grid/ProductGrid'`

- Utilizamos en `(shop)/app/page.tsx`:

```tsx
// Debajo del componente `Title`

<ProductGrid products={products}/>
```

#### Tarjeta de producto

- Creamos `components/products/product-grid/ProductGridItem.jsx`:

```tsx
interface Props {
  product: Product
}

export const ProductGridItem = () => {
  return (
    <div>ProductGridItem</div>
  )
}
```


