const { Axios } = require("axios");
const { AppPermintaanProduk } = require("../database/table");

const ID = "id_permintaan_produk";

module.exports = {
  getData: async (req, res, next) => {
    // Check Paging
    let pages = 0,
      maxPerPage = 10;
    if (req.query.hasOwnProperty("pages")) pages = req.query.pages;
    if (req.query.hasOwnProperty("maxpage")) maxPerPage = req.query.maxpage;

    let qryString = ``;
    // Filter Tgl Mulai
    if (req.query.hasOwnProperty("status_warehouse")) {
      if (req.query.status_warehouse == 1) {
        qryString += ` from_warehouse='${req.query.from_warehouse}' AND`;
      } else if (req.query.status_warehouse == 2) {
        qryString += ` to_warehouse='${req.query.to_warehouse}' AND`;
      } else {
        qryString += `(from_warehouse=${req.query.from_warehouse} OR to_warehouse=${req.query.to_warehouse}) AND`;
      }
    } else {
      qryString += `(from_warehouse=${req.query.from_warehouse} OR to_warehouse=${req.query.to_warehouse}) AND`;
    }

    // Filter Tgl Mulai
    if (req.query.hasOwnProperty("tgl_mulai")) {
      qryString += ` created_at>='${req.query.tgl_mulai}' AND`;
    }
    // Filter Tgl Selesai
    if (req.query.hasOwnProperty("tgl_selesai")) {
      qryString += ` created_at<='${req.query.tgl_selesai}'`;
    } else {
      qryString = qryString.slice(0, -3);
    }

    let output = await AppPermintaanProduk.query()
      .whereNotDeleted()
      .whereRaw(qryString)
      .withGraphFetched("data_from_warehouse")
      .withGraphFetched("data_to_warehouse")
      .withGraphFetched("data_status")
      .withGraphFetched("data_master_produk")
      .withGraphFetched("data_user")
      .page(pages, maxPerPage);
    res.status(200).send({
      ...output,
      maxPerPage,
      pagesNow: pages,
    });
  },
  detailData: async (req, res, next) => {
    let output = await AppPermintaanProduk.query()
      .whereNotDeleted()
      .where(ID, req.params.id);
    if (output.length > 0) res.status(200).send(output);
    else next();
  },
  addData: async (req, res, next) => {
    // res.status(200).send(req.body);
    if (Object.keys(req.body).length == 0) next();
    const {
      id_user,
      id_master_produk,
      id_status,
      from_warehouse,
      to_warehouse,
      jumlah,
      deskripsi,
    } = req.body;
    let output = await AppPermintaanProduk.query().insert({
      id_master_produk,
      id_status,
      from_warehouse,
      to_warehouse,
      jumlah,
      deskripsi,
    });
    if (output) {
      res.status(201).send({
        message: "success",
        code: 1,
      });
    } else next();
  },
  updateData: async (req, res, next) => {
    let output = await AppPermintaanProduk.query()
      .update(req.body)
      .where(ID, req.params.id);
    if (output)
      res.status(200).send({
        message: "success",
        code: 1,
      });
    else next();
  },
  updateManyDataByIdUser: async (req, res, next) => {
    // res.status(200).send(req.body);
    let output = await AppPermintaanProduk.query()
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
    let output = await AppPermintaanProduk.query()
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
