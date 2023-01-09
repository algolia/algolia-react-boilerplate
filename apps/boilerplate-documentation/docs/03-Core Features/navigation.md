---
sidebar_position: 4
---

# Navigation

## What is Navigation?

Navigation incorporates any way your user can find their way through your application. It can be a simple list of links, or a more complex navigation system.

## How does Navigation work in Algolia?

Generally the interface Algolia has with navigation, is that when a user clicks on a link in a navigation menu, it will send a search query to Algolia with a filter applied. This filter will be the value related to the link that was clicked.

The user can then be routed to a search results page, or a category page, or a collection page, depending on the type of navigation you have configured.

## How do I configure Navigation?

### Merchandisers

You should liase with your engineering team to ensure that navigation is set up as you wish on the frontend, it is not generally configured in the Algolia dashboard.

### Developers

You can configure your navigation by ensuring that when a navigation link is clicked, the user is routed to the SRP, and the correct query parameters are sent to Algolia.

There are generally two kinds of parameters which are used in relation to creating a category or collection page which is linked to from a navigation menu:

- Filter (Further documentation [here](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/))

- Context (Further documentation [here](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/#what-are-contexts))

## Boilerplate implementation of Navigation

The file `Navigation.jsx` is the component file which renders your navigation headers.

They will be shown on all pages of the boilerplate, like so:

![Image](../media/navigation-example.png)

You can edit your navigation links in `src > config > navigationConfig.js`, within the `linksHeader` variable.

Each link must have a `name`, `type` and `value`.

The name can be anything you want, this is the text that will appear in the navigation bar.

The type must be one of three, and this dictates how the value is used in the search query:

## Category

This will attempt to filter using a virtual refinement list, combining the value with the `categoryPageFilterAttribute` const at the top of the file. It is best used for simple category pages, eg _Mens_, _Dresses_ etc. Further documentation [here](https://www.algolia.com/doc/api-reference/api-parameters/facetFilters/).

![Image](../media/navigation-category-link.png)

## Filter

This will add the value as a raw filter directly to the search query, it is best used for complex filters which cannot be created using the `category` type, i.e. `hierarchicalCategories.lvl1:'Womens > Accessories' AND brand:'even&odd'`. Further documentation [here](https://www.algolia.com/doc/api-reference/api-parameters/filters/).

![Image](../media/navigation-filter-link.png)

## Context

This will add a [rule context](https://support.algolia.com/hc/en-us/articles/4406981936785-What-is-a-Rule-context) to the query, which will trigger any rule you have created in the Algolia dashboard for that rule context. This is best used for collection pages, but bear in mind they are not currently searchable. Further documentation [here](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/#rules-responding-to-user-context).

![Image](../media/navigation-context-link.png)

## Learn More

### Algolia Resources

https://www.algolia.com/doc/guides/solutions/ecommerce/filtering-and-navigation/

### External Resources

https://www.justinmind.com/blog/navigation-design-almost-everything-you-need-to-know/

https://xd.adobe.com/ideas/process/information-architecture/website-navigation-design-best-practices/
