const queryFilters = (dataFilter: any) => {
  const keys = Object.keys(dataFilter).slice(2);
  const filters = {};
  keys.map((key) => {
    filters[key] = { $regex: dataFilter[key], $options: 'i' };
  });
  return filters;
};

export default queryFilters;
