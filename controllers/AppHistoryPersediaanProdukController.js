const { AppHistoryPersediaanProduk } = require("../database/table");
const { raw, ref } = require("objection");

const ID = "id_history_persediaan_produk";

module.exports = {
  getData: async (req, res, next) => {
    // Check Paging
    let pages = 0,
      maxPerPage = 10;
    if (req.query.hasOwnProperty("pages")) pages = req.query.pages;
    if (req.query.hasOwnProperty("maxpage")) maxPerPage = req.query.maxpage;

    let qryString = ``;
    // Filter ID Warehouse
    if (req.query.hasOwnProperty("id_warehouse")) {
      qryString += ` id_warehouse = '${req.query.id_warehouse}' AND`;
    }
    // Filter Tipe Transaksi
    if (req.query.hasOwnProperty("tipe_transaksi")) {
      if (req.query.tipe_transaksi == 0)
        qryString += ` id_transaksi = '${req.query.tipe_transaksi}' AND`;
      else qryString += ` id_transaksi >= '${req.query.tipe_transaksi}' AND`;
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

    let output = await AppHistoryPersediaanProduk.query()
      .select(
        "*",
        raw('DATE_FORMAT(created_at, "%d %M %Y") as tgl_dibuat'),
        raw('DATE_FORMAT(created_at, "%T") as waktu_dibuat')
      )
      .whereNotDeleted()
      .whereRaw(qryString)
      .withGraphFetched("data_warehouse")
      .withGraphFetched("data_master_produk")
      .withGraphFetched("data_user")
      .page(pages, maxPerPage);
    res.status(200).send({
      ...output,
      maxPerPage,
      pagesNow: pages,
    });
  },
  listData: async (req, res, next) => {
    let qryString = ``;

    // Filter Warehuse
    if (req.query.hasOwnProperty("id_warehouse")) {
      qryString += `id_warehouse = ${req.query.id_warehouse} AND`;
    }
    // Filter Master Produk
    if (req.query.hasOwnProperty("id_master_produk")) {
      qryString += ` id_master_produk = '${req.query.id_master_produk}'`;
    } else {
      qryString = qryString.slice(0, -3);
    }

    let output = await AppHistoryPersediaanProduk.query()
      .whereNotDeleted()
      .orderBy("id_history_persediaan_produk", "desc")
      .whereRaw(qryString);
    if (output.length > 0) res.status(200).send(output);
    else next();
  },
  addData: async (req, res, next) => {
    if (Object.keys(req.body).length == 0) next();
    let output = await AppHistoryPersediaanProduk.query().insert(req.body);
    if (output)
      res.status(201).send({
        message: "success",
        code: 1,
      });
    else next();
  },
  updateData: async (req, res, next) => {
    let output = await AppHistoryPersediaanProduk.query()
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
    let output = await AppHistoryPersediaanProduk.query()
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
    let output = await AppHistoryPersediaanProduk.query()
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
