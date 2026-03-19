# Mariana Fiorillo Portfolio

Portfolio estático construido con React + Vite para mostrar trabajo en strategic foresight, product leadership, mentoring y escritura.

## Stack

- React 19
- Vite 8
- React Router
- Tailwind CSS v4
- Vercel Analytics

## Estructura

- `src/app`: router central y composición global
- `src/features/home`: landing page y secciones del home
- `src/features/blog`: listado y detalle de posts
- `src/features/cases`: navegación y renderer genérico de case studies
- `src/features/content`: normalización de contenido y language provider
- `src/shared`: SEO, analytics, componentes y utilidades transversales
- `src/data`: contenido versionado del portfolio
- `public/admin`: scaffold de CMS Git-based con Decap

## Desarrollo

```bash
npm install
npm run dev
```

## Checks

```bash
npm run content:check
npm run lint
npm run build
npm run check
```

## Flujo editorial

El contenido principal vive en:

- `src/data/posts.json`
- `src/data/cases.json`

La app normaliza esos archivos hacia un esquema consistente en `src/features/content`.

### Publicar un post

1. Agregar un objeto con `slug`, `date`, `label`, `en`, `es`.
2. Completar `title`, `excerpt` y `content` en ambos idiomas.
3. Ejecutar `npm run content:check`.

### Publicar un case study

1. Agregar una nueva entrada en `src/data/cases.json`.
2. Completar hero, about y las secciones requeridas en `en` y `es`.
3. Registrar el slug y su metadata editorial en `src/features/cases/data/caseRegistry.js`.
4. Ejecutar `npm run content:check`.

## CMS Git-based

El panel público `/admin` fue retirado del routing principal por seguridad. En su lugar:

- existe un scaffold en `public/admin`
- el flujo soportado hoy es edición directa del repo
- si querés activar Decap en producción, necesitás configurar autenticación (`git-gateway` u OAuth) en tu hosting

## Notas de mantenimiento

- No hay secretos ni tokens en el frontend público.
- El routing de blog y casos sale de una sola fuente de verdad.
- El siguiente paso natural, si querés profundizar, es optimizar imágenes grandes y migrar gradualmente el contenido a un schema aún más estricto.
