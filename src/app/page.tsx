import { LanguageRedirect } from "@/components/LanguageRedirect";

/**
 * The root, which belongs to no language.
 *
 * A static export has no server to read `Accept-Language`, so the choice is
 * made in the browser: a remembered preference first, then `navigator.
 * languages`, then English. The `<noscript>` path is not decoration — without
 * JavaScript this page would otherwise be a dead end.
 */
export default function RootPage() {
  return <LanguageRedirect />;
}
