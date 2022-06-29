// This file defines functions that will be used in the template file

import chalk from 'chalk';

/** Returns an object that will be interpreted as the subproperties of a property, instead of a property with special annotations (such as a type of default value) */
export function subproperties(properties) {
  return {
    ...properties,
    _subproperties: true,
  };
}

// Helper to capitalize & remove camelCase
export const transformTitle = (text) => {
  // Removes camelCase & snake_case
  const adjustCase = (text) => {
    return (
      text
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([a-zA-Z])_([a-zA-Z])/g, '$1 $2')
        // Capitalize
        .replace(/(\b[a-zA-Z])/g, (letter) => letter.toUpperCase())
    );
  };

  // Split any dots and substitute thm for a > character
  return text.split('.').map(adjustCase).join(chalk.bold.yellow(' > '));
};

// Helper to delete all properties which are empty
export function deleteEmptyFields(thing) {
  // Detect if thing is not object
  if (typeof thing !== 'object' || Array.isArray(thing) || thing == null) {
    return thing;
  }

  // Delete empty fields
  for (const field in thing) {
    if (!thing[field]) {
      delete thing[field];
      continue;
    }

    // Delete empty subfields
    thing[field] = deleteEmptyFields(thing[field]);
  }

  return thing;
}
