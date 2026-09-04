import type { MetadataRoute } from "next";
import { documentedPlugins, LANGS, SITE } from "@/content/registry";
import { getAllDocParams } from "@/lib/docs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}/`;
  const alternates = (path: (lang: string) => string) => ({
    languages: Object.fromEntries(LANGS.map((code) => [code, url(path(code))])),
  });

  return [
    ...LANGS.map((lang) => ({ url: url(`/${lang}`), alternates: alternates((l) => `/${l}`), priority: 1 })),
    ...LANGS.flatMap((lang) =>
      documentedPlugins.map((plugin) => ({
        url: url(`/${lang}/docs/${plugin.id}`),
        alternates: alternates((l) => `/${l}/docs/${plugin.id}`),
        priority: 0.8,
      })),
    ),
    ...getAllDocParams().map(({ lang, plugin, slug }) => ({
      url: url(`/${lang}/docs/${plugin}/${slug}`),
      priority: 0.6,
    })),
  ];
}
