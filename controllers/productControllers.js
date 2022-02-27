const { db } = require("../helpers");
const {
  searchProductMdl,
  getProductsByFilterMdl,
  quickCheckStocksMdl,
  getProductLandingMdl,
} = require("../models/productModels");

module.exports = {
  getDataById: (req, res) => {
    let scriptQuery = `SELECT id_master_produk, nm_master_produk, harga, description, nm_category_master_produk, URL FROM app_master_produk p JOIN app_category_master_produk c on p.id_category = c.id_category_master_produk WHERE id_master_produk=${db.escape(
      req.params.id_master_produk
    )};`;

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Gagal mengambil data",
          success: false,
          err,
        });
      }

      res.status(200).send(results);
    });
  },
  getDataAdmin: (req, res) => {
    console.log(req.user);
    console.log(req.query.sortBy);

    // filter products & sort by query
    const sortBy = req.query.sortBy;

    // const filterProductByName = req.query.productName;
    // const filterProductByCategory = req.query.category;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const startIdx = (page - 1) * limit;
    const endIdx = page * limit;
    // declare button pagination
    let nextPage;
    let previusPage;

    const scriptQuery = `SELECT p.id_master_produk, p.nm_master_produk, p.harga, p.description, pp.total_stok, p.URL FROM (SELECT sum(stok) as total_stok, id_master_produk FROM app_persediaan_produk GROUP BY id_master_produk) as pp JOIN app_master_produk as p on pp.id_master_produk = p.id_master_produk;`;
    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Data gagal diakses",
          success: false,
          err,
        });
      }

      let productsCount = results.length;
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
          results.sort((x, y) => x.harga - y.harga);
          break;
        case "highPrice":
          results.sort((x, y) => y.harga - x.harga);
          break;
        case "az":
          results.sort(compareString);
          break;
        case "za":
          results.sort(compareString).reverse();
          break;
        default:
          results;
          break;
      }

      // paginated result by mySQL data
      const paginatedProducts = results.slice(startIdx, endIdx);

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
  quickCheckStocks: (req, res, next) => {
    // Query
    const querySelect = `SELECT app_master_produk.nm_master_produk, SUM(stok) AS total_stock FROM app_persediaan_produk JOIN app_warehouse ON app_persediaan_produk.id_warehouse = app_warehouse.id_warehouse JOIN app_master_produk ON app_persediaan_produk.id_master_produk = app_master_produk.id_master_produk WHERE app_master_produk.id_master_produk = ? GROUP BY nm_master_produk;`;

    // Pass to model
    quickCheckStocksMdl(res, querySelect, req.query.id, next);
  },
  searchProduct: async (req, res, next) => {
    // Data from clint
    /**
     * page=${pagination.currentPage} INT (*OFFSET)
     * productName=${filtering.byName} VARCHAR: FALSE IF DONT FILTER
     * category=${filtering.byCategory} VARCHAR
     * sortBy=${filtering.sort} NAME(A-Z, Z-A), PRICE(A-Z, Z-A)
     */
    const pagLimit = 6;
    let offset = 0;
    let rows = "";

    const data = { ...req.query, pagLimit };
    offset = pagLimit * +(data.page - 1);
    data.offset = offset;
    data.productName = `%${data.productName}%`;

    // No sorting
    if (!data.sortBy) data.sortBy = "";
    // sort by rows
    if (data.sortBy === "lowPrice" || data.sortBy === "highPrice")
      rows = "harga";
    if (data.sortBy === "az" || data.sortBy === "za") rows = "nm_master_produk";

    // sorting
    if (data.sortBy === "lowPrice" || data.sortBy === "az")
      data.sortBy = `ORDER BY ${rows} ASC`;
    if (data.sortBy === "highPrice" || data.sortBy === "za")
      data.sortBy = `ORDER BY ${rows} DESC`;
    if (!data.sortBy) data.sortBy = "";

    const queryCount = `SELECT COUNT(*) AS count FROM app_master_produk WHERE nm_master_produk LIKE ?;`;

    const querySelect = `SELECT ?? FROM app_master_produk WHERE nm_master_produk LIKE ? ${data.sortBy} LIMIT ? OFFSET ?`;
    // Pass to Model
    searchProductMdl(res, queryCount, querySelect, data, next);
  },
  getProductsByFilter: async (req, res, next) => {
    // Data from clint
    /**
     * page=${pagination.currentPage} INT (*OFFSET)
     * productName=${filtering.byName} VARCHAR FIXME : FALSE IF DONT FILTER
     * category=${filtering.byCategory} VARCHAR
     * sortBy=${filtering.sort} NAME(A-Z, Z-A), PRICE(A-Z, Z-A)
     */

    console.log(req.query);
    const pagLimit = 6;
    let offset = 0;
    let rows = "";

    const data = { ...req.query, pagLimit };
    offset = pagLimit * +(data.page - 1);
    data.offset = offset;

    // No sorting
    if (!data.sortBy) data.sortBy = "";
    // sort by rows
    if (data.sortBy === "lowPrice" || data.sortBy === "highPrice")
      rows = "harga";
    if (data.sortBy === "az" || data.sortBy === "za") rows = "nm_master_produk";

    // sorting
    if (data.sortBy === "lowPrice" || data.sortBy === "az")
      data.sortBy = `ORDER BY ${rows} ASC`;
    if (data.sortBy === "highPrice" || data.sortBy === "za")
      data.sortBy = `ORDER BY ${rows} DESC`;
    if (!data.sortBy) data.sortBy = "";

    console.log(data);

    // query
    const queryCount = `SELECT COUNT(*) AS productsCount FROM app_master_produk WHERE id_category = ?;`;
    const querySelect = `SELECT ?? FROM app_master_produk 
                          JOIN app_category_master_produk 
                          ON app_master_produk.id_category = app_category_master_produk.id_category_master_produk 
                          WHERE app_master_produk.id_category = ? ${data.sortBy} LIMIT ? OFFSET ?`;

    // pass to model
    getProductsByFilterMdl(res, queryCount, querySelect, data, next);
  },
  getProductLanding: (req, res, next) => {
    const limit = 3;
    const offset = 0;
    const querySelect = `SELECT ?? FROM app_master_produk LIMIT ? OFFSET ?`;

    getProductLandingMdl(res, querySelect, limit, offset, next);
  },
};
