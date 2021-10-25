const { AppWarehouse, SysUser } = require("../database/table");
const Crypto = require("crypto");

const ID = "id_warehouse";

module.exports = {
  getData: async (req, res, next) => {
    // Check Paging
    let pages = 0,
      maxPerPage = 10;
    if (req.query.hasOwnProperty("pages")) pages = req.query.pages;
    if (req.query.hasOwnProperty("maxpage")) maxPerPage = req.query.maxpage;

    let qryString = ``;
    // // Filter Propinsi
    // if (req.query.hasOwnProperty("id_propinsi")) {
    //   qryString += ` id_propinsi='${req.query.id_propinsi}' AND`;
    // }
    // // Filter Kabupaten Kota
    // console.log(req.query.id_kabkota);
    // if (req.query.hasOwnProperty("id_kabkota")) {
    //   qryString += ` id_kabkota='${req.query.id_kabkota}'`;
    // } else {
    //   qryString = qryString.slice(0, -3);
    // }

    // Filter Name Master Produk
    if (req.query.hasOwnProperty("nm_warehouse")) {
      qryString += ` (app_warehouse.nm_warehouse LIKE '%${req.query.nm_warehouse}%' 
      OR app_warehouse.kode_warehouse LIKE '%${req.query.nm_warehouse}%')`;
    }
    // Filter ID Master Produk
    if (req.query.hasOwnProperty("id_master_produk")) {
      qryString += ` AND app_persediaan_produk.id_master_produk = ${req.query.id_master_produk}`;
    }
    // Filter Jumlah Produk
    if (req.query.hasOwnProperty("jumlah_produk")) {
      qryString += ` AND app_persediaan_produk.stok >= ${req.query.jumlah_produk}`;
    }
    // Filter Jumlah Produk
    if (req.query.hasOwnProperty("id_warehouse_user")) {
      qryString += ` AND app_warehouse.id_warehouse != ${req.query.id_warehouse_user}`;
    }

    let output = await AppWarehouse.query()
      .whereNotDeleted()
      // .withGraphFetched("data_persediaan_produk_single")
      // .modifyGraph("data_persediaan_produk_single", (builder) => {
      //   if (req.query.hasOwnProperty("id_master_produk"))
      //     builder.where("id_master_produk", req.query.id_master_produk);
      //   if (req.query.hasOwnProperty("jumlah_produk")) {
      //     console.log(req.query.jumlah_produk);
      //     builder.where("stok", ">=", req.query.jumlah_produk);
      //   }
      // })
      .leftJoin(
        "app_persediaan_produk",
        "app_warehouse.id_warehouse",
        "app_persediaan_produk.id_warehouse"
      )
      .whereRaw(qryString)
      .page(pages, maxPerPage);
    res.status(200).send({
      ...output,
      maxPerPage,
      pagesNow: pages,
    });
  },
  detailData: async (req, res, next) => {
    let output = await AppWarehouse.query()
      .whereNotDeleted()
      .where(ID, req.params.id);
    if (output.length > 0) res.status(200).send(output);
    else next();
  },
  addData: async (req, res, next) => {
    if (Object.keys(req.body).length == 0) next();

    let tmpData = {
      full_name: req.body.full_name,
      gender: req.body.gender,
      birth_date: req.body.birth_date,
      password: Crypto.createHmac("sha1", "hash123")
        .update(req.body.password)
        .digest("hex"),
      phone: req.body.phone,
      email: req.body.email,
      username: "ADMIN",
      is_valid: 1,
    };
    delete req.body.full_name;
    delete req.body.email;
    delete req.body.gender;
    delete req.body.birth_date;
    delete req.body.password;
    delete req.body.phone;

    let output = await AppWarehouse.query().insert(req.body);
    if (output) {
      tmpData = {
        ...tmpData,
        id_warehouse: output.id,
      };
      let outUser = await SysUser.query().insert(tmpData);
      if (outUser)
        res.status(201).send({
          message: "success",
          code: 1,
        });
      else next();
    } else next();
  },
  updateData: async (req, res, next) => {
    let output = await AppWarehouse.query()
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
    let output = await AppWarehouse.query()
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
    let output = await AppWarehouse.query().where(ID, req.params.id).delete();
    if (output)
      res.status(200).send({
        message: "success",
        code: 1,
      });
    else next();
  },
};
