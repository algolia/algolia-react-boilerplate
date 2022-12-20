# Segments

You can add segments to the application to represent algolia being told that the current user has certain characteristics. It is not 1:1 personalisation and would be fed in by an external system such as Dynamic Yield.

These "segments" are sent to Algolia as [optional filters](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/how-to-promote-with-optional-filters/), which are used to boost hits that match those filters.

Use this feature by adjusting `config/segmentConfig` and turn on or off this feature in `config/featuresConfig`.
