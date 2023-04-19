# React + TypeScript

- Crear una carpeta llamada `mkdir react-typescript`.

- Ingresar en la carpeta y crear "mi-app": `npx create-react-app mi-app --template typescript`.

- Ingresar a la carpeta `mi-app` y ejecutar `npm start`.

Abrir la carpeta `mi-app`, con su editor favorito.

Borrar los archivos innecesarios:

- `rm src/App.css`, no lo utilizaremos.

- `rm src/App.test.tsx`, es el archivo de pruebas relacionado al archivo `App.tsx`.

- Luego tenemos el `src/App.tsx`, que es lo mismo con su equivalente en `js`, como no hay nada de typescript, Borraremos sus importaciones, así quedaría el archivo final:

###### file: **_src/App.tsx_**

```tsx
export default function App() {
  return (
    <>
      <h1>React + TypeScript</h1>
    </>
  );
}
```

- Modificamos el archivo `src/index.tsx`, solo dejamos lo necesario.

###### file: **_src/index.tsx_**

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

###### file: **_src/react-app-env.d.ts_**

```tsx
/// <reference types="react-scripts" />
```

- `rm src/reportWebVitals.ts`, borramos el archivo, ya no lo importamos.

- Por último dejamos el archivo `src/setupTests.ts`

Con todos estos cambios recargamos la página y todo debería funcionar, con un **_Hola Mundo - TS_** en la pantalla.

#### Incluir Bootstrap

Lo hacemos mediante CDN de Bootstrap:

`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">`

Incluimos a nuestro `public/index.html`, debajo de del title, quedaría algo así:

###### file: **_public/index.html_**

```html
<!-- Code Before... -->
<head>
  <!-- ... -->
  <title>React + TypeScript</title>

  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
    crossorigin="anonymous"
  />
</head>
<body class="container bg-dark text-white">
  <!-- ... -->
</body>
<!-- Code After... -->
```

### useState

Creamos el archivo `touch Counter.tsx`, adentro del directorio `mkdir src/compoments`:

###### file: **_src/components_**

```tsx
export const Counter = () => {
  return (
    <div className="mt-5">
      <h3>Counter: useState</h3>
    </div>
  );
};
```

Lo importamos desde `src/App.tsx`:

###### file: **_src/App.tsx_**

```tsx
import { Counter } from "./components/Counter";

export default function App() {
  return (
    <>
      <h1>React + TypeScript</h1>
      <hr />

      <Counter />
    </>
  );
}
```

Incorporamos `useState` a nuestro componente `Counter.tsx`, de manera tradicional.

###### file: **_src/components/Counter.tsx_**

```tsx
import { useState } from "react";

export const Counter = () => {
  const [counter, setCounter] = useState(0);
  const incrementar = () => {
    setCounter(counter + 1);
  };

  return (
    <div className="mt-5">
      <h3>Counter: useState</h3>
      <span>Valor: {counter}</span>
      <br />
      <button onClick={incrementar} className="btn btn-outline-primary mt-2">
        +1
      </button>
    </div>
  );
};
```

Si queremos agregar otro botón que incremente de dos en dos, reutilizando la función `incrementar` y agregando **tipos**.

```tsx
import { useState } from "react";

export const Counter = () => {
  const [counter, setCounter] = useState(0);
  const incrementar = (numero: number = 1): void => {
    setCounter(counter + numero);
  };

  return (
    <div className="mt-5">
      <h3>Counter: useState</h3>
      <span>Valor: {counter}</span>
      <br />
      <button
        onClick={() => incrementar(1)}
        className="btn btn-outline-primary mt-2"
      >
        +1
      </button>
      <button
        onClick={() => incrementar(2)}
        className="btn btn-outline-primary mt-2"
      >
        +2
      </button>
      <button
        onClick={() => setCounter(0)}
        className="btn btn-outline-danger mt-2"
      >
        Reset
      </button>
    </div>
  );
};
```

###### file: **_src/components/Usuario.tsx_**

```tsx
import { useState } from "react";

interface User {
  uid: string;
  name: string;
}

const tempUser: User = {
  uid: "XYZ789",
  name: "Juan Perez",
};

export const Usuario = () => {
  const [user, setUser] = useState<User>(tempUser);

  const login = () => {
    setUser({
      uid: "ABC123",
      name: "Fernando Herrera",
    });
  };

  return (
    <div className="mt-5">
      <h3>Usuario: useState</h3>

      <button className="btn btn-outline-prinary" onClick={login}>
        Login
      </button>

      {!user ? (
        <pre> No hay usuario </pre>
      ) : (
        <pre> {JSON.stringify(user)} </pre>
      )}
    </div>
  );
};
```

Añadir al archivo `App.tsx`

###### file: **_src/App.tsx_**

```tsx
import { Counter } from "./components/Counter";
import { Usuario } from "./components/Usuario";

export default function App() {
  return (
    <>
      <h1>React + TypeScript</h1>
      <hr />

      <Counter />
      <Usuario />
    </>
  );
}
```
