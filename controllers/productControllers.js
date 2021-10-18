const { db } = require("../helpers/index");

module.exports = {
  getData: (req, res) => {
    console.log(req.query.sortBy);

    // filter products & sort by query
    const sortBy = req.query.sortBy;

    const filterProductByName = req.query.productName;
    const filterProductByCategory = req.query.category;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const startIdx = (page - 1) * limit;
    const endIdx = page * limit;
    // declare button pagination
    let nextPage;
    let previusPage;

    const scriptQuery = `SELECT id_master_produk, nm_master_produk, harga, description, nm_category_master_produk, URL FROM app_master_produk p JOIN app_category_master_produk c on p.id_category = c.id_category_master_produk;`;
    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Data gagal diakses",
          success: false,
          err,
        });
      }

      const filteredResults = results.filter((val) => {
        if (filterProductByName && filterProductByCategory) {
          return (
            val.nm_master_produk
              .toLowerCase()
              .includes(filterProductByName.toLowerCase()) &&
            val.nm_category_master_produk
              .toLowerCase()
              .includes(filterProductByCategory.toLowerCase())
          );
        } else if (filterProductByName) {
          return val.nm_master_produk
            .toLowerCase()
            .includes(filterProductByName.toLowerCase());
        } else if (filterProductByCategory) {
          return val.nm_category_master_produk
            .toLowerCase()
            .includes(filterProductByCategory.toLowerCase());
        } else {
          return results;
        }
      });

      let productsCount = filteredResults.length;
      let maxPageProducts = Math.ceil(productsCount / limit);

      if (endIdx < productsCount) {
        nextPage = page + 1;
      }
      if (startIdx > 0) {
        previusPage = page - 1;
      }

      // for compare by AZ or ZA
      const compareString = (x, y) => {
        if (
          x.nm_master_produk.toLowerCase() < y.nm_master_produk.toLowerCase()
        ) {
          return -1;
        }

        if (
          x.nm_master_produk.toLowerCase() > y.nm_master_produk.toLowerCase()
        ) {
          return 1;
        }

        return 0;
      };

      // Sort by case in FE
      switch (sortBy) {
        case "lowPrice":
          filteredResults.sort((x, y) => x.harga - y.harga);
          break;
        case "highPrice":
          filteredResults.sort((x, y) => y.harga - x.harga);
          break;
        case "az":
          filteredResults.sort(compareString);
          break;
        case "za":
          filteredResults.sort(compareString).reverse();
          break;
        default:
          filteredResults;
          break;
      }

      // paginated result by mySQL data
      const paginatedProducts = filteredResults.slice(startIdx, endIdx);

      res.status(200).send({
        message: `data berhasil diakses`,
        success: true,
        dataProduct: paginatedProducts,
        nextPage: nextPage,
        prevPage: previusPage,
        productsCount: productsCount,
        maxPage: maxPageProducts,
      });
    });
  },
};
