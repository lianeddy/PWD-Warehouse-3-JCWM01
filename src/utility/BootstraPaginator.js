let pagination = require("pagination");
const { URL_WEB } = require("../helper");

export const BoostrapPaginator = (
  pathUrl,
  currentPage,
  rowsPerPage,
  totalData
) => {
  return new pagination.TemplatePaginator({
    prelink: `${URL_WEB}${pathUrl}`,
    current: currentPage,
    rowsPerPage: rowsPerPage,
    totalResult: totalData,
    slashSeparator: true,
    template: function (result) {
      console.table(result);
      let i, len, prelink;
      let html = '<div><ul class="pagination">';
      if (result.pageCount < 2) {
        html += "</ul></div>";
        return html;
      }
      // prelink = this.preparePreLink(result.prelink);
      prelink = result.prelink;
      if (result.previous) {
        html +=
          '<li class="page-item"><a class="page-link" href="' +
          prelink +
          result.previous +
          '">' +
          this.options.translator("PREVIOUS") +
          "</a></li>";
      }
      if (result.range.length) {
        for (i = 0, len = result.range.length; i < len; i++) {
          if (result.range[i] === result.current) {
            html +=
              '<li class="active page-item"><a class="page-link" href="' +
              prelink +
              result.range[i] +
              '">' +
              result.range[i] +
              "</a></li>";
          } else {
            html +=
              '<li class="page-item"><a class="page-link" href="' +
              prelink +
              result.range[i] +
              '">' +
              result.range[i] +
              "</a></li>";
          }
        }
      }
      if (result.next) {
        html +=
          '<li class="page-item"><a class="page-link" href="' +
          prelink +
          result.next +
          '" class="paginator-next">' +
          this.options.translator("NEXT") +
          "</a></li>";
      }
      html += "</ul></div>";
      return html;
    },
  });
};
