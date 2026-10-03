/**
 * Content of the Bio page (/franco-guiragossian), kept apart from its
 * layout so the texts can be edited without touching the page.
 *
 * Every text has a Spanish and an English version; the page shows the
 * one matching the visitor's language (ES/EN switch).
 */
type Bilingual = { es: string; en: string };

export interface Experience {
  /** e.g. "2024" or "mar 2024" */
  from: string;
  /** Leave out for a current role ("hoy" / "present") */
  to?: string;
  role: Bilingual;
  organization: string;
  /** Optional one-liner about the role */
  description?: Bilingual;
}

export const bio = {
  tagline: {
    es: "Análisis de datos · Encuestas · Visualización",
    en: "Data analysis · Surveys · Visualization",
  } satisfies Bilingual,

  /** "What I do", one paragraph per item */
  about: [
    {
      es: "Trabajo con datos de punta a punta: desde diseñar la encuesta y decidir qué preguntar, hasta limpiar, analizar y mostrar los resultados.",
      en: "I work with data end to end: from designing the survey and deciding what to ask, to cleaning, analyzing and presenting the results.",
    },
    {
      es: "Uso R y Python para el análisis, Power BI para dashboards y D3.js cuando un gráfico necesita contar algo que una herramienta estándar no puede.",
      en: "I use R and Python for analysis, Power BI for dashboards, and D3.js when a chart needs to say something a standard tool can't.",
    },
    {
      es: "Me interesan especialmente la investigación de mercado y social, y los datos públicos de Argentina.",
      en: "I'm especially interested in market and social research, and in Argentina's public data.",
    },
  ] satisfies Bilingual[],

  /**
   * Most recent first. The "Experience" section only appears once there's
   * at least one entry. Example:
   *
   * {
   *   from: "2024",
   *   role: { es: "Analista de datos", en: "Data analyst" },
   *   organization: "Empresa",
   *   description: { es: "Qué hacés ahí, en una línea.", en: "What you do there, in one line." },
   * },
   */
  experience: [] as Experience[],
};
