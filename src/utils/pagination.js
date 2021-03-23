/* Specify at what index to start the page and the page size */
const pagination = (match, page, limit) => {
  const result = {};
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  if (endIndex < match.length) {
    result.pagination = {
      currentPage: page,
      previousPage: startIndex > 0 ? page - 1 : 0,
      limit: limit,
    };
  }

  result.results = match.slice(startIndex, endIndex);
  return result;
};

export default pagination;
