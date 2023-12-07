const queryFilters = (dataFilter: any) => {
  const keys = Object.keys(dataFilter).slice(2);
  const filters = [];

  keys.forEach((key) => {
    if (dataFilter[key]) {
      const filter = {};
      if (typeof dataFilter[key] === 'string') {
        filter[key] = { $regex: dataFilter[key], $options: 'i' };
      } else {
        filter[key] = dataFilter[key];
      }
      filters.push(filter);
    }
  });
  filters.push({ deleted_at: null }); // Thêm bộ lọc deleted_at == null
  // const finalFilters = [];
  // if (filters.length > 0) {
  //   finalFilters.push({ $and: filters });
  // }
  if (filters.length > 0) {
    return { $and: filters };
  } else {
    return { deleted_at: null };
  }
};

export default queryFilters;
