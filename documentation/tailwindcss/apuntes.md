# Curso TailwindCSS V4.1

## Índice

- [Styling with Utility Classes](#styling-with-utility-classes)
- [Hover, Focus y otros estados en TailwindCSS](#hover-focus-y-otros-estados-en-tailwindcss)
- [Responsive design](#responsive-design)
- [Dark mode](#dark-mode)
- [Theme variables](#theme-variables)
- [Diferencia entre `@theme` y `@theme inline`](#diferencia-entre-theme-y-theme-inline)

---

## Styling with Utility Classes

Tailwind CSS funciona con un enfoque muy simple pero poderoso: **usar pequeñas clases llamadas “utilities”** para aplicar estilos directamente en tu HTML.

En lugar de escribir CSS tradicional como:

```css
.btn {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}
```

Y luego usarlo así:

```html
<button class="btn">Guardar</button>
```

En Tailwind lo haces directamente con **clases utilitarias** 👇

```html
<button class="bg-blue-600 text-white px-4 py-2 rounded-md">
  Guardar
</button>
```

🎯 **Idea principal:** cada clase hace una sola cosa (color, margen, padding, tipografía, etc.), y tú las combinas para construir el diseño.

### 🧱 Composición de clases

Las utility classes son como piezas de LEGO: las combinas para crear cualquier estilo.

Por ejemplo:

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
  <h1 class="text-xl font-bold text-gray-900">Hola, mundo</h1>
  <p class="text-gray-500">Tailwind es rápido y flexible.</p>
</div>
```

👉 Aquí combinamos:

* `p-6` → padding de 1.5 rem
* `max-w-sm` → ancho máximo pequeño
* `bg-white` → fondo blanco
* `rounded-xl` → bordes redondeados grandes
* `shadow-md` → sombra media
* `space-y-4` → separación vertical entre hijos

### 🎨 Ventajas de usar utilities

1. **Rápido de escribir y modificar**
   Cambias estilos directamente en tu HTML sin saltar entre archivos.

2. **Evitas CSS repetido**
   No necesitas inventar nombres de clases o duplicar reglas.

3. **Diseños consistentes**
   Usas siempre los mismos tamaños, colores y espaciados definidos en tu configuración de Tailwind.

### 💡 Ejemplo práctico

Supón que quieres una **tarjeta de producto**:

```html
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
  <img class="rounded-t-lg" src="/img/juice.jpg" alt="Jugo natural" />
  <div class="p-5">
    <h5 class="text-2xl font-bold tracking-tight text-gray-900">
      Jugo Natural de Mango
    </h5>
    <p class="text-gray-700">100% fruta, sin conservantes.</p>
    <button class="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
      Comprar
    </button>
  </div>
</div>
```

Cada detalle del diseño (colores, tamaño, espaciado) está definido con **clases utilitarias**, sin escribir una sola línea de CSS extra.

### 🚀 Conclusión

Tailwind CSS convierte tu HTML en un lienzo visual.
No necesitas abrir un archivo `.css`:
usas pequeñas clases para componer rápidamente cualquier diseño, desde botones simples hasta interfaces completas.

---

## Hover, Focus y otros estados en TailwindCSS

En TailwindCSS puedes aplicar estilos condicionales (como *hover*, *focus*, *active*, *disabled*, etc.) **usando “modificadores”** delante de las clases.
Esto te permite cambiar el diseño de un elemento **cuando ocurre una interacción del usuario**.

Por ejemplo:

```html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Guardar
</button>
```

🔹 Aquí el botón normalmente tiene `bg-blue-500`,
pero cuando pasas el mouse (*hover*) se vuelve `bg-blue-700`.

### 🪄 Cómo funciona la sintaxis

El formato es siempre el mismo:

```
estado:clase
```

Por ejemplo:

* `hover:` → cuando el cursor pasa encima
* `focus:` → cuando el elemento está enfocado (como un input activo)
* `active:` → cuando haces clic o mantienes presionado
* `disabled:` → cuando el elemento está deshabilitado

Puedes combinar varios:

```html
<button class="bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400">
  Enviar
</button>
```

### 🎯 Ejemplo con inputs

```html
<input
  type="text"
  placeholder="Escribe tu nombre"
  class="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md px-3 py-2"
/>
```

🔹 Cuando el campo tiene *focus*, el borde cambia de color y aparece un anillo sutil alrededor.

### Estados combinados y variantes útiles

Puedes combinar **varios modificadores** para controlar comportamientos más complejos:

```html
<button class="bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
  Confirmar
</button>
```

O incluso aplicar estados **dependiendo del padre**, usando *group*:

```html
<div class="group p-4 hover:bg-gray-100 rounded-lg">
  <h2 class="text-lg font-medium group-hover:text-blue-600">
    Título del artículo
  </h2>
</div>
```

🔹 `group-hover:` permite que los elementos hijos cambien estilo cuando el padre tiene hover.

### 🧩 Estados adicionales comunes

| Estado                            | Uso                                                 |
| :-------------------------------- | :-------------------------------------------------- |
| `focus:`                          | Cuando el usuario hace clic o navega con TAB        |
| `active:`                         | Mientras se mantiene presionado                     |
| `visited:`                        | Enlaces ya visitados                                |
| `disabled:`                       | Elementos desactivados                              |
| `checked:`                        | Checkbox o radio activado                           |
| `first:` / `last:`                | Primer o último elemento de una lista               |
| `odd:` / `even:`                  | Filas alternadas en tablas                          |
| `motion-safe:` / `motion-reduce:` | Controla animaciones según preferencias del usuario |

### 💡 Ejemplo completo: botón con varios estados

```html
<button
  class="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-300 text-white font-semibold py-2 px-4 rounded"
  disabled
>
  Procesando...
</button>
```

🧩 Este botón tiene:

* Color base (`bg-indigo-500`)
* Cambio de color al hover, active y focus
* Estado deshabilitado (`disabled:bg-gray-300`)

### 🚀 Conclusión

Tailwind te permite manejar estados de interacción sin escribir CSS adicional.
Solo agregas prefijos como `hover:`, `focus:` o `active:` directamente en tu HTML.
Esto hace que tus interfaces sean **interactivas, rápidas de construir y fáciles de mantener**.

---

## Responsive design

Tailwind CSS facilita crear interfaces **responsivas** (que se adaptan a diferentes tamaños de pantalla) sin necesidad de media queries personalizadas.
Solo agregas **prefijos de “breakpoints”** delante de tus clases utilitarias.

### 🧱 Cómo funciona

La idea es simple:
Cada breakpoint en Tailwind representa un tamaño mínimo de pantalla.
Cuando usas uno, la clase se aplica **a partir de ese tamaño hacia arriba**.

Por ejemplo:

```html
<div class="text-base md:text-lg lg:text-xl">
  Texto adaptable
</div>
```

🔹 En pantallas pequeñas: `text-base`
🔹 Desde 768px (`md`): `text-lg`
🔹 Desde 1024px (`lg`): `text-xl`

### 📏 Breakpoints predeterminados

| Prefijo | Tamaño mínimo | Ejemplo de uso  |
| :------ | :------------ | :-------------- |
| `sm:`   | 640px         | `sm:bg-red-500` |
| `md:`   | 768px         | `md:text-lg`    |
| `lg:`   | 1024px        | `lg:flex`       |
| `xl:`   | 1280px        | `xl:p-8`        |
| `2xl:`  | 1536px        | `2xl:container` |

💡 *Recuerda:* todos los breakpoints son **“min-width”**, es decir, aplican desde ese tamaño hacia arriba.

### 💡 Ejemplo práctico

```html
<div class="bg-green-300 sm:bg-yellow-300 md:bg-blue-300 lg:bg-purple-300 xl:bg-pink-300 p-4 rounded-lg text-center">
  Cambia de color según el ancho de la pantalla
</div>
```

➡️ Al reducir o ampliar la ventana, verás cómo el color de fondo cambia dependiendo del tamaño.

### 🧩 Combinando con otras utilidades

Puedes combinar responsive con hover, focus o cualquier otro modificador:

```html
<button class="bg-blue-500 hover:bg-blue-700 md:bg-green-500 md:hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">
  Adaptable
</button>
```

🔸 En pantallas pequeñas será azul,
🔸 En pantallas medianas o más grandes será verde.

### ⚙️ Personalizando los breakpoints

En tu archivo `tailwind.config.js`, puedes modificar o añadir breakpoints según tus necesidades:

```js
export default {
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
}
```

También puedes usar nombres personalizados:

```js
screens: {
  tablet: '640px',
  laptop: '1024px',
  desktop: '1280px',
},
```

Y luego usar:

```html
<div class="tablet:bg-yellow-200 laptop:bg-green-200 desktop:bg-blue-200">
  Ejemplo personalizado
</div>
```

### 🧠 Consejo práctico

Tailwind te anima a **diseñar primero para móviles** (mobile-first).
Esto significa que escribes tus estilos base sin prefijos, y luego usas `sm:`, `md:`, `lg:`... para ir adaptando progresivamente a pantallas más grandes.

Ejemplo:

```html
<p class="text-sm md:text-base lg:text-lg xl:text-xl">
  Diseño mobile-first en acción
</p>
```

### 🚀 Conclusión

Con los breakpoints de Tailwind puedes crear diseños responsivos **rápidos y consistentes**, sin escribir media queries manuales.
Simplemente agrega prefijos como `md:` o `lg:` delante de cualquier clase, y tu diseño se ajustará automáticamente al tamaño de pantalla.

---

## Dark mode

Tailwind te deja estilizar una versión oscura de tu sitio usando la **variant** `dark:`. La idea es simple: **prefijas** cualquier utility con `dark:` para cambiar su estilo cuando el tema oscuro esté activo. ([tailwindcss.com][1])

### 🧠 Qué es y cómo se usa

Aplica `dark:` delante de cualquier clase:

```html
<div class="bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-lg p-6">
  Hola en light 🌞 / dark 🌚
</div>
```

> Tailwind incluye la variant `dark` para estilizar distinto cuando el dark mode está habilitado. ([tailwindcss.com][1])

### ⚙️ Comportamiento por defecto (system preference)

Por defecto, `dark:` se activa según la preferencia del sistema usando `prefers-color-scheme`. No necesitas configurar nada para eso. ([tailwindcss.com][1])

### 🔀 Toggle manual con clase `.dark`

Si quieres controlar el tema con una **clase** (por ejemplo, un switch), redefine la variant con `@custom-variant` y usa `.dark` en el árbol superior:

```css
/* app.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

```html
<html class="dark">
  <body>
    <div class="bg-white dark:bg-black">...</div>
  </body>
</html>
```

```js
// Ejemplo mínimo para alternar y recordar la preferencia
const root = document.documentElement
const set = m => (root.classList.toggle('dark', m === 'dark'), localStorage.theme = m)
set(localStorage.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
// Llama set('light') o set('dark') desde tu UI
```

> Con `@custom-variant` puedes hacer que `dark:*` dependa de una clase en vez de la media query, y manejar esa clase con JavaScript/`localStorage`. ([tailwindcss.com][1])

### 🏷️ Alternativa con `data-attribute`

¿Prefieres atributos? Usa `data-theme="dark"`:

```css
/* app.css */
@import "tailwindcss";
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

```html
<html data-theme="dark">
  <body>
    <div class="bg-white dark:bg-black">...</div>
  </body>
</html>
```

> La variant `dark` también puede activarse con un selector de atributo. ([tailwindcss.com][1])

### 🖥️ Soportar 3 modos: Light / Dark / System

Para un selector con tres opciones (incluido “System”), sincroniza con `matchMedia`:

```js
// En el <head> o al inicio para evitar FOUC
const root = document.documentElement
function apply() {
  const sysDark = matchMedia('(prefers-color-scheme: dark)').matches
  const pref = localStorage.theme // 'light' | 'dark' | undefined => system
  root.classList.toggle('dark', pref === 'dark' || (pref == null && sysDark))
}
apply();
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', apply);

// setear desde la UI:
const setTheme = m => (m ? localStorage.theme = m : localStorage.removeItem('theme'), apply())
// setTheme('light') | setTheme('dark') | setTheme() => system
```

> La doc muestra este patrón para respetar el sistema y permitir override manual. ([tailwindcss.com][1])

### 🧩 Tips prácticos

* **Mobile-first** igual aplica aquí: define estilos base y luego añade `dark:` donde toque.
* Puedes declarar **tokens** con `@theme` y reutilizarlos en ambos modos (útil para paletas). ([tailwindcss.com][2])
* Considera usar la utility `color-scheme` para que el navegador ajuste UI nativa (scrollbars, formularios):

  ```html
  <html class="scheme-light dark:scheme-dark">
  ```

  ([tailwindcss.com][3])

### 🧪 Snippets rápidos

**Botón**

```html
<button class="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded px-4 py-2">
  Guardar
</button>
```

**Card**

```html
<article class="bg-white text-gray-900 shadow rounded-lg p-6
                dark:bg-gray-900 dark:text-gray-100 dark:shadow-none">
  <h3 class="text-lg font-semibold">Reporte</h3>
  <p class="text-gray-600 dark:text-gray-300">Resumen semanal.</p>
</article>
```

**Tabla (zebra)**

```html
<table class="w-full text-sm">
  <tbody>
    <tr class="odd:bg-gray-50 even:bg-white dark:odd:bg-gray-800 dark:even:bg-gray-900">
      <td class="p-3">Fila 1</td>
    </tr>
    <tr class="odd:bg-gray-50 even:bg-white dark:odd:bg-gray-800 dark:even:bg-gray-900">
      <td class="p-3">Fila 2</td>
    </tr>
  </tbody>
</table>
```

> Referencias oficiales: Dark mode (v4.1), `@custom-variant` con `.dark` y `data-theme`, y patrón con `matchMedia`. ([tailwindcss.com][1])

[1]: https://tailwindcss.com/docs/dark-mode "Dark mode - Core concepts - Tailwind CSS"
[2]: https://tailwindcss.com/docs/theme?utm_source=chatgpt.com "Theme variables - Core concepts"
[3]: https://tailwindcss.com/docs/color-scheme?utm_source=chatgpt.com "color-scheme - Interactivity"

---

## Theme variables

### 🧠 Qué son y para qué sirven

**Theme variables** son **CSS variables especiales** que defines con `@theme` y que **generan utilities** nuevas en tu proyecto. Por ejemplo, si declaras un color `--color-mint-500`, obtienes `bg-mint-500`, `text-mint-500`, etc. Además, Tailwind expone estas variables como **CSS variables normales** para usarlas en estilos inline o en tu propio CSS. ([tailwindcss.com][1])

```css
/* app.css */
@import "tailwindcss";

@theme {
  --color-mint-500: oklch(0.72 0.11 178);
}
```

```html
<div class="bg-mint-500 text-white">Card</div>
<div style="background-color: var(--color-mint-500)">Inline</div>
```

### 🔎 Por qué `@theme` y no `:root`

`@theme` no solo define variables: **instruye a Tailwind** para crear las **utilities** correspondientes. Úsalo cuando quieras que un token mapee a una utility; usa `:root` solo para variables que **no** deben generar utilities. ([tailwindcss.com][1])

### 🧩 Relación con utilities y variants

Muchísimas utilities dependen de **theme variables** (p. ej., fuentes, sombras, colores). Si defines `--font-poppins`, aparece la utility `font-poppins`. Algunas variables definen **variants** como los **breakpoints** (`--breakpoint-*`), lo que habilita prefijos como `3xl:*`. ([tailwindcss.com][1])

```css
@theme { --font-poppins: Poppins, sans-serif; --breakpoint-3xl: 120rem; }
```

```html
<h1 class="font-poppins">Encabezado</h1>
<div class="grid grid-cols-2 md:grid-cols-4 3xl:grid-cols-6">...</div>
```

### 🗂️ Namespaces más comunes (mapa rápido)

Cada **namespace** genera APIs distintas:

* `--color-*` → `bg-…`, `text-…`, etc.
* `--font-*` → `font-sans`, `font-mono`, etc.
* `--text-*` → tamaños `text-sm`, `text-xl`, …
* `--font-weight-*` → pesos `font-semibold`, …
* `--tracking-*`, `--leading-*` → `tracking-*`, `leading-*`
* `--breakpoint-*` → variants responsivas `sm:*`, `md:*`, …
* `--spacing-*`, `--radius-*`, `--shadow-*`, `--drop-shadow-*`, `--blur-*`, `--ease-*`, `--animate-*`, `--aspect-*`, `--container-*`, `--perspective-*`
  Consulta la referencia para la lista completa. ([tailwindcss.com][1])

### 🧱 Extender el theme (extend)

Puedes **añadir** tokens sin tocar los existentes: ([tailwindcss.com][1])

```css
@import "tailwindcss";
@theme {
  --font-script: "Great Vibes", cursive;
}
```

```html
<p class="font-script">Texto bonito</p>
```

### 🧨 Sobrescribir valores (override)

Redefine cualquier token por nombre, p. ej., cambiar `sm` a `30rem`: ([tailwindcss.com][1])

```css
@theme { --breakpoint-sm: 30rem; }
```

Para **reemplazar todo un namespace**, ponlo en `initial` y define tus tokens (elimina los defaults como `bg-red-500`): ([tailwindcss.com][1])

```css
@theme {
  --color-*: initial;
  --color-midnight: #121063;
  --color-tahiti: #3ab7bf;
}
```

### 🧼 Theme 100% propio (sin defaults)

Si quieres **solo** tus tokens, resetea todo con `--*: initial` y define lo necesario (espaciados, fuentes, colores, etc.). ([tailwindcss.com][1])

```css
@theme {
  --*: initial;
  --spacing: 4px;
  --font-body: Inter, sans-serif;
  --color-dusk: oklch(0.82 0.15 72.09);
}
```

### 🎞️ Animations y keyframes

Para `--animate-*`, declara también los `@keyframes` dentro de `@theme` para incluirlos en el build. ([tailwindcss.com][1])

```css
@theme {
  --animate-fade-in-scale: fade-in-scale 0.3s ease-out;
  @keyframes fade-in-scale {
    0% { opacity: 0; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  }
}
```

### 🔗 Referenciar otras variables (`inline`)

Si un token depende de otro, usa `@theme inline` para que la **utility** emita el valor **resuelto** (evita sorpresas por el *scope* de CSS variables). ([tailwindcss.com][1])

```css
@theme inline {
  --font-sans: var(--font-inter);
}
```

### 📦 Generar todas las variables (`static`)

Por defecto, solo se generan las CSS variables **usadas**. Si quieres **todas** siempre, usa `@theme static`. ([tailwindcss.com][1])

```css
@theme static {
  --color-primary: var(--color-red-500);
  --color-secondary: var(--color-blue-500);
}
```

### 🔁 Compartir un theme entre proyectos

Guarda tu theme en un CSS aparte y **reúsalo con `@import`** en otros paquetes/proyectos (ideal para monorepos o publicar en NPM). ([tailwindcss.com][1])

```css
/* packages/brand/theme.css */
@theme {
  --*: initial;
  --spacing: 4px;
  --font-body: Inter, sans-serif;
  --color-lagoon: oklch(0.72 0.11 221.19);
}
```

```css
/* packages/admin/app.css */
@import "tailwindcss";
@import "../brand/theme.css";
```

### 🛠️ Usar tus tokens fuera de utilities

**En tu CSS propio** (`@layer components`) puedes leer tokens con `var(--…)`. También puedes usarlos en **arbitrary values** (`[...]`) y desde **JavaScript** vía `getComputedStyle`. ([tailwindcss.com][1])

```css
@layer components {
  .prose {
    p { font-size: var(--text-base); color: var(--color-gray-700); }
    h1 { font-size: var(--text-2xl--line-height); font-weight: var(--font-weight-semibold); }
  }
}
```

```html
<div class="rounded-[calc(var(--radius-xl)-1px)]">Borde concéntrico</div>
```

```js
const styles = getComputedStyle(document.documentElement);
const shadow = styles.getPropertyValue('--shadow-xl');
```

### ⚡ Mini-guía express

1. Declara tokens con `@theme`. 2) Usa **utilities** generadas automáticamente.
2. Para relaciones entre tokens, usa `@theme inline`.
3. Si necesitas *build* completo de variables, `@theme static`.
4. Comparte tu theme con `@import` cuando trabajes multi-proyecto. ([tailwindcss.com][1])

> Base oficial: **Theme variables** en Tailwind v4 (namespaces, overrides, inline/static y reuso). ([tailwindcss.com][1])

[1]: https://tailwindcss.com/docs/theme "Theme variables - Core concepts - Tailwind CSS"

---

## Diferencia entre `@theme` y `@theme inline`

### Qué hace `@theme`

* **Define tokens** (CSS variables) y **genera utilities** que usan `var(--token)` en el CSS final.
* El valor se **resuelve en runtime** (tiempo de ejecución del navegador), así que **puedes override** esos tokens más tarde (por ejemplo, en `.dark` o `[data-theme=…]`) y **todas** las utilities que dependan de esos tokens **cambian automáticamente**.
* Úsalo cuando quieras **temear** (light/dark, marcas, campuses) o permitir **scope/cascade** dinámico.

```css
@import "tailwindcss";

@theme {
  --color-brand: var(--color-blue-600);
  --color-blue-600: oklch(0.64 0.16 264);
}

/* En otro lugar (p. ej. dark mode): */
.dark {
  --color-blue-600: oklch(0.58 0.16 264); /* cambia el azul ⇒ brand cambia también */
}
```

```html
<button class="bg-brand text-white px-4 py-2 rounded">Comprar</button>
<!-- compila a background-color: var(--color-brand); -->
```

**Resultado:** `bg-brand` seguirá lo que valga `--color-blue-600` **en ese contexto** (light/dark, overrides locales, etc.).

### Qué hace `@theme inline`

* También define tokens, pero al generar utilities **inserta el valor “final” directamente** (sin `var(...)`), es decir, **resuelve/“aplana”** los alias **en build time**.
* El valor queda **estático** en el CSS generado. Si luego haces un override de variables, **esas utilities no cambian**.
* Úsalo cuando quieras **congelar** un token (evitar que herede cambios posteriores), o cuando busques **evitar sorpresas de scope** por CSS variables.

```css
@import "tailwindcss";

@theme {
  --color-blue-600: oklch(0.64 0.16 264);
}
@theme inline {
  --color-brand: var(--color-blue-600); /* se “aplana” en build */
}

/* Más tarde intentas override: */
.dark { --color-blue-600: oklch(0.58 0.16 264); }
```

```html
<button class="bg-brand text-white px-4 py-2 rounded">Comprar</button>
<!-- compila a background-color: oklch(0.64 0.16 264); (valor fijo) -->
```

**Resultado:** `bg-brand` **no** cambia en dark mode, porque el valor quedó embebido.

### Cuándo usar cada uno (regla rápida)

* **`@theme` (runtime, con `var(...)`)** → cuando quieres **temas dinámicos**, soportar **overrides** (dark mode, multibrand), y beneficiarte del **scope** de CSS variables.
* **`@theme inline` (build time, valor fijo)** → cuando quieres **alias inmutables**, evitar efectos del **cascade** o empaquetar un **design system** con valores ya resueltos (sin depender del host).

### Mini-resumen en una frase

* `@theme` = **dinámico** (utilities referencian `var(--token)` → reacciona a overrides).
* `@theme inline` = **estático** (utilities llevan el **valor final** → no reacciona a overrides).

