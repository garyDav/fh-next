# Development
Pasos para levantar la app en desarrollo


1. Levantar la base de datos
```
docker compose up -d
```

2. Crear una copia de el .env.template y renombrarlo a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ```npm install``` para reconstruir los módulos de node
5. Ejecutar el comando ```npm run dev``` para ejecutar aplicación en desarrollo
6. Ejecutar estos comandos de Prisma
```
npx prisma migrate dev
npx prisma generate
```
7. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)


## Nota: Usuario por defecto
__usuario:__  test1@google.com
__password:__ 123456


# Prisma commnads
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

### Generar cadena de longitud 32

A partir de código `openssl rand -base64 32` o desde la página: https://generate-secret.vercel.app/32

Para la variable `NEXTAUTH_SECRET`

### Importante

Asegúrate de que las versiones de `prisma` y `@prisma/client` coincidan exactamente. Por ejemplo: `"@prisma/client": "^6.10.1", "prisma": "^6.10.1"`.

### Configuración Provider GitHub

Perfil -> Settings -> Developer settings -> New OAuth App

Application name -> -> Admin-Todos
Homepage URL -> Cualquiera
Authorization callback URL -> este es importante -> http://localhost:3000/api/auth/callback/github

Copiamos nuestro `Client ID` y `Client secrets` a `.env`

# Prod


# Stage
