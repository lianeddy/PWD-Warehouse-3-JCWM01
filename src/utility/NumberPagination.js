export const NumberPagination = (no, pagesNow, maxPerPage) => {
  return pagesNow * maxPerPage + no;
};
