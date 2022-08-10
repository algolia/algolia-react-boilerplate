import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      homePage: {
        titleCarousels: ['Our Bags Collection', 'Our Best Hoodies'],
      },
      federated: {
        recentSearches: 'Recent Searches',
        suggestions: 'Suggestions',
        categories: 'Categories',
        products: 'Products',
        articles: 'Articles',
        productsBefore: 'Recommended for you',
        showAllProducts: 'Show all products',
        buttonReturn: 'Return to home page',
        buttonShowAll: 'Show all products',
        noResults: 'No Results Found',
      },
      srp: {
        titleTrendingProducts: 'Trending Products',
        titleTrendingFacets: 'Trending Brands',
        stats: 'results found in',
        searchInCategory: 'Search in',
      },
      pdp: {
        fbtTitle: 'Frequently Bought Together',
        relatedTitle: 'Related Products',
        addToCartButton: 'Add to Cart',
        buttonBack: 'Back to search',
        availableSize: 'Available Size:',
      },
      searchBox: {
        placeHolder: 'Search...',
      },
    },
  },
  fr: {
    translation: {
      homePage: {
        titleCarousels: ['Notre collection de sacs', 'Nos plus beaux sweat'],
      },
      federated: {
        recentSearches: 'Recherches Récentes',
        suggestions: 'Suggestions',
        categories: 'Categories',
        products: 'Produits',
        articles: 'Articles',
        productsBefore: 'Recommendé pour vous',
        buttonReturn: "Retour page d'acceuil",
        buttonShowAll: 'Voir tous les produits',
        noResults: 'Aucun résultat trouvé',
      },
      srp: {
        titleTrendingProducts: 'Produits tendances',
        titleTrendingFacets: 'Marques Tendances',
        stats: 'résultats trouvé en',
        searchInCategory: 'Recherche dans',
      },
      pdp: {
        fbtTitle: 'Fréquemment acheté ensemble',
        relatedTitle: 'Produits connexes',
        buttonBack: 'Revenir aux recherches',
        addToCartButton: 'Ajouter au panier',
        availableSize: 'Taille disponibles:',
      },
      searchBox: {
        placeHolder: 'Rechercher...',
      },
    },
  },
  ger: {
    translation: {
      homePage: {
        titleCarousels: [
          'Unsere Taschenkollektion',
          'Unsere schönsten Sweatshirts',
        ],
      },
      federated: {
        recentSearches: 'Letzte Suchen',
        suggestions: 'Hinweise',
        categories: 'Kategorien',
        products: 'Produkte',
        articles: 'Artikel',
        productsBefore: 'Für dich empfohlen',
        buttonReturn: 'Zurück zur Startseite',
        buttonShowAll: 'Alle Produkte anzeigen',
        noResults: 'Keine Einträge gefunden',
      },
      srp: {
        titleTrendingProducts: 'Trendprodukte',
        titleTrendingFacets: 'Trendige Marken',
        stats: 'ergebnisse gefunden in',
        searchInCategory: 'Suchen in',
      },
      pdp: {
        fbtTitle: 'Wird oft zusammen gekauft',
        relatedTitle: 'Verwandte Produkte',
        buttonBack: 'Zurück zur Forschung',
        addToCartButton: 'In den Warenkorb legen',
        availableSize: 'Verfügbare Größe:',
      },
      searchBox: {
        placeHolder: 'Forschen...',
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    returnObjects: true,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
