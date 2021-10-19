export const NumberPagination = (no, pagesNow, maxPerPage) => {
  return pagesNow * maxPerPage + no;
};

export const QueryParams = (val) => {
  return new URLSearchParams(val);
};
