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

You may alternatively avoid the interactive session and use the one liner command, which requires you to already know exactly which data to provide.

In the banner case, it might look something like this:

```bash
yarn gen banner --name Black Friday Promo --banner https://unsplash.com/photos/KzidBAES-uE
```

> You can also use a combination of one liner and interactive session, by providing only part of the necessary fields in the command.

## Available Assets

The assets that can be generated are defined in the `assetTemplate.js` file. They are as follows:

- `banner`: Generates the custom data JSON to be returned by a banner rule

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
    // REQUIRED description of this asset generator, for documentation purposes
    _description: "Generates the banner data",

    // Property definition: key is the name, value is the description
    title: "Banner name",

    // Optional property definition (MUST include the description attribute)
    color: { optional: true, description: "Optional banner's color" },

    // Property with a default value (MUST include the description attribute)
    content: { default: "Check out our promotion!", description: "The banner's text" },

    // Property with type constraints (MUST include the description attribute)
    height: { type: "number", description: "The height of the image"},

    // Shorthand optional property definition: key ends with a "?" character
    "image?": "Optional image link",
  }
}
```

> Note that it would be redundant to mark a field as optional and provide a default value, as the optional value would already allow the user to skip explicitly defining the value.
