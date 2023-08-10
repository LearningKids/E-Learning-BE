const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'page_size',
  page: 'page',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'pagination',
  nextPage: false,
  prevPage: false,
  hasPrevPage: false,
  hasNextPage: false,
};

const paginationQuery = (page = 1, page_size = 10, populate?: string[]) => {
  return {
    page: page,
    limit: page_size,
    customLabels: myCustomLabels,
    populate,
  };
};

export default paginationQuery;
