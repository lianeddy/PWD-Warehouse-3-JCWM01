const { AppTransaksiMasterProduk } = require("../database/table");
const { raw, ref } = require("objection");

const ID = "id_transaksi_master_produk";

module.exports = {
  getData: async (req, res, next) => {
    // Check Paging
    let pages = 0,
      maxPerPage = 10;
    if (req.query.hasOwnProperty("pages")) pages = req.query.pages;
    if (req.query.hasOwnProperty("maxpage")) maxPerPage = req.query.maxpage;

    let qryString = ``;
    // Filter User
    if (req.query.hasOwnProperty("id_user")) {
      qryString += ` id_warehouse = '${req.query.id_warehouse}' AND`;
    }
    // Filter Metode Pembayaran
    if (req.query.hasOwnProperty("id_metode_pembayaran")) {
      qryString += ` id_metode_pembayaran = '${req.query.id_metode_pembayaran}' AND`;
    }
    // Filter Metode Pembayaran
    if (req.query.hasOwnProperty("id_metode_pengiriman")) {
      qryString += ` id_metode_pengiriman = '${req.query.id_metode_pengiriman}' AND`;
    }
    // Filter Sudah Bayar
    if (req.query.hasOwnProperty("is_bayar")) {
      qryString += ` is_bayar = '${req.query.is_bayar}' AND`;
    }
    // Filter Sudah Verifikasi
    if (req.query.hasOwnProperty("is_verify")) {
      qryString += ` is_verify = '${req.query.is_verify}' AND`;
    }
    // Filter Warehouse
    if (req.query.hasOwnProperty("id_warehouse")) {
      qryString += ` id_warehouse = '${req.query.id_warehouse}' AND`;
    }
    // Filter ID Transaksi Master Produk
    if (req.query.hasOwnProperty("id_transaksi_master_produk")) {
      qryString += ` id_transaksi_master_produk = '${req.query.id_transaksi_master_produk}' AND`;
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

    let output = await AppTransaksiMasterProduk.query()
      .select(
        "*",
        raw('DATE_FORMAT(created_at, "%d %M %Y") as tgl_dibuat'),
        raw('DATE_FORMAT(created_at, "%T") as waktu_dibuat')
      )
      .whereNotDeleted()
      .whereRaw(qryString)
      .withGraphFetched("data_metode_pembayaran")
      .withGraphFetched("data_metode_pengiriman")
      .withGraphFetched("data_user")
      .withGraphFetched("data_warehouse")
      .withGraphFetched("data_alamat_user_single.[datapropinsi,datakabkota]")
      .withGraphFetched("data_permintaan_produk_single")
      .withGraphFetched(
        "data_detail_transaksi_master_produk.[data_master_produk,data_persediaan_produk_single]"
      )
      .modifyGraph(
        "data_detail_transaksi_master_produk.[data_persediaan_produk_single]",
        (builder) => {
          if (req.query.hasOwnProperty("id_warehouse"))
            builder.where("id_warehouse", req.query.id_warehouse);
        }
      )
      .modifyGraph("data_alamat_user_single", (builder) => {
        builder.where("is_default", 1);
      })
      .orderBy("created_at", "desc")
      .page(pages, maxPerPage);
    return res.status(200).send({
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

    let output = await AppTransaksiMasterProduk.query()
      .whereNotDeleted()
      .orderBy("id_history_persediaan_produk", "desc")
      .whereRaw(qryString);
    if (output.length > 0) res.status(200).send(output);
    else next();
  },
  addData: async (req, res, next) => {
    if (Object.keys(req.body).length == 0) next();
    let output = await AppTransaksiMasterProduk.query().insert(req.body);
    if (output)
      res.status(201).send({
        message: "success",
        code: 1,
      });
    else next();
  },
  updateData: async (req, res, next) => {
    let output = await AppTransaksiMasterProduk.query()
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
    let output = await AppTransaksiMasterProduk.query()
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
    let output = await AppTransaksiMasterProduk.query()
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
