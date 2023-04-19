### React + TypeScript

- Crear una carpeta llamada `mkdir react-typescript`.

- Ingresar en la carpeta y crear "mi-app": `npx create-react-app mi-app --template typescript`.

- Ingresar a la carpeta `mi-app` y ejecutar `npm start`.

Abrir la carpeta `mi-app`, con su editor favorito.

Borrar los archivos innecesarios:

- `rm src/App.css`, no lo utilizaremos.

- `rm src/App.test.tsx`, es el archivo de pruebas relacionado al archivo `App.tsx`.

- Luego tenemos el `src/App.tsx`, que es lo mismo con su equivalente en `js`, como no hay nada de typescript, Borraremos sus importaciones, así quedaría el archivo final:

##### file: **_src/App.tsx_**

```tsx
export default function App() {
  return (
    <>
      <h1>Hola Mundo - TS</h1>
    </>
  );
}
```

- Modificamos el archivo `src/index.tsx`, solo dejamos lo necesario.

##### file: **_src/index.tsx_**

```tsx
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

- `rm src/logo.svg`, borramos el logo.

- Lo dejamos el `src/react-app-env.d.ts`, los archivos que terminal con `.d.ts` son archivos de definición, no importan en la aplicación, pero ayuda a la hora de las definiciones que puedan tener las funciones, tipados, etc.

##### file: **_src/react-app-env.d.ts_**

```tsx
/// <reference types="react-scripts" />
```

- `rm src/reportWebVitals.ts`, borramos el archivo, ya no lo importamos.

- Por último dejamos el archivo `src/setupTests.ts`

Con todos estos cambios recargamos la página y todo debería funcionar, con un **_Hola Mundo - TS_** en la pantalla.
