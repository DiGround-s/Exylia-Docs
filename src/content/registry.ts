/**
 * The documentation registry.
 *
 * Adding a plugin is two steps: describe it here, then drop the matching
 * `.mdx` files under `content/<id>/<lang>/`. Page titles and descriptions are
 * read from each file's frontmatter, never repeated in this file.
 */

export const LANGS = ["en", "es"] as const;
export type Lang = (typeof LANGS)[number];

/** English is the fallback everywhere: it is what an unknown locale gets. */
export const DEFAULT_LANG: Lang = "en";

export type Localized = Record<Lang, string>;

export type DocStatus = "stable" | "beta" | "soon";

/**
 * One page, in both languages.
 *
 * `id` is the stable identity across languages — it is what lets the language
 * toggle land on the same page instead of the index. The slugs are what the URL
 * and the file name read, and they differ on purpose: an English URL should not
 * say `introduccion`.
 */
export type DocRef = {
  id: string;
  slugs: Localized;
};

export type NavGroup = {
  label: Localized;
  pages: DocRef[];
};

export type Plugin = {
  id: string;
  name: string;
  tagline: Localized;
  summary: Localized;
  version: string;
  status: DocStatus;
  category: Localized;
  /** Minecraft versions the plugin targets. */
  minecraft: string;
  tags: Localized[];
  /** Sidebar structure. Empty for plugins whose docs are not written yet. */
  nav: NavGroup[];
  links?: { label: string; href: string }[];
};

export const SITE = {
  name: "Exylia Docs",
  url: "https://docs.exylia.net",
  discord: "https://discord.exylia.net",
  hub: "https://exylia.net",
  spigot: "https://link.exylia.net/@services",
  description: {
    en: "Official documentation for Exylia's Minecraft plugins: installation guides, configuration reference, commands, permissions, placeholders and API.",
    es: "Documentación oficial de los plugins de Exylia: guías de instalación, configuración, comandos, permisos, placeholders y API.",
  } satisfies Localized,
} as const;

/** Shorthand for a page whose slug is the same string in both languages. */
function page(id: string, en: string, es: string): DocRef {
  return { id, slugs: { en, es } };
}

const FFA_NAV: NavGroup[] = [
  {
    label: { en: "Getting started", es: "Empezar" },
    pages: [
      page("introduction", "introduction", "introduccion"),
      page("installation", "installation", "instalacion"),
      page("first-steps", "first-steps", "primeros-pasos"),
    ],
  },
  {
    label: { en: "Configuring", es: "Configurar" },
    pages: [
      page("arenas", "arenas", "arenas"),
      page("rules", "rules", "reglas"),
      page("kits", "kits", "kits"),
      page("spawns", "spawns", "spawns"),
      page("regeneration", "regeneration", "regeneracion"),
    ],
  },
  {
    label: { en: "Systems", es: "Sistemas" },
    pages: [
      page("combat", "combat", "combate"),
      page("killstreaks", "killstreaks", "killstreaks"),
      page("stats", "stats", "estadisticas"),
      page("scoreboard", "scoreboard", "scoreboard"),
      page("player-settings", "player-settings", "ajustes-jugador"),
    ],
  },
  {
    label: { en: "Reference", es: "Referencia" },
    pages: [
      page("commands", "commands", "comandos"),
      page("permissions", "permissions", "permisos"),
      page("placeholders", "placeholders", "placeholders"),
      page("configuration", "configuration", "configuracion"),
      page("api", "api", "api"),
      page("faq", "faq", "faq"),
    ],
  },
];

const CAPTURE_NAV: NavGroup[] = [
  {
    label: { en: "Getting started", es: "Empezar" },
    pages: [
      page("introduction", "introduction", "introduccion"),
      page("installation", "installation", "instalacion"),
      page("first-steps", "first-steps", "primeros-pasos"),
    ],
  },
  {
    label: { en: "Configuring", es: "Configurar" },
    pages: [
      page("event-types", "event-types", "tipos-de-evento"),
      page("zones", "zones", "zonas"),
      page("rewards", "rewards", "recompensas"),
      page("scheduling", "scheduling", "programacion"),
    ],
  },
  {
    label: { en: "Systems", es: "Sistemas" },
    pages: [
      page("clans", "clans", "clanes"),
      page("stats", "stats", "estadisticas"),
      page("visuals", "visuals", "visuales"),
    ],
  },
  {
    label: { en: "Reference", es: "Referencia" },
    pages: [
      page("commands", "commands", "comandos"),
      page("placeholders", "placeholders", "placeholders"),
      page("configuration", "configuration", "configuracion"),
      page("api", "api", "api"),
      page("faq", "faq", "faq"),
    ],
  },
];

