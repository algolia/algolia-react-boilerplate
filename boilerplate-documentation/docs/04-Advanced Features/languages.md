# Languages

In order to turn on this feature, go to `config/featuresConfig` and set `shouldHaveLanguages` to true.

Use it by making sure you have an index per language, and that the attribute names are always in the default language, but the values change in each index according to the local language.

Then, go to `config/languagesConfig` and adjust each export to what you need. Specifically, in `languageSwitchConfig` you must make sure each node has an `index` defined, and this index will be used when that language is selected.

Currently in :

- 🇬🇧 English
- 🇫🇷 French
- 🇩🇪 German
- 🇮🇹 Italian
