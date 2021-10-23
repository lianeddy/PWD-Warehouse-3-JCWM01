const Axios = require("axios");
const { AppPersediaanProduk } = require("../database/table");

const ID = "id_persediaan_produk";
const URL_API = "http://localhost:3300";

module.exports = {
  getData: async (req, res, next) => {
    // Check Paging
    let pages = 0,
      maxPerPage = 10;
    if (req.query.hasOwnProperty("pages")) pages = req.query.pages;
    if (req.query.hasOwnProperty("maxpage")) maxPerPage = req.query.maxpage;

    let qryString = ``;
    // Filter By Master Produk
    if (req.query.hasOwnProperty("id_master_produk")) {
      qryString += ` id_master_produk='${req.query.id_master_produk}' AND`;
    }
    // Filter By Warehouse
    if (req.query.hasOwnProperty("id_warehouse")) {
      qryString += ` id_warehouse='${req.query.id_warehouse}'`;
    } else {
      qryString = qryString.slice(0, -3);
    }

    let output = await AppPersediaanProduk.query()
      .whereNotDeleted()
      .whereRaw(qryString)
      .page(pages, maxPerPage);
    res.status(200).send({
      ...output,
      maxPerPage,
      pagesNow: pages,
    });
  },
  // listData: async (req, res, next) => {
  //   let qryString = ``;

  //   // Filter Warehuse
  //   if (req.query.hasOwnProperty("id_warehouse")) {
  //     qryString += `id_warehouse = ${req.query.id_warehouse} AND`;
  //   }
  //   // Filter Master Produk
  //   if (req.query.hasOwnProperty("id_master_produk")) {
  //     qryString += ` id_master_produk = '${req.query.id_master_produk}'`;
  //   } else {
  //     qryString = qryString.slice(0, -3);
  //   }

  //   let output = await AppPersediaanProduk.query()
  //     .whereNotDeleted()
  //     .orderBy("id_history_persediaan_produk", "desc")
  //     .whereRaw(qryString);
  //   if (output.length > 0) res.status(200).send(output);
  //   else next();
  // },
  addData: async (req, res, next) => {
    if (Object.keys(req.body).length == 0) next();

    // tambah history persediaan produk
    if (req.body.hasOwnProperty("id_user")) {
      const { id_warehouse, id_master_produk, stok } = req.body;
      let dataSend = {
        id_master_produk,
        id_warehouse,
        sisa: stok,
        id_user: req.body.id_user,
      };
      delete req.body.id_user;

      // apakah produk masuk ?
      if (req.body.hasOwnProperty("masuk")) {
        dataSend = {
          ...dataSend,
          masuk: req.body.masuk,
        };
        delete req.body.masuk;
      }
      // apakah produk keluar ?
      if (req.body.hasOwnProperty("keluar")) {
        dataSend = {
          ...dataSend,
          keluar: req.body.keluar,
        };
        delete req.body.keluar;
      }
      console.log("Persediaan Produl");
      console.table(req.body);

      // Tambah history persediaan produk
      let outputFromWarehouse = await Axios.post(
        `${URL_API}/history-persediaan-produk`,
        dataSend
      ).then((res) => res.data);
      if (outputFromWarehouse.code == 0) {
        console.log("Error tambah history persediaan !!!");
        next();
      }
    }

    let output = await AppPersediaanProduk.query().insert(req.body);
    if (output)
      res.status(201).send({
        message: "success",
        code: 1,
      });
    else next();
  },
  updateData: async (req, res, next) => {
    // apakah body kosong ?
    if (Object.keys(req.body).length == 0) next();

    // tambah history persediaan produk
    if (req.body.hasOwnProperty("id_user")) {
      const { id_warehouse, id_master_produk, stok } = req.body;
      let dataSend = {
        id_master_produk,
        id_warehouse,
        sisa: stok,
        id_user: req.body.id_user,
      };
      delete req.body.id_user;

      // apakah produk masuk ?
      if (req.body.hasOwnProperty("masuk")) {
        dataSend = {
          ...dataSend,
          masuk: req.body.masuk,
        };
        delete req.body.masuk;
      }
      // apakah produk keluar ?
      if (req.body.hasOwnProperty("keluar")) {
        dataSend = {
          ...dataSend,
          keluar: req.body.keluar,
        };
        delete req.body.keluar;
      }
      console.log("Persediaan Produl");
      console.table(req.body);

      // Tambah history persediaan produk
      let outputFromWarehouse = await Axios.post(
        `${URL_API}/history-persediaan-produk`,
        dataSend
      ).then((res) => res.data);
      if (outputFromWarehouse.code == 0) {
        console.log("Error tambah history persediaan !!!");
        next();
      }
    }

    // Update persedian produk
    let output = await AppPersediaanProduk.query()
      .update(req.body)
      .where(ID, req.params.id);
    if (output)
      return res.status(200).send({
        message: "success",
        code: 1,
      });
    else next();
  },
  updateManyDataByIdUser: async (req, res, next) => {
    // res.status(200).send(req.body);
    let output = await AppPersediaanProduk.query()
      .update(req.body)
      .where("id_user", req.params.id);
    if (output)
      res.status(200).send({
        message: "success",
        code: 1,
      });
    else next();
  },
  deleteData: async (req, res, next) => {
    let output = await AppPersediaanProduk.query()
      .where(ID, req.params.id)
      .delete();
    if (output)
      res.status(200).send({
        message: "success",
        code: 1,
      });
    else next();
  },
};
