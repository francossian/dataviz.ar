import type { UIStrings } from "../types";

// Spanish UI strings for AstroPaper's components (Datos y relatos and the
// general pages). Argentine Spanish: voseo where it addresses the reader.
export default {
  nav: {
    home: "Inicio",
    posts: "Entradas",
    tags: "Etiquetas",
    about: "Bio",
    archives: "Archivo",
    search: "Buscar",
  },
  post: {
    publishedAt: "Publicado el",
    updatedAt: "Actualizado",
    sharePostIntro: "Compartir:",
    sharePostOn: "Compartir en {{platform}}",
    sharePostViaEmail: "Compartir por email",
    tagLabel: "Etiquetas",
    backToTop: "Volver arriba",
    goBack: "Volver",
    editPage: "Editar página",
    previousPost: "Entrada anterior",
    nextPost: "Entrada siguiente",
  },
  pagination: {
    prev: "Anterior",
    next: "Siguiente",
    page: "Página",
  },
  home: {
    socialLinks: "Redes",
    featured: "Destacadas",
    recentPosts: "Últimas entradas",
    allPosts: "Todas las entradas",
  },
  blog: {
    empty: "Todavía no hay entradas. Pronto.",
    otherBlog: "In English:",
    readTranslation: "Read in English",
  },
  footer: {
    copyright: "Copyright",
    allRightsReserved: "Todos los derechos reservados.",
  },
  pages: {
    tagTitle: "Etiqueta",
    tagDesc: "Todas las entradas con la etiqueta",

    tagsTitle: "Etiquetas",
    tagsDesc: "Todas las etiquetas usadas en las entradas.",

    postsTitle: "Entradas",
    postsDesc: "Todas las entradas publicadas.",

    archivesTitle: "Archivo",
    archivesDesc: "Todas las entradas, por fecha.",

    searchTitle: "Buscar",
    searchDesc: "Buscá en todas las entradas…",
  },
  a11y: {
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    toggleTheme: "Cambiar modo claro/oscuro",
    searchPlaceholder: "Buscar entradas…",
    noResults: "No hay resultados",
    goToPreviousPage: "Ir a la página anterior",
    goToNextPage: "Ir a la página siguiente",
    language: "Idioma",
  },
  notFound: {
    title: "404 No encontrado",
    message: "No encontramos esta página",
    goHome: "Volver al inicio",
  },
} satisfies UIStrings;