const EVENTS_NAV: NavGroup[] = [
  {
    label: { en: "Getting started", es: "Empezar" },
    pages: [
      page("introduction", "introduction", "introduccion"),
      page("installation", "installation", "instalacion"),
      page("first-steps", "first-steps", "primeros-pasos"),
    ],
  },
  {
    label: { en: "Configuring", es: "Configurar" },
    pages: [
      page("arenas", "arenas", "arenas"),
      page("event-types", "event-types", "tipos-de-evento"),
      page("teams-and-kits", "teams-and-kits", "equipos-y-kits"),
      page("rewards", "rewards", "recompensas"),
    ],
  },
  {
    label: { en: "Systems", es: "Sistemas" },
    pages: [
      page("game-flow", "game-flow", "flujo-de-juego"),
      page("inscriptions", "inscriptions", "inscripciones"),
      page("stats", "stats", "estadisticas"),
      page("visuals", "visuals", "visuales"),
    ],
  },
  {
    label: { en: "Reference", es: "Referencia" },
    pages: [
      page("commands", "commands", "comandos"),
      page("placeholders", "placeholders", "placeholders"),
      page("configuration", "configuration", "configuracion"),
      page("api", "api", "api"),
      page("faq", "faq", "faq"),
    ],
  },
];

const LIB_NAV: NavGroup[] = [
  {
    label: { en: "Getting started", es: "Empezar" },
    pages: [
      page("introduction", "introduction", "introduccion"),
      page("installation", "installation", "instalacion"),
      page("first-plugin", "first-plugin", "primer-plugin"),
    ],
  },
  {
    label: { en: "Foundations", es: "Fundamentos" },
    pages: [
      page("config", "configuration", "configuracion"),
      page("text", "text", "texto"),
      page("tasks", "tasks", "tareas"),
      page("database", "database", "base-de-datos"),
    ],
  },
  {
    label: { en: "Interfaces", es: "Interfaces" },
    pages: [
      page("menus", "menus", "menus"),
      page("items", "items", "items"),
      page("actions", "actions", "acciones"),
      page("input", "input-and-editors", "entrada-y-editores"),
    ],
  },
  {
    label: { en: "Gameplay", es: "Juego" },
    pages: [
      page("effects", "effects", "efectos"),
      page("display", "display", "pantalla"),
      page("world", "world", "mundo"),
      page("players", "players", "jugadores"),
      page("rewards", "rewards", "recompensas"),
    ],
  },
  {
    label: { en: "Reference", es: "Referencia" },
    pages: [
      page("modules", "modules", "modulos"),
      page("faq", "faq", "faq"),
    ],
  },
];

function cosmeticNav(effectsEn: string, effectsEs: string): NavGroup[] {
  return [
    {
      label: { en: "Getting started", es: "Empezar" },
      pages: [
        page("introduction", "introduction", "introduccion"),
        page("installation", "installation", "instalacion"),
      ],
    },
    {
      label: { en: "Configuring", es: "Configurar" },
      pages: [page("effects", effectsEn, effectsEs)],
    },
    {
      label: { en: "Reference", es: "Referencia" },
      pages: [
        page("commands", "commands", "comandos"),
        page("placeholders", "placeholders", "placeholders"),
        page("faq", "faq", "faq"),
      ],
    },
  ];
}

const SHIELDS_NAV: NavGroup[] = [
  {
    label: { en: "Getting started", es: "Empezar" },
    pages: [
      page("introduction", "introduction", "introduccion"),
      page("installation", "installation", "instalacion"),
    ],
  },
  {
    label: { en: "Configuring", es: "Configurar" },
    pages: [
      page("designs", "designs", "disenos"),
      page("community", "community", "comunidad"),
    ],
  },
  {
    label: { en: "Reference", es: "Referencia" },
    pages: [
      page("commands", "commands", "comandos"),
      page("api", "api", "api"),
      page("faq", "faq", "faq"),
    ],
  },
];

