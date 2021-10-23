const { AppMasterProduk } = require("../database/table");

const ID = "id_master_produk";

module.exports = {
  getData: async (req, res, next) => {
    // Check Paging
    let pages = 0,
      maxPerPage = 10;
    if (req.query.hasOwnProperty("pages")) pages = req.query.pages;
    if (req.query.hasOwnProperty("maxpage")) maxPerPage = req.query.maxpage;

    let qryString = ``;
    // Filter Propinsi
    // if (req.query.hasOwnProperty("id_propinsi")) {
    //   qryString += ` id_propinsi='${req.query.id_propinsi}' AND`;
    // }

    // Filter Kabupaten Kota
    // console.log(req.query.id_kabkota);
    // if (req.query.hasOwnProperty("id_kabkota")) {
    //   qryString += ` id_kabkota='${req.query.id_kabkota}'`;
    // } else {
    //   qryString = qryString.slice(0, -3);
    // }

    // Filter Name Master Produk
    if (req.query.hasOwnProperty("nm_master_produk")) {
      qryString += ` nm_master_produk LIKE '%${req.query.nm_master_produk}%'`;
    }

    let output = await AppMasterProduk.query()
      .whereNotDeleted()
      .whereRaw(qryString)
      .withGraphFetched("data_history_produk")
      .modifyGraph("data_history_produk", (builder) => {
        if (req.query.hasOwnProperty("id_warehouse"))
          builder.where("id_warehouse", req.query.id_warehouse);
      })
      .page(pages, maxPerPage);
    res.status(200).send({
      ...output,
      maxPerPage,
      pagesNow: pages,
    });
  },
  detailData: async (req, res, next) => {
    let output = await AppMasterProduk.query()
      .whereNotDeleted()
      .where(ID, req.params.id);
    if (output.length > 0) res.status(200).send(output);
    else next();
  },
  addData: async (req, res, next) => {
    if (Object.keys(req.body).length == 0) next();

    let output = await AppMasterProduk.query().insert(req.body);
    if (output)
      res.status(201).send({
        message: "success",
        code: 1,
      });
    else next();
  },
  updateData: async (req, res, next) => {
    let output = await AppMasterProduk.query()
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
    let output = await AppMasterProduk.query()
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
    let output = await AppMasterProduk.query()
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
