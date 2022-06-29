// This file defines functions that will be used in the template file

/** Returns an object that will be interpreted as the subproperties of a property, instead of a property with special annotations (such as a type of default value) */
export function subproperties(properties) {
  return {
    ...properties,
    _subproperties: true,
  };
}
