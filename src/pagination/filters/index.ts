const queryFilters = (dataFilter: any) => {
  const keys = Object.keys(dataFilter).slice(2);
  const filters = [];

  keys.forEach((key) => {
    if (dataFilter[key]) {
      const filter = {};
      filter[key] = { $regex: dataFilter[key], $options: 'i' };
      filters.push(filter);
    }
  });
  filters.push({ deleted_at: null });
  if (filters.length > 0) {
    return { $or: filters };
  } else {
    return { deleted_at: null };
  }
};

export default queryFilters;
