/**
 * Content of the Bio page (/franco-guiragossian), kept apart from its
 * layout so the texts can be edited without touching the page.
 *
 * Every text has a Spanish and an English version; the page shows the
 * one matching the visitor's language (ES/EN switch).
 */
export type Bilingual = { es: string; en: string };

/** One role, i.e. one bar of the timeline */
export interface Role {
  /** "YYYY-MM", first month in the role */
  from: string;
  /** "YYYY-MM", last month in the role. Leave out if it's the current one. */
  to?: string;
  title: Bilingual;
}

/** One row of the Experience timeline: a workplace and its roles */
export interface Experience {
  organization: string;
  /** Bar colour, e.g. "var(--color-aysa)" (defined in theme.css) */
  color: string;
  /** In order. Several roles at the same place share a row. */
  roles: Role[];
  /** Shown in the tooltip, a sentence or two */
  description: Bilingual;
}

export const bio = {
  tagline: {
    es: "Análisis y visualización de datos",
    en: "Data analysis and visualization",
  } satisfies Bilingual,

  /** "What I do", one paragraph per item */
  about: [
    {
      es: "Hola, soy Franco y me encantan los datos y la visualización. Trabajo como analista de datos y, con los años, se volvieron mi forma de entender un poco mejor la realidad. Me gusta pensar que, bien mostrados, también pueden ayudar a otros a entenderla.",
      en: "Hi, I'm Franco, and I love data and visualization. I work as a data analyst, and over the years data has become my way of understanding reality a little better. I like to think that, shown well, it can help others understand it too.",
    },
    {
      es: "Soy curioso por naturaleza: cuando algo me llama la atención, voy a la fuente, reviso los números y trato de ver qué hay detrás. De eso se trata este sitio: compartir información confiable, que sirva para tomar decisiones o simplemente para alimentar la curiosidad, con datos que cualquiera pueda chequear.",
      en: "I'm curious by nature: when something catches my eye, I go to the source, look at the numbers and try to see what's behind them. That's what this site is about: sharing reliable information that helps people make decisions, or simply feeds their curiosity, with data anyone can check.",
    },
  ] satisfies Bilingual[],

  /**
   * The Experience timeline, one row per workplace, top to bottom in this
   * order. Overlapping dates are fine: the rows run in parallel.
   */
  experience: [
    {
      organization: "AySA",
      color: "var(--color-aysa)",
      roles: [
        {
          from: "2015-01",
          to: "2023-01",
          title: { es: "Analista técnico", en: "Technical Data Analyst" },
        },
      ],
      description: {
        es: "Informes de calidad del servicio (mapeo de presiones, balance de agua) con datos de SAP BI. Estimación de datos faltantes con métodos estadísticos en R.",
        en: "Service-quality reports (pressure mapping, water balance) from SAP BI data. Statistical estimation of missing data in R.",
      },
    },
    {
      organization: "Upwork",
      color: "var(--color-upwork)",
      roles: [
        {
          from: "2018-10",
          to: "2026-05",
          title: {
            es: "Análisis de datos (freelance)",
            en: "Data Analysis Services (Freelance)",
          },
        },
      ],
      description: {
        es: "Más de 75 proyectos con calificación perfecta y nivel Top Rated Plus: análisis de datos y estadístico, dashboards y redacción académica.",
        en: "75+ projects with perfect client feedback, Top Rated Plus: data and statistical analysis, dashboards and academic writing.",
      },
    },
    {
      organization: "AMI / PCMI",
      color: "var(--color-pcmi)",
      roles: [
        {
          from: "2022-06",
          to: "2026-04",
          title: { es: "Consultor de datos", en: "Data Consultant" },
        },
        {
          from: "2026-05",
          title: { es: "Data Specialist", en: "Data Specialist" },
        },
      ],
      description: {
        es: "Datos de punta a punta en investigación de mercado: programación de encuestas, tabulación, análisis estadístico, ETL y dashboards en Power BI, en estudios de decenas de países.",
        en: "End-to-end data in market research: survey programming, tabulation, statistical analysis, ETL and Power BI dashboards, in studies across dozens of countries.",
      },
    },
  ] as Experience[],
};
