import type { Lang, Localized } from "./registry";

/**
 * Every string of chrome the site draws.
 *
 * Page content lives in MDX; this file is only what surrounds it — navigation,
 * labels, empty states. Keeping it in one place is what makes a missing
 * translation a type error rather than an English word on a Spanish page.
 */
export const dict = {
  nav: {
    plugins: { en: "Plugins", es: "Plugins" },
    ecosystem: { en: "Approach", es: "Ecosistema" },
    search: { en: "Search", es: "Buscar" },
    menu: { en: "Menu", es: "Menú" },
    docsSuffix: { en: "/ docs", es: "/ docs" },
  },
  search: {
    placeholder: { en: "Search the documentation…", es: "Buscar en la documentación…" },
    empty: { en: "Type to search", es: "Escribe para buscar" },
    noResults: { en: "No results for", es: "Sin resultados para" },
    navigate: { en: "navigate", es: "navegar" },
    open: { en: "open", es: "abrir" },
    pages: { en: "pages", es: "páginas" },
    close: { en: "close", es: "cerrar" },
  },
  docs: {
    onThisPage: { en: "On this page", es: "En esta página" },
    previous: { en: "Previous", es: "Anterior" },
    next: { en: "Next", es: "Siguiente" },
    documentation: { en: "Documentation", es: "Documentación" },
    index: { en: "Index", es: "Índice" },
    start: { en: "Get started", es: "Empezar" },
    soon: { en: "soon", es: "pronto" },
    missing: { en: "Something missing on this page?", es: "¿Falta algo en esta página?" },
    missingLink: { en: "Tell us on Discord", es: "Dínoslo en Discord" },
    copy: { en: "Copy code", es: "Copiar código" },
    facts: {
      version: { en: "Version", es: "Versión" },
      minecraft: { en: "Minecraft", es: "Minecraft" },
      category: { en: "Category", es: "Categoría" },
      pages: { en: "Pages", es: "Páginas" },
    },
  },
  landing: {
    kicker: { en: "Official documentation", es: "Documentación oficial" },
    line1: { en: "Every plugin,", es: "Cada plugin," },
    line2: { en: "explained the way", es: "explicado como" },
    line3: { en: "it was built", es: "fue construido" },
    lead: {
      en: "Installation guides, configuration reference, commands, permissions, placeholders and API. No filler: only what the plugin actually does.",
      es: "Guías de instalación, referencia de configuración, comandos, permisos, placeholders y API. Sin relleno: solo lo que el plugin hace de verdad.",
    },
    ctaPrimary: { en: "Read ExyliaFFA", es: "Leer ExyliaFFA" },
    ctaSecondary: { en: "Browse the catalogue", es: "Ver catálogo" },
    scroll: { en: "Scroll", es: "Scroll" },
    catalogKicker: { en: "Catalogue", es: "Catálogo" },
    catalogTitle: { en: "All the plugins", es: "Todos los plugins" },
    catalogLead: {
      en: "One space per plugin, all with the same structure: getting started, configuring, systems and reference. They go live as their documentation is written.",
      es: "Un espacio por plugin, con la misma estructura: empezar, configurar, sistemas y referencia. Se publican a medida que su documentación se escribe.",
    },
    statusStable: { en: "Documented", es: "Documentado" },
    statusBeta: { en: "In progress", es: "En progreso" },
    statusSoon: { en: "Coming soon", es: "Próximamente" },
    unpublished: { en: "unpublished", es: "sin publicar" },
    openPlugin: { en: "Open", es: "Abrir" },
    approachKicker: { en: "How it is written", es: "Cómo se escribe" },
    approachTitle1: { en: "Documenting", es: "Documentar" },
    approachTitle2: { en: "is part of the", es: "es parte del" },
    approachTitle3: { en: "product", es: "producto" },
    approachLead: {
      en: "A plugin nobody can configure is not finished. These pages are the manual we would want to find when buying software for our own server.",
      es: "Un plugin que nadie sabe configurar no está terminado. Estas páginas son el manual que nos gustaría encontrar al comprar software para nuestro propio servidor.",
    },
    principles: [
      {
        title: { en: "Written next to the code", es: "Escrita junto al código" },
        body: {
          en: "Every default, permission and placeholder comes from the plugin's actual source, not from a template.",
          es: "Cada valor por defecto, cada permiso y cada placeholder sale del código real del plugin, no de una plantilla.",
        },
      },
      {
        title: { en: "One structure, every plugin", es: "Una estructura, todos los plugins" },
        body: {
          en: "Getting started, configuring, systems and reference. Learn to read it once and it holds for the rest.",
          es: "Empezar, configurar, sistemas y referencia. Aprendes a leer una vez y sirve para el resto.",
        },
      },
      {
        title: { en: "Versioned with the release", es: "Versionada con el release" },
        body: {
          en: "When a key is renamed or migrated, the page says so and explains what the migration does.",
          es: "Cuando una clave cambia de nombre o migra, la página lo dice y explica qué hace la migración.",
        },
      },
      {
        title: { en: "Quick to read", es: "Rápida de leer" },
        body: {
          en: "Instant search, a side index, keyboard navigation and static pages served without blocking.",
          es: "Búsqueda instantánea, índice lateral, navegación con teclado y páginas estáticas servidas sin bloqueo.",
        },
      },
    ],
    ctaTitle: { en: "Still not clear?", es: "¿Algo no queda claro?" },
    ctaLead: {
      en: "Support runs on Discord, next to the team that writes these plugins. Licences are handled there too.",
      es: "El soporte se atiende en Discord, junto al equipo que escribe estos plugins. Las licencias también se gestionan ahí.",
    },
    ctaButton: { en: "Join the Discord", es: "Entrar al Discord" },
    ctaSecondaryLink: { en: "Read the FAQ", es: "Ver preguntas frecuentes" },
  },
  footer: {
    blurb: {
      en: "Official documentation for Exylia's plugin ecosystem. Written next to the code, versioned with every release.",
      es: "Documentación oficial del ecosistema de plugins de Exylia. Escrita junto al código, versionada con cada release.",
    },
    docs: { en: "Documentation", es: "Documentación" },
    allPlugins: { en: "All plugins", es: "Todos los plugins" },
    exylia: { en: "Exylia", es: "Exylia" },
    madeWith: { en: "Made with care, not in a hurry", es: "Hecho con cuidado, no con prisa" },
  },
  notFound: {
    kicker: { en: "Error 404", es: "Error 404" },
    title: { en: "This page does not exist", es: "Esta página no existe" },
    body: {
      en: "The documentation may have moved, or may not be published yet.",
      es: "Puede que la documentación se haya movido, o que aún no esté publicada.",
    },
    back: { en: "Back to the start", es: "Volver al inicio" },
  },
  redirect: {
    detecting: { en: "Detecting your language…", es: "Detectando tu idioma…" },
    manual: { en: "Continue in English", es: "Continuar en español" },
  },
} as const;

/** Reads one entry of the dictionary in a language. */
export function t(entry: Localized, lang: Lang): string {
  return entry[lang];
}
