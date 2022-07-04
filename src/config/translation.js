import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      homePage: {
        headerTop: 'Search for anything',
      },
      header: {
        topHeader: {
          firstItem: 'Personal',
          secondItem: 'Business',
          thirdItem: 'Health',
          fourthItem: 'Agriculture',
          fifthItem: 'Health Impact',
          logIn: 'Log In',
          support: 'Support',
        },
      },
      federated: {
        recentSearches: 'Recent Searches',
        suggestions: 'Suggestions',
        categories: 'Categories',
        products: 'Products',
        articlesBefore: 'Recommended for you',
        articles: 'Articles',
        showAllProducts: 'Show all products',
        showAllArticles: 'Show all articles',
      },
      searchBox: {
        placeHolder: 'Search...',
      },
    },
  },
  fr: {
    translation: {
      homePage: {
        headerTop: 'Rercherchez quelque chose',
      },
      header: {
        topHeader: {
          firstItem: 'Personnel',
          secondItem: 'Entreprise',
          thirdItem: 'Santé',
          fourthItem: 'Agriculture',
          fifthItem: 'Incidence sur la santé',
          logIn: 'Se connecter',
          support: 'Support',
        },
      },
      federated: {
        recentSearches: 'Recherches Récentes',
        suggestions: 'Suggestions',
        categories: 'Categories',
        products: 'Produits',
        articles: 'Articles',
        articlesBefore: 'Recommendé pour vous',
        showAllProducts: 'Voir tous les produits',
        showAllArticles: 'Voir tous les articles',
      },
      searchBox: {
        placeHolder: 'Rechercher...',
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
