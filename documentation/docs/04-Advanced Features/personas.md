# Personas

[Personalization](https://www.algolia.com/doc/guides/personalization/what-is-personalization/)

To configure personalisation please first make sure you have the Personalization feature enabled on your plan, and that you have the correct strategy created. For example, if you want to boost colour: blue for a persona, you need to make sure that colour is in your strategy as a facet.

Then, you can visit `config/personaConfig` and update the `value`s to match the user tokens you need to send, and update the personalizationFilters array to contain the attributes and values you want to boost for each persona. The `description` will also show up in the demo guide component.

You can also adjust the personalizationImpact number in `config/personaConfig` to control how much personalization applies to the results where personalization is turned on.

Personalization is currently active by default in the search results page, and in the main section (normally products) of the federated search.

The current user stories are:

- Younger male 'Stephen James', likes Basketball and he lives in NYC.
  -Likes **Sneakers**, size 24, also likes **tracksuit**

- Older female: 'Elizabeth Aniston', likes fashion and she lives in Paris.
  -Likes **black** dresses, size M, also likes blue jeans
