const { db } = require("../helpers/index");

module.exports = {
  getData: (req, res) => {
    console.log(req.query.sortBy);

    // filter products & sort by query
    const sortBy = req.query.sortBy;

    const filterProductByName = req.query.productName;
    const filterProductByCategory = req.query.category;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const startIdx = (page - 1) * limit;
    const endIdx = page * limit;
    // declare button pagination
    let nextPage;
    let previusPage;

    const scriptQuery = `SELECT id_master_produk, nm_master_produk, harga, description, nm_category_master_produk, URL FROM app_master_produk p JOIN app_category_master_produk c on p.id_category = c.id_category_master_produk;`;
    // const scriptQuery = `SELECT id_persediaan_produk, id_master_produk, nm_master_produk, harga, description, sum(stok) as total_stok, URL FROM
    // app_persediaan_produk pp JOIN app_master_produk p on pp.id_produk = p.id_master_produk group by id_master_produk;`;
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
  getDataById: (req, res) => {
    console.log(req.params);
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

      // const filteredResults = results.filter((val) => {
      //   if (filterProductByName && filterProductByCategory) {
      //     return (
      //       val.nm_master_produk
      //         .toLowerCase()
      //         .includes(filterProductByName.toLowerCase()) &&
      //       val.nm_category_master_produk
      //         .toLowerCase()
      //         .includes(filterProductByCategory.toLowerCase())
      //     );
      //   } else if (filterProductByName) {
      //     return val.nm_master_produk
      //       .toLowerCase()
      //       .includes(filterProductByName.toLowerCase());
      //   } else if (filterProductByCategory) {
      //     return val.nm_category_master_produk
      //       .toLowerCase()
      //       .includes(filterProductByCategory.toLowerCase());
      //   } else {
      //     return results;
      //   }
      // });
      console.table(results);
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
  checkStokProduct: (req, res) => {
    const checkProduk = req.query.product;
    console.log(checkProduk);

    const scriptQuery = `SELECT id_persediaan_produk, id_master_produk, nm_master_produk, sum(stok) as total_stok FROM app_persediaan_produk pp JOIN app_master_produk p on pp.id_produk = p.id_master_produk where id_master_produk = ${checkProduk};`;

    db.query(scriptQuery, [], (err, results) => {
      if (err) {
        res.status(500).send({
          message: "Data gagal diakses",
          success: false,
          err,
        });
      } else {
        res.status(200).send({
          message: "Data berhasil diakses",
          dataStok: results[0],
        });
      }
    });
  },
};
