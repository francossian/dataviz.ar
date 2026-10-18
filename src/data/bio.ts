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
