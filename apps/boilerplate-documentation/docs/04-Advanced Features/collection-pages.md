# Collection Pages

In order to configure Collection Pages, go in `config/headerConfig`. From there you can add links to the Navigation tab. Collection pages are powered by rule contexts. In order for this to work, you must set the type to `context` and make sure that you have a rule set up in the Algolia dashboard matching the context trigger which you define as the value of `context`.

You can find an example of a collection page rule by searching for `qr-1651145630794` in `rules/example-rules.json`.
