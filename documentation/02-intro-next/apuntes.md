# Apuntes Sección 2

Next es un Framework por otros (Metaframework) poderoso para servir contenido estático y generado desde el lado del servidor.

En pocas palabras, podremos hacer todo lo que conocemos de React, más lo que nos añade Next, como mejoras de rendimiento, SEO, separación de código, router, dependencias, y más.

Next cambia el paradigma de los SPA (Single Page Application), y te da opciones para trabajar tus aplicaciones.

**Por ejemplo:**

Server-Side Rendering y/o Generación estática

**_Y al mismo tiempo, Next.js ofrece:_**

- SSR: Server-side rendering
- SSG: Static-site generation
- CSR: Client-side rendering
- ISR: Incremental static regeneration
- DR: Dynamic Routing

### Temas puntuales

[temas-puntuales-link](./temas-puntuales.md)

### Recomendaciones

[recomendaciones-link](./recomendaciones.md)

### Versión 13 de Next.js

Incluye:

- appDirectory
  - Layouts
  - React Server Components
  - Streaming
- Turbopack (beta): es el suseror de webpack
- New next/image
- New @next/font
- Improved next/link

### Instalación del proyecto

```fish
pnpm create next-app
✔ What is your project named? … first-steps
✔ Would you like to use TypeScript with this project? … No / *Yes
✔ Would you like to use ESLint with this project? … No / *Yes
✔ Would you like to use Tailwind CSS with this project? … No / *Yes
✔ Would you like to use `src/` directory with this project? … *No / Yes
✔ Use App Router (recommended)? … No / *Yes
✔ Would you like to customize the default import alias? … *No / Yes

mv pokemon-static 03-pokemon-static
cd 03-pokemon-static
pnpm dev
# --- En caso de Error "autoprefixer" realizar lo siguiente:
pnpm add -D autoprefixer
touch postcss.config.json
--- # Content JSON
{
  "plugins": ["autoprefixer"]
}
---
pnpm dev # Solucionado
```

### Explicación de archivos y directorios

```
.
├── README.md
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── tsconfig.json

3 directories, 17 files
```

**`tsconfig.json:`** Es el archivo de compilación, de como queremos que el compilador de TypeScript trabaje, como viene el archivo por defecto, no es necesario realizar cambios.

**`tailwind.config.js:`** luego tenemos en archivo de configuración de Tailwind CSS.

**`Readme.md:`** Podemos establecer la descripción de la aplicación, añadiendo procedimientos de como levantar y como construir su aplicción.

**`postcss.config.js:`** Como establecimos trabajar con Tailwind CSS, es necesario este archivo, en este archivo no tiene nada que ver Next.js.

**`package.json:`** Básicamente es el archivo de configuración de nuestro proyecto, aquí se encuentran las dependencias, scripts, y configuraciones de nuestro proyecto, y alguna información extra de nuestro proyecto como el nombre, la versión, privada si no queremos que se suba a NPM.

**`package-lock.json:`** Nó deberían de modificarlo, es un archivo que se genera automáticamente, y es el que se encarga de las versiones exactas de las dependencias que se instalan.

**`next.config.js:`** Son configuaraciones de como funciona y como se crea nuestro proyecto de Next.

**`next-env.d.ts:`** Si los archivos terminan con `d.ts` son archivos de definición de TypeScript, son archivos que no se compilan, pero que le dicen a TypeScript como se comportan ciertas librerías, este archivo no se modifica.

**`.gitignore:`** No tiene nada que ver Next, pero como nuestro proyecto va a seguir un control de versiones basado en git, el gitignore son todos los archivos y directorios y extensiones de archivos que nosotros no queremos que se le de seguimiento.

**`eslint.config.mjs:`** Es el archivo de configuración de ESLint, que es una herramienta que nos ayuda a mantener un código limpio y ordenado, y que siga ciertas reglas de estilo.

**`public/:`** Es el directorio donde podremos subir contenido estático, que no queremos que sea procesado de ninguna manera, solo queremos que se suba, como imágenes, archivos, etc.

**`node_modules/:`** Tiene todos los módulos que tengamos instalados en `dependencies` y `devDependencies`, en estos módulos pueden tener mas dependencias implísitas dentro del mismo, no realizaremos ninguna modificación, simplemente los añadimos o removemos a partir de los comando de `npm`, `yarn`, `pnpm`.

**`app/:`** Aquí es donde pasaremos la mayor parte del tiempo, es donde vamos a tener nuestros componentes, nuestros estilos, nuestras páginas, nuestros layouts, etc. Dentro de esta carpeta tenemos un `global.css` como su nombre indica es el estilo global de la aplicación, un `favicon.ico` que es el ícono que se visualiza en la pestaña del navegador, un `layout.tsx` que es el layout de nuestra aplicación, y un `page.tsx` que es la página principal de nuestra aplicación.

Eso es básicamente todo lo que tenemos, realmente lo que es propio de Next es `app/`, `public/`, y el archivo de configuración de Next `next.config.js`, todo lo demás son archivos de configuración adicionales, que nos ayudarán a escribir un mejor código, o a las dependencias que dijimos que queríamos.

Luego tenemos la carpeta `.next/` tampoco le daremos seguimiento a esta carpeta, es una carpeta que se genera automáticamente, y es donde se guarda todo el código compilado de nuestra aplicación, es decir, todo el código que se va a subir al servidor, y que se va a ejecutar en el navegador.

### Rutas adicionales

Las rutas en Next v13 no son solo archivos, sino que también son directorios, y esto es gracias a la nueva característica de Next que se llama Dynamic Routing, que nos permite tener rutas dinámicas, y que se generan en tiempo de compilación.

Ejemplo: deberemos crear un directorio como `app/about/page.tsx` y ya tendremos una ruta `/about` en nuestra aplicación.

Por defecto todo lo que está dentro de `app/*` serán generados del lado del servidor (Server Components).

**`:`**
**`:`**
**`:`**
**`:`**
**`:`**
**`:`**
