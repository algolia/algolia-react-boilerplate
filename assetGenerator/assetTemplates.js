// This file specifies what kind of asset the generator is able to generate
// Here, you must define the name of each asset and what properties it must and may have.

import { subproperties } from './templateHelper.js';

// Each key defines the name of an asset. It must point to an object that defines it's properties: each key is the name of a property, and it's value is it's description.
export default {
  // Example:
  /*
  // Asset name
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
    repeatTimes: { type: "number", description: "How many times to repeat the image"},
    
    // Shorthand optional property definition: key ends with a "?" character
    "image?": "Optional image link",

    // Adds a property with subproperties
    size: subproperties({
      width: { type: "number", description: "Image width"},

      height: { type: "number", description: "Image height"}
    }),
  }
  */

  banner: {
    _description:
      'Generates the custom data JSON to be returned by a banner rule',
    title: 'The title that the banner will display',
    banner: "The link to the banner's background image",
    'link?': 'The link to which the user will be redirected on interaction',
  },

  injectedNoCta: {
    _description:
      'Generates the custom data JSON to be returned by a rule for injected noCta items',

    title: 'The title that the banner will display',

    image: subproperties({
      desktop_url: 'Item image url for desktop resolution devices',
      mobile_url: 'Item image url for mobile resolution devices',
    }),

    position: {
      type: 'number',
      description: 'Where to inject the item',
    },

    // Optional properties

    gridSpanLaptop: {
      type: 'number',
      default: 1,
      description:
        'The amount of grid spaces this item should span, in laptop resolution devices',
    },

    gridSpanMobile: {
      type: 'number',
      default: 1,
      description:
        'The amount of grid spaces this item should span, in mobile resolution devices',
    },

    size: subproperties({
      width: {
        type: 'number',
        default: 3,
        description: 'The width of the item',
      },

      height: {
        type: 'number',
        default: 1,
        description: 'The height of the item',
      },
    }),
  },
};
