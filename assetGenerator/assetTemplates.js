// This file specifies what kind of asset the generator is able to generate
// Here, you must define the name of each asset and what properties it must and may have.

import { subproperties } from './templateHelper.js';

// Each key defines the name of an asset. It must point to an object that defines it's properties: each key is the name of a property, and it's value is it's description.
export default {
  // Please refer to the readme to see an example

  banner: {
    _description:
      'Generates the custom data JSON to be returned by a banner rule',
    _add: { type: 'bannerSrp' },

    title: 'The title that the banner will display',
    banner: "The link to the banner's background image",
    'link?': 'The link to which the user will be redirected on interaction',
  },

  injectedNoCta: {
    _description:
      'Generates the custom data JSON to be returned by a rule for injected noCta items',

    _add: { type: 'noCta' },

    title: 'The title of the injected content',

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
