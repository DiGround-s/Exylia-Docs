import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEFAULT_LANG, LANGS, SITE, toLang, type Lang } from "@/content/registry";
import { HtmlLang } from "@/components/HtmlLang";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return {
    description: SITE.description[lang],
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(LANGS.map((code) => [code, `/${code}`])), "x-default": `/${DEFAULT_LANG}` },
    },
    openGraph: { locale: lang === "es" ? "es_ES" : "en_US" },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!LANGS.includes(lang as Lang)) notFound();

  return (
    <>
      <HtmlLang lang={lang as Lang} />
      {children}
    </>
  );
}
