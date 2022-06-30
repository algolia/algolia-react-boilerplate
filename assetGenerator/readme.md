# Boilerplate Asset Generator

Welcome to the asset generator script!
It will allow you to generate assets (such as rules for banners, injected content, etc) **without the need** of looking up the correct syntax for custom data and whatnot.

This guide will teach you just how simple this process is!

## Generating Assets

In order to generate an asset, you must execute the script by calling `yarn gen` followed by the **name** of the asset you want to generate.

Example to generate the custom data to be returned by a banner rule:

```bash
yarn gen banner
```

The `gen` command initializes an **interactive session**, where you will be prompted for the necessary info to generate the asset's data.

## Available Assets

The assets that can be generated are defined in the `assetTemplate.js` file. They are as follows:

- `banner`: Generates the custom data JSON to be returned by a banner rule
- `injectedNoCta`: Generates the custom data JSON to be returned by a injected no-Cta rule

## Customizing & Creating Asset Definitions

Our script was built to be wonderfully simple to extend and edit. All the assets it's able to generate have their syntax defined in the `assetTemplate.js` file.

In case you decide to change the assets' syntax, or even define your own new assets, all you have to do is edit this file!

### Editing Asset Templates

The `assetTemplate.js` file exports an object which contains the definition of all assets that can be generated.

Each asset and it's corresponding properties must always include a description!

Here is an example of how one might define an asset, which indicates how to use each available syntax definition method:

```js
{
  banner: {
    // REQUIRED description of this asset generator
    _description: "Generates the banner data",

    // Property definition: key is the name, value is the description
    title: "Banner name",

    // Optional property definition (MUST include the description attribute)
    color: { optional: true, description: "The banner's color" },

    // Property with a default value (MUST include the description attribute)
    content: { default: "Check out our promotion!", description: "The banner's text" },

    // Property with type constraints (MUST include the description attribute)
    // To see al supported types, refer to [this documentation](https://github.com/SBoudrias/Inquirer.js#prompt-types)
    repeatTimes: { type: "number", description: "How many times to repeat the image"},

    // Shorthand optional property definition: key ends with an "?" character
    "image?": "Optional image link",

    // Adds a property with subproperties
    size: subproperties({
      width: { type: "number", description: "Image width"},

      height: { type: "number", description: "Image height"}
    }),

    // Any fields prefixed by the "_" character are called meta-properties, and won't be treated as properties. They are only used for internal computation purposes

    // This meta-property allows you to always have these fields be directly added to the final object
    // It's like adding properties with constant values
    _add: { assetType: "homepage-banner" }
  }
}
```

> Note that it would be redundant to mark a field as optional and provide a default value, as the optional value would already allow the user to skip explicitly defining the value.

You may also refer to the [inquirer question documentation](https://github.com/SBoudrias/Inquirer.js#question) for more property options the likes of "default" and "type".

> A good example is the `validate` option, which allows you to reject some input and have the user type it in again; as well as the `choices` option, which when combined with the `list` type allows you to predefine the allowed values for each property.

## Development Fonts

Guides used to build this script:

- https://medium.com/skilllane/build-an-interactive-cli-application-with-node-js-commander-inquirer-and-mongoose-76dc76c726b6
- https://www.youtube.com/watch?v=_oHByo8tiEY
