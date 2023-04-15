# RESUMEN CURSO REACT

#### :copyright: Resumen de Fernando Herrera [Udemy](https://www.udemy.com/course/nextjs-fh)

###### [:page_with_curl: Todos](https://garydav.github.io/blogs-course) mis resúmenes por [@garyDav](https://github.com/garyDav)

> :spiral_calendar: Published on April 15, 2023

---

##### Introducción

Éste es un resumen del curso NextJS de [Fernando Herrera](https://fernando-herrera.com) resumida por [Gary Guzmán](garydav.com).

- Cada Sección está emparejada a las secciones utilizadas por el temario del curso.

- En cada Ejemplo o Proyectos realizados, se detallará la estructura inicial del mismo y la resolución paso a paso.

#### Requisitos previos

Para seguir este tutorial en caso de trabajar con Ubuntu, necesitará lo siguiente:

- Un servidor de desarrollo con Ubuntu 22.04, un usuario no root con privilegios `sudo` y un firewall activo. Consulte esta [guía de configuración inicial para servidores](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-22-04).

- Docker instalado en su servidor, siguiendo los pasos 1 y 2 de [How To Install and Use Docker on Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04).

- Docker Compose instalado en su servidor conforme el paso 1 de [How To Install and Use Docker Compose on Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04).

- Una Alternativa a S.O. Linux se utilizará WSL2 con Windows 11 Pro, es lo que utilizaré en el resumen.

#### Conocimientos previos

- JasaScript Básico o Intermedio (ECMAScript 6).

- Manejo de la terminal Básico

---

## Sección 1: Introducción

En esta sección, se revisan distintos puntos de como utilizar la plataforma del curso en sí, rescataremos las instalaciones necesarias:

#### Instalaciones Recomendadas

##### Instalaciones recomendadas - Curso de Next.js

##### Instalaciones Necesarias

- [Visual Studio Code](https://code.visualstudio.com/)

- [Postman](https://www.postman.com/downloads/)

- [Mongo Compass](https://www.mongodb.com/try/download/compass)

- [Git](https://git-scm.com/)

```
git config --global user.name "Tu nombre"
git config --global user.email "Tu correo"
```

- [Node](https://nodejs.org/es/)

```opcional - Yarn
npm install --global yarn
```

- [Google Chrome](https://www.google.com.mx/intl/es-419/chrome/?brand=CHBD&gclid=Cj0KCQiAtrnuBRDXARIsABiN-7AAMm13Ae3KDIib46Laxfe6tzD_w4yvDdpq5XsPw1eNlOkZ_0-3x3IaAvLEEALw_wcB&gclsrc=aw.ds)

- [Docker Desktop](https://www.docker.com/get-started)

Descargar imagen de Mongo 5.0.0

```
docker pull mongo:5.0.0
```

##### Extensiones de VSCode

[Activitus Bar](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.activitusbar)

##### Configuración del Bracket Pair Colorizer 2

[Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)

```
"bracket-pair-colorizer-2.colors": [
    "#fafafa",
    "#9F51B6",
    "#F7C244",
    "#F07850",
    "#9CDD29",
    "#0098FA"
],
```

##### Tema que estoy usando en VSCode:

- [Tokyo Night](https://marketplace.visualstudio.com/items?itemName=enkia.tokyo-night)

- [Iconos](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

##### Instalaciones adicionales

- [NextJs Snippets](https://marketplace.visualstudio.com/items?itemName=willstakayama.vscode-nextjs-snippets)

- [ES7 React/Redux](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

- [Simple React Snippets](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets)

- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)

- [Paste JSON as Code](https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype)

- [TypeScript importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)

- [CSS Modules](https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules)

- [.env](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)

## Sección 2: Introducción a Next.js

**Next.js**, es un Framework poderoso para servir contenido estático y generado desde el lado del servidor, todo lo que puedes hacer en React.js lo puedes hacer en Next.js.

Al ser un marco de trabajo hay ciertos lineamientos, ciertas herramientas, que ya vienen al abrirlo de la caja, es bastante poderoso.

En pocas palabras, puedes hacer todo o que sabes en **React** + Mejoras de rendimiento, SEO, separación de código, router, dependencias, y más.

En el sitio oficial de React, menciona que si ustedes quieren incluir aplicaciones renderizadas del lado del servidor, recomiendan que ustedes prueben Next.js, también hay otro popular que es Gatsby, si quieren crear contenido estático, por ejemplo páginas web estáticas, pero Next.js también ofrece ese servicio, de hecho Next.js y Gatsby son cierta competencia una entre otra.

Otro punto importante que se mira desde la documentación oficial de React.js es que se asume que nuestro entorno de trabajo, o lo que tenemos en el backend por ejemplo es Node.js, esto no significa que necesariamente tienen que utilizar Node.js en el Backend para realizar nuestras API, pueden utilizar lo que guste, péro traten de dar una oportulidad a Node.js, pueden hacer todo con Node.js acceder al FileSystem del Servidor, etc. es súmamente poderoso.

Next.js cambia el paradigma de los **SPA** (Single Page Application), y te da opciones para trabajar tus aplicaciones. Por ejemplo pueden tener dos características principales como ser el **_Server-Side Rendering_** y/o **_Generación Estática_**. Al mismo tiempo, Next.js ofrece:

- **SSR:** Server-side rendering.
- **SSG:** Static-site generation.
- **CSR:** Client Side Rendering.
- **ISR:** Incremental Static Regeneration.
- **DR:** Dynamic Routing.

#### Un SPA funciona así:

1. El usuario entra a una [URL](#) el cual inicial la primera solicitud, lo llamamos (request).

2. Luego el servidor responde con un (reponse).

3. Ahí es donde el cliente recibe esa solicitud, ésta tiene la información de diferentes dependencias que vamos a ocupar, los estilos hay que cargarlos de este URL, etc. Usualmente viene un documento **HTML** con todas sus referencias, que son necesarias para mostrar la aplicacion como nosotros queremos.

4. Si estamos trabajando con un SPA, todo el sitio web o la mayor parte de él. La computadora cliente (Navegador) interpreta la respuesta y aquí viene nuestro contenido de React.js, React empieza a generar la aplicación, empieza a usar el `useState`, los `useEffect`, los `useLayoutEffect`, el `useReducer`, crea el `context`, ahí empieza a generar toda esa parte, esto no es malo es sumamente poderos.
