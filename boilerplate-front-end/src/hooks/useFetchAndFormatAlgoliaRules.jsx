import { mainIndexClient } from '@/config/algoliaEnvConfig'

async function FetchAndFormatAlgoliaRules(appliedRules) {
  // Will hold the data
  let rulesData = []

  // For each rule id, we fetch it from the dashboard
  if (appliedRules != null) {
    rulesData = (
      await Promise.all(
        appliedRules.map(({ objectID: id }) => mainIndexClient.getRule(id))
      )
    )
      // Format it's trigger & strategy
      .map(formatTrigger)
      .map(formatStrategy)
  }

  return rulesData
}

// === FORMATTING THE RULES

const formatTrigger = (rule) => {
  // Trigger will be an array with one element per "condition"
  rule.triggers = rule.conditions?.map((condition) => {
    // Each of these elements with contains another array of triggers, of 1 to 3 elements
    const triggers = []

    // We add the triggers in the following order: query, filters, contexts
    // Each trigger will have a text label and a value, which will have special formatting

    // Check for query
    if (condition.pattern != undefined) {
      triggers.push({
        label: `Query ${splitCamelCase(condition.anchoring)}`,
        value: condition.pattern === '' ? '<empty search>' : condition.pattern,
      })
    }

    // Check for filters
    if (condition.filters != undefined) {
      triggers.push({
        label: 'Filter',
        value: condition.filters,
      })
    }

    // Check for context
    if (condition.context != undefined) {
      triggers.push({
        label: 'Context',
        value: condition.context,
      })
    }

    return triggers
  })

  return rule
}

const formatStrategy = (rule) => {
  // Add in each type of strategy
  const { consequence } = rule

  // Each strategy will be an object with label & value, same as triggers
  rule.strategies = []

  // Check custom data
  if (consequence.userData != undefined) {
    rule.strategies.push({
      label: 'Return Custom Data',
      value: consequence.userData,
    })
  }

  // Get query params
  if (consequence.params != undefined) {
    const { params } = consequence

    // Check filters
    if (params.filters != undefined) {
      rule.strategies.push({
        label: 'Filter',
        value: params.filters,
      })
    }

    // Check optional filters
    if (params.optionalFilters != undefined) {
      rule.strategies.push({
        label: 'Optional Filter (Bury & Boost)',
        value: params.optionalFilters,
        multiple: true,
      })
    }

    // Check query replace
    if (params.query != undefined) {
      rule.strategies.push({
        label: 'Replace Query',
        value: params.query,
      })
    }

    // Check facet ordering
    if (params.renderingContent?.facetOrdering != undefined) {
      rule.strategies.push({
        label: 'Order Facets',
        value: params.renderingContent.facetOrdering.facets.order,
        multiple: true,
      })
    }
  }

  // Check product hiding
  if (consequence.hide != undefined) {
    rule.strategies.push({
      label: 'Hide',
      value: consequence.hide.map(({ objectID }) => objectID),
      multiple: true,
    })
  }

  // Check product pinning
  if (consequence.promote != undefined) {
    rule.strategies.push({
      label: 'Pin',
      value: consequence.promote.map(({ objectIDs }) => objectIDs[0]),
      multiple: true,
    })
  }

  return rule
}

// Helper to split camelCase
const splitCamelCase = (text) =>
  text
    .replace(/([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g, '$1$4 $2$3$5')
    .toLowerCase()

export default FetchAndFormatAlgoliaRules
