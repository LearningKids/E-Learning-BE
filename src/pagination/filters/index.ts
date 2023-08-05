const queryFilters = (dataFilter: any) => {
  const keys = Object.keys(dataFilter).slice(2);
  const filters = [];

  keys.forEach((key) => {
    const filter = {};
    filter[key] = { $regex: dataFilter[key], $options: 'i' };
    filters.push(filter);
  });

  return { $or: filters };
};

export default queryFilters;
