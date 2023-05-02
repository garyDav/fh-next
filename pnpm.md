### Instalación

Habilitando una característica que ya viene con `npm`, ejecutar: `corepack enable`, para actualizar a la última versión: `corepack prepare pnpm@latest --activate`

### Usar PNPM

```fish
cd project
pnpm init # Iniciar el proyecto.
pnpm add <dependencies> # No descarga todo, viene enlazada de otra ubicación.
pnpm-lock.yaml # Se crea este archivo, para las subdependencias.
pnpm add -D <devDependencies> # Instalar las dependencias de desarrollo, las salidas de la consola incluso te indica lo que podría faltar.
pnpm add <@dep/cli> -g # Instalar dependencias globalmente.
pnpm setup # Si obtenemos un error con el comando anterior, ejecutar este.
pnpm install ó pnpm i # Instalar y/o enlazar las dependencias.
pnpm remove <dependencies> # Quitar dependencias de package.json y node_modules.
pnpm exec tsc --init # Ejecutar cli si está instalado localmente, es como npx.
pnpm dlx create-react-app client # Ejecutar un módulo sin la necesidad de instalarlo globalmente.
pnpm create vite # Ejecutar un módulo sin la necesidad de instalarlo.
# Si instalamos de forma común `npm install` crea el archivo package-lock.json, podemos convertir a pnpm-lock.yaml con: `pnpm import`
```

### Para mas información

https://pnpm.io
