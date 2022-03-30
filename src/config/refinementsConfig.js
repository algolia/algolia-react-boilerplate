// ------------------------------------------
// Refinements Config
// ------------------------------------------

export const refinements = [
  {
    type: 'hierarchical',
    header: 'Categories',
    label: 'Category',
    options: {
      attribute: [
        'hierarchicalCategories.lvl0',
        'hierarchicalCategories.lvl1',
        'hierarchicalCategories.lvl2',
        'hierarchicalCategories.lvl3',
      ],
      searchable: true,
    },
  },
  {
    type: 'price',
    header: 'Price',
    currency: '$',
    label: 'Price',
    options: {
      attribute: 'unformated_price',
    },
  },
  {
    type: 'list',
    header: 'Brand',
    label: 'Brand',
    options: {
      attribute: 'brand',
      searchable: true,
    },
  },
  {
    type: 'colour',
    header: 'Colour',
    label: 'Colour',
    options: {
      attribute: 'colour_hexa_v6',
    },
  },
  {
    type: 'list',
    header: 'Gender',
    label: 'Gender',
    options: {
      attribute: 'genderFilter',
    },
  },
  {
    type: 'size',
    header: 'Sizes',
    label: 'Size',
    options: {
      attribute: 'sizeFilter',
      limit: 8,
    },
  },
];

export const refinementPrice = {
  moreThan: 'More than',
  lessThan: 'Less than',
};
