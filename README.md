# Exylia Docs

Documentación de los plugins de Exylia. Sitio estático en Next.js, sin backend.

Contenido en `content/<plugin>/<idioma>/*.mdx`, disponible en inglés y español.

## Desarrollo

```bash
pnpm install
pnpm dev
```

http://localhost:3010

## Producción

```bash
docker compose up -d --build
```

Nginx sirve el export estático en el puerto 3010.
