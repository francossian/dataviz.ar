// Globals set by the inline language script in Layout.astro, so bundled
// component scripts (e.g. LanguageToggle) can switch the site language.
interface Window {
  __setSiteLang?: (lang: string) => void;
  /** Google Analytics, forwarded to the Partytown worker */
  gtag?: (...args: unknown[]) => void;
}
