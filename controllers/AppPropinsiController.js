const { AppPropinsi } = require("../database/table");

const ID = "id_propinsi";

module.exports = {
  getData: async (req, res, next) => {
    // Check Paging
    let pages = 0,
      maxPerPage = 10;
    if (req.query.hasOwnProperty("pages")) {
      if (req.query.pages) pages = req.query.pages;
    }
    if (req.query.hasOwnProperty("maxPerPage")) {
      if (req.query.maxPerPage) maxPerPage = req.query.maxpage;
    }

    let qryString = "";
    // Filter ID Propinsi
    if (req.query.hasOwnProperty("id_propinsi")) {
      qryString += `id_propinsi='${req.query.id_propinsi}' AND`;
    }

    // Filter Name Propinsi
    if (req.query.hasOwnProperty("nm_propinsi")) {
      qryString += `nm_propinsi LIKE '%${req.query.nm_propinsi}%'`;
    } else qryString = qryString.slice(0, -3);

    let output = await AppPropinsi.query()
      .whereNotDeleted()
      .whereRaw(qryString)
      .page(pages, maxPerPage);
    res.status(200).send(output);
  },
  detailData: async (req, res, next) => {
    let output = await AppPropinsi.query()
      .whereNotDeleted()
      .where(ID, req.params.id);
    if (output.length > 0) res.status(200).send(output);
    else next();
  },
  addData: async (req, res, next) => {
    let output = await AppPropinsi.query().insert(req.body);
    if (output) res.status(201).send(output);
    else next();
  },
  updateData: async (req, res, next) => {
    let output = await AppPropinsi.query()
      .update(req.body)
      .where(ID, req.params.id);
    if (output) res.status(200).send(output);
    else next();
  },
  deleteData: async (req, res, next) => {
    let output = await AppPropinsi.query().deleteById(ID, req.params.id);
    if (output) res.status(200).send(output);
    else next();
  },
};
