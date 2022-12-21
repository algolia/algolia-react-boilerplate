// This function simply injects the provided content to the provided hit array
export default function injectContent(originalHits, content) {
  // Copy original hit array so that we avoid modifying it
  const hits = [...originalHits]

  // For each content to be injected
  for (const item of content) {
    // Default position to inject to, if "position" not specified
    if (item.type === 'salesCard') {
      item.position ??= 3
    }
    item.position ??= 7

    // Also make sure it has some ID to be used as a React map key
    item.objectID ??= `injected-content-${JSON.stringify(item)}`

    // Add it to the array
    hits.splice(item.position, 0, item)
  }
  // Return the array with the injections
  return hits
}
