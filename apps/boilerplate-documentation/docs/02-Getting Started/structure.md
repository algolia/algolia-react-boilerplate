---
sidebar_position: 2
---

# Structure

### Index.jsx

- entry point to the application
- wraps child components with Recoil, React Router
  - [React router](https://reactrouter.com/docs/en/v6/getting-started/overview)
  - [Recoil state management](https://recoiljs.org/)
- includes a screen resizer component
- renders App.js into #root element in DOM
- #root is defined in index.html

### App.jsx

- called by Index.jsx
- calls Main.jsx
- Wraps child components in Algolia Predict and Algolia Instantsearch
  - [Algolia instantsearch](https://github.com/algolia/react-instantsearch)
  - [Algolia predict](https://www.algolia.com/doc/ui-libraries/predict/api-reference/predict-react/Predict/)

### Main.jsx

- contains static elements like header and footer (found in `./components`)
- contains some helper components used to display things like the applied rules
- contains routes for each page (found in `./pages`)
- it loads a single route (page), depending on the current URL

### Homepage.jsx

- if federated search is true in configuration, loads federated search
- loads a banners component from `./components`
- maps over carousels from configuration and renders each carousel
- wraps all components in animations from framer-motion

- Recommend components
  - Trending Products

### SearchResultsPage.jsx

- called by Main.jsx for route `/search`
- loads components related to results

- Recommend components
  - Trending Products
  - Trending Facet Values

### ProductDetails.jsx

- Display attributes of an individual product
  - Image
  - Brand
  - Name
  - Colour
  - Size
  - Price
    - The price should display correctly according to the currency. Please check the price component file where you can change the decimals as well.

You can define whether you want each attribute shown by adjusting `PDPHitSections` in `/config/hitsConfig`

- Recommend components
  - Related Products
  - Frequently Bought Together
