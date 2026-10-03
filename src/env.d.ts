// Global set by the inline i18n script in BaseLayout.astro, so components'
// bundled scripts (e.g. LanguageToggle) can switch language.
interface Window {
  setSiteLang?: (lang: "es" | "en") => void;
}
