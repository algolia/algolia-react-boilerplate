export function customDataByType(userData) {
  return (userData || []).reduce(
    (acc, customData) => ({
      ...acc,
      [customData.type]: customData,
    }),
    {}
  );
}
