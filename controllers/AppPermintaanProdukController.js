const Axios = require("axios");
const { AppPermintaanProduk } = require("../database/table");

const ID = "id_permintaan_produk";
const URL_API = "http://localhost:3300";

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
    // Get data
    if (req.body.length == 0) next();
    const {
      from_warehouse,
      to_warehouse,
      id_master_produk,
      jumlah,
      id_user,
      is_accept,
    } = req.body;
    delete req.body.id_user;

    console.table(req.body);

    let output = await AppPermintaanProduk.query()
      .update(req.body)
      .where(ID, req.params.id);
    if (output) {
      if (is_accept) {
        // Get History Persediaan Produk From Warehouse
        const paramsFromWarehouse = {
          id_warehouse: from_warehouse,
          id_master_produk: id_master_produk,
        };
        let tmpPersediaanProdukFromWarehouse = await Axios.get(
          `${URL_API}/persediaan-produk`,
          { params: paramsFromWarehouse }
        ).then((response) => {
          // console.table(response.data.results);
          return response.data.results;
        });

        // Get History Persediaan Produk To Warehouse
        const paramsToWarehouse = {
          id_warehouse: to_warehouse,
          id_master_produk: id_master_produk,
        };
        let tmpPersediaanProdukToWarehouse = await Axios.get(
          `${URL_API}/persediaan-produk`,
          { params: paramsToWarehouse }
        ).then((response) => response.data.results);

        // Tambah persediaan produk From Warehouse
        let dataSendFromWarehouse = {
          id_master_produk,
          id_warehouse: from_warehouse,
          id_user,
          masuk: jumlah,
          keluar: 0,
          stok:
            parseInt(tmpPersediaanProdukFromWarehouse[0].stok) +
            parseInt(jumlah),
        };
        let outputFromWarehouse = null;
        // apakah data persedian produk sudah ada ?
        if (tmpPersediaanProdukToWarehouse.length == 0) {
          outputFromWarehouse = await Axios.post(
            `${URL_API}/persediaan-produk`,
            dataSendFromWarehouse
          ).then((res) => res.data);
        } else {
          outputFromWarehouse = await Axios.patch(
            `${URL_API}/persediaan-produk/${tmpPersediaanProdukFromWarehouse[0].id_persediaan_produk}`,
            dataSendFromWarehouse
          ).then((res) => res.data);
        }

        // Tambah persediaan produk To Warehouse
        let dataSendToWarehouse = {
          id_master_produk,
          id_warehouse: to_warehouse,
          id_user,
          masuk: 0,
          keluar: jumlah,
          stok:
            parseInt(tmpPersediaanProdukToWarehouse[0].stok) - parseInt(jumlah),
        };
        let outputToWarehouse = null;
        // apakah data persedian produk sudah ada ?
        if (tmpPersediaanProdukToWarehouse.length == 0) {
          outputToWarehouse = await Axios.post(
            `${URL_API}/persediaan-produk/${tmpPersediaanProdukToWarehouse[0].id_persediaan_produk}`,
            dataSendToWarehouse
          ).then((res) => res.data);
        } else {
          outputToWarehouse = await Axios.patch(
            `${URL_API}/persediaan-produk/${tmpPersediaanProdukToWarehouse[0].id_persediaan_produk}`,
            dataSendToWarehouse
          ).then((res) => res.data);
        }

        // Check apakah semua update historypersediaanproduk berhasil ?
        if (outputFromWarehouse.code == 1 && outputToWarehouse.code == 1) {
          return res.status(200).send({
            message: "success",
            code: 1,
          });
        } else {
          next();
        }
      }

      // jika pilih tolak
      return res.status(200).send({
        message: "success",
        code: 1,
      });
    } else next();
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
