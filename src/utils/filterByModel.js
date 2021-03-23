import pagination from "./pagination.js";

/* Filter by model name */
const filterByModel = (
  featuresAvailable,
  jukeboxes,
  selectedModel,
  settingRequirements,
  page,
  limit
) => {
  let match = [];

  for (let i = 0; i < featuresAvailable.length; i++) {
    let featuresPerJuke = featuresAvailable[i];
    let model = jukeboxes[i].model;

    if (
      typeof selectedModel !== "undefined" &&
      selectedModel &&
      selectedModel.length > 0 &&
      model === selectedModel &&
      featuresPerJuke.some((y) => settingRequirements.includes(y))
    ) {
      match.push(jukeboxes[i]);
    }

    if (
      (typeof selectedModel === "undefined" ||
        !selectedModel ||
        selectedModel.length <= 0) &&
      featuresPerJuke.some((y) => settingRequirements.includes(y))
    ) {
      match.push(jukeboxes[i]);
    }
  }

  /* Specify at what index to start the page and the page size */
  return pagination(match, page, limit);
};

export default filterByModel;
