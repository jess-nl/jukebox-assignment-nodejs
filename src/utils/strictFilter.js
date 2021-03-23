import pagination from "./pagination.js";

const includesAll = (arr, values) => values.every((v) => arr.includes(v));

/* Strict match: list jukeboxes that has *all* features in setting requirements */
const strictFilter = (
  featuresAvailable,
  jukeboxes,
  settingRequirements,
  page,
  limit
) => {
  let match = [];

  for (let i = 0; i < featuresAvailable.length; i++) {
    let featuresPerJuke = featuresAvailable[i];

    if (includesAll(featuresPerJuke, settingRequirements)) {
      match.push(jukeboxes[i]);
    }
  }

  return pagination(match, page, limit);
};

export default strictFilter;
