exports.isValidCityState = (value) => {
  if (!value || !value.includes(",")) return false;

  const [city, state] = value.split(",").map(v => v.trim());
  if (city.length < 2 || state.length < 2) return false;

  return true;
};
