const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'page_size',
  page: 'page',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'pagination',
  hasPrevPage: true,
  hasNextPage: true,
};

const paginationQuery = (
  page = 1,
  page_size = 10,
  populate?: string[] | any,
) => {
  return {
    page: page,
    limit: page_size,
    customLabels: myCustomLabels,
    populate,
    hasPrevPage: true,
  };
};

export default paginationQuery;