export const plugins: Plugin[] = [
  {
    id: "exyliaffa",
    name: "ExyliaFFA",
    tagline: {
      en: "High-performance FFA system",
      es: "Sistema FFA de alto rendimiento",
    },
    summary: {
      en: "Unlimited arenas, multiple kits, permission-gated spawns, per-arena rules, schematic regeneration, persistent stats and a full admin panel.",
      es: "Arenas ilimitadas, kits múltiples, spawns con permisos, reglas por arena, regeneración con esquemáticos, estadísticas persistentes y panel de administración completo.",
    },
    version: "1.1.0",
    status: "stable",
    category: { en: "Gamemode", es: "Modo de juego" },
    minecraft: "1.21+",
    tags: [
      { en: "Arenas", es: "Arenas" },
      { en: "Kits", es: "Kits" },
      { en: "Stats", es: "Estadísticas" },
      { en: "Folia", es: "Folia" },
    ],
    nav: FFA_NAV,
    links: [
      { label: "SpigotMC", href: "https://link.exylia.net/@services" },
      { label: "Discord", href: "https://discord.exylia.net" },
    ],
  },
  {
    id: "exyliapractice",
    name: "ExyliaPracticeCore",
    tagline: { en: "Competitive practice core", es: "Núcleo de Practice competitivo" },
    summary: {
      en: "Queues, ladders, dynamic arenas, parties, tournaments and ELO stats for practice servers.",
      es: "Colas, ladders, arenas dinámicas, parties, torneos y estadísticas ELO para servidores de práctica.",
    },
    version: "—",
    status: "soon",
    category: { en: "Gamemode", es: "Modo de juego" },
    minecraft: "1.21+",
    tags: [
      { en: "Queue", es: "Colas" },
      { en: "Ladders", es: "Ladders" },
      { en: "ELO", es: "ELO" },
    ],
    nav: [],
  },
  {
    id: "exyliacapture",
    name: "ExyliaCapture",
    tagline: {
      en: "Zone-capture events, seven mechanics",
      es: "Eventos de captura de zona, siete mecánicas",
    },
    summary: {
      en: "KOTH, point-scored KOTH, Conquest, Payload and Destroy The Core, all created from in-game menus with a shared zone wand, schedules, rewards and clan support.",
      es: "KOTH, KOTH por puntos, Conquest, Payload y Destroy The Core, todos creados desde menús in-game con selector de zona, horarios, recompensas y soporte de clanes.",
    },
    version: "1.0.4",
    status: "stable",
    category: { en: "Events", es: "Eventos" },
    minecraft: "1.21+",
    tags: [
      { en: "KOTH", es: "KOTH" },
      { en: "Conquest", es: "Conquest" },
      { en: "Payload", es: "Payload" },
      { en: "Clans", es: "Clanes" },
    ],
    nav: CAPTURE_NAV,
    links: [
      { label: "SpigotMC", href: "https://link.exylia.net/@services" },
      { label: "Discord", href: "https://discord.exylia.net" },
    ],
  },
  {
    id: "exyliakilleffect",
    name: "ExyliaKillEffect",
    tagline: { en: "Particle effects on every kill", es: "Efectos de partículas en cada baja" },
    summary: {
      en: "144 kill effects across 14 categories, chosen from a menu, sold by permission and written as sequences a server owner can edit.",
      es: "144 efectos de muerte en 14 categorías, elegidos desde un menú, vendidos por permiso y escritos como secuencias que el dueño puede editar.",
    },
    version: "1.0.8",
    status: "stable",
    category: { en: "Cosmetic", es: "Cosmético" },
    minecraft: "1.21+",
    tags: [
      { en: "Particles", es: "Partículas" },
      { en: "Cosmetic", es: "Cosmético" },
      { en: "Folia", es: "Folia" },
    ],
    nav: cosmeticNav("effects", "efectos"),
    links: [
      { label: "SpigotMC", href: "https://link.exylia.net/@services" },
      { label: "Discord", href: "https://discord.exylia.net" },
    ],
  },
  {
    id: "exyliahiteffect",
    name: "ExyliaHitEffect",
    tagline: { en: "Particle effects on every hit", es: "Efectos de partículas en cada golpe" },
    summary: {
      en: "80 hit effects across 9 categories, played on the victim as they are struck, chosen from a menu and gated by permission.",
      es: "80 efectos de golpe en 9 categorías, lanzados sobre la víctima al recibir el impacto, elegidos desde un menú y limitados por permiso.",
    },
    version: "1.0.8",
    status: "stable",
    category: { en: "Cosmetic", es: "Cosmético" },
    minecraft: "1.21+",
    tags: [
      { en: "Particles", es: "Partículas" },
      { en: "Combat", es: "Combate" },
      { en: "Folia", es: "Folia" },
    ],
    nav: cosmeticNav("effects", "efectos"),
    links: [
      { label: "SpigotMC", href: "https://link.exylia.net/@services" },
      { label: "Discord", href: "https://discord.exylia.net" },
    ],
  },
  {
    id: "exyliaarmortrims",
    name: "ExyliaArmorTrims",
    tagline: { en: "Armour trims without a smithing table", es: "Trims de armadura sin mesa de forja" },
    summary: {
      en: "18 patterns and 11 materials applied to equipped armour from a menu, per piece, sold by permission and reapplied whenever armour is equipped.",
      es: "18 patrones y 11 materiales aplicados a la armadura equipada desde un menú, pieza por pieza, vendidos por permiso y reaplicados al equiparse.",
    },
    version: "1.0.10",
    status: "stable",
    category: { en: "Cosmetic", es: "Cosmético" },
    minecraft: "1.21+",
    tags: [
      { en: "Trims", es: "Trims" },
      { en: "Cosmetic", es: "Cosmético" },
      { en: "Folia", es: "Folia" },
    ],
    nav: cosmeticNav("trims", "trims"),
    links: [
      { label: "SpigotMC", href: "https://link.exylia.net/@services" },
      { label: "Discord", href: "https://discord.exylia.net" },
    ],
  },
  {
    id: "exyliaarrows",
    name: "ExyliaArrows",
    tagline: { en: "Trails and impacts on every projectile", es: "Estelas e impactos en cada proyectil" },
    summary: {
      en: "65 projectile effects across 6 categories, with five triggers — launch, trail, hit, hit entity and hit block — chosen from a menu and gated by permission.",
      es: "65 efectos de proyectil en 6 categorías, con cinco disparadores — lanzamiento, estela, impacto, impacto a entidad e impacto a bloque — elegidos desde un menú y limitados por permiso.",
    },
    version: "1.0.3",
    status: "stable",
    category: { en: "Cosmetic", es: "Cosmético" },
    minecraft: "1.21+",
    tags: [
      { en: "Particles", es: "Partículas" },
      { en: "Projectiles", es: "Proyectiles" },
      { en: "Folia", es: "Folia" },
    ],
    nav: cosmeticNav("effects", "efectos"),
    links: [
      { label: "SpigotMC", href: "https://link.exylia.net/@services" },
      { label: "Discord", href: "https://discord.exylia.net" },
    ],
  },
  {
    id: "exyliashields",
    name: "ExyliaShields",
    tagline: { en: "A shield design editor in a menu", es: "Un editor de escudos en un menú" },
    summary: {
      en: "41 patterns and 16 colours layered into custom shield designs, saved in numbered slots, sold by permission and shareable through a community library.",
      es: "41 patrones y 16 colores en capas para diseñar escudos, guardados en ranuras numeradas, vendidos por permiso y compartibles en una biblioteca comunitaria.",
    },
    version: "1.0.3",
    status: "stable",
    category: { en: "Cosmetic", es: "Cosmético" },
    minecraft: "1.21+",
    tags: [
      { en: "Shields", es: "Escudos" },
      { en: "Editor", es: "Editor" },
      { en: "Folia", es: "Folia" },
    ],
    nav: SHIELDS_NAV,
    links: [
      { label: "SpigotMC", href: "https://link.exylia.net/@services" },
      { label: "Discord", href: "https://discord.exylia.net" },
    ],
  },
  {
    id: "exyliaclans",
    name: "ExyliaClans",
    tagline: { en: "Clans, wars and territory", es: "Clanes, guerras y territorios" },
    summary: {
      en: "Clan system with roles, bank, alliances, scheduled wars and a persistent ranking.",
      es: "Sistema de clanes con roles, banco, alianzas, guerras programadas y ranking persistente.",
    },
    version: "—",
    status: "soon",
    category: { en: "Social", es: "Social" },
    minecraft: "1.21+",
    tags: [
      { en: "Clans", es: "Clanes" },
      { en: "Wars", es: "Guerras" },
      { en: "Ranking", es: "Ranking" },
    ],
    nav: [],
  },
  {
    id: "exyliaevents",
    name: "ExyliaEvents",
    tagline: { en: "Thirty-four minigames in one plugin", es: "Treinta y cuatro minijuegos en un plugin" },
    summary: {
      en: "TNT Tag, Spleef, OITC, CS:GO, Build Battle, Survival Games and thirty more, each with its own arena, settings, kits, rewards and scoreboard, run from in-game menus.",
      es: "TNT Tag, Spleef, OITC, CS:GO, Build Battle, Survival Games y treinta más, cada uno con su arena, ajustes, kits, recompensas y scoreboard, todo desde menús in-game.",
    },
    version: "1.0.13",
    status: "stable",
    category: { en: "Events", es: "Eventos" },
    minecraft: "1.21+",
    tags: [
      { en: "Minigames", es: "Minijuegos" },
      { en: "Teams", es: "Equipos" },
      { en: "Arenas", es: "Arenas" },
      { en: "Folia", es: "Folia" },
    ],
    nav: EVENTS_NAV,
    links: [
      { label: "SpigotMC", href: "https://link.exylia.net/@services" },
      { label: "Discord", href: "https://discord.exylia.net" },
    ],
  },
  {
    id: "exylialib",
    name: "ExyliaLib",
    tagline: { en: "The library behind the ecosystem", es: "La librería que sostiene el ecosistema" },
    summary: {
      en: "Thirty-seven modules every Exylia plugin builds on: typed configuration with migrations, YAML menus, database, placeholders, effects, actions, regions, rewards and one scheduler for Spigot, Paper and Folia.",
      es: "Treinta y siete módulos sobre los que se apoya cada plugin de Exylia: configuración tipada con migraciones, menús en YAML, base de datos, placeholders, efectos, acciones, regiones, recompensas y un solo scheduler para Spigot, Paper y Folia.",
    },
    version: "1.61.0",
    status: "stable",
    category: { en: "Library", es: "Librería" },
    minecraft: "1.21+",
    tags: [
      { en: "Config", es: "Config" },
      { en: "Menus", es: "Menús" },
      { en: "Database", es: "Database" },
      { en: "Folia", es: "Folia" },
    ],
    nav: LIB_NAV,
    links: [
      { label: "Discord", href: "https://discord.exylia.net" },
    ],
  },
  {
    id: "exyliastaff",
    name: "ExyliaStaff",
    tagline: { en: "Moderation tooling", es: "Herramientas de moderación" },
    summary: {
      en: "Staff mode, vanish, inventory inspection, freeze, reports and a punishment log.",
      es: "Modo staff, vanish, inspección de inventarios, freeze, reportes y registro de sanciones.",
    },
    version: "—",
    status: "soon",
    category: { en: "Moderation", es: "Moderación" },
    minecraft: "1.21+",
    tags: [
      { en: "Staff", es: "Staff" },
      { en: "Vanish", es: "Vanish" },
      { en: "Reports", es: "Reportes" },
    ],
    nav: [],
  },
];

export function getPlugin(id: string): Plugin | undefined {
  return plugins.find((p) => p.id === id);
}

/** The plugins whose documentation is published. */
export const documentedPlugins = plugins.filter((p) => p.nav.length > 0);

/** Narrows an arbitrary string to a supported language, or falls back. */
export function toLang(value: string | undefined): Lang {
  return LANGS.includes(value as Lang) ? (value as Lang) : DEFAULT_LANG;
}

/** The same page's slug in another language, for the language toggle. */
export function translateSlug(plugin: string, slug: string, from: Lang, to: Lang): string | null {
  const entry = getPlugin(plugin);
  if (!entry) return null;
  for (const group of entry.nav) {
    const match = group.pages.find((p) => p.slugs[from] === slug);
    if (match) return match.slugs[to];
  }
  return null;
}
