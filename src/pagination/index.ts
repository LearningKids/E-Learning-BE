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

const paginationQuery = (page = 1, page_size = 10) => {
  return { page, limit: page_size, customLabels: myCustomLabels };
};

export default paginationQuery;
