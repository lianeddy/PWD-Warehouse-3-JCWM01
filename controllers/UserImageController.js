const { SysFile } = require("../database/table");
const { StorageHelper } = require("../helpers");
const fs = require("fs");
const config = require("dotenv").config();

const ID = "id_user";
const NAME_FILE = "profile-image";

module.exports = {
  getData: async (req, res, next) => {
    // Check Paging
    let pages = 0,
      maxPerPage = 10;
    if (req.query.hasOwnProperty("pages")) pages = req.query.pages;
    if (req.query.hasOwnProperty("maxpage")) maxPerPage = req.query.maxpage;

    let qryString = "";
    // Filter Propinsi
    if (req.query.hasOwnProperty("id_user")) {
      qryString += `id_user=${req.query.id_propinsi}`;
    }

    let output = await SysFile.query()
      .whereNotDeleted()
      .whereRaw(qryString)
      .page(pages, maxPerPage);
    res.status(200).send({
      ...output,
      maxPerPage,
      pagesNow: pages,
    });
  },
  detailData: async (req, res, next) => {
    let output = await SysFile.query()
      .whereNotDeleted()
      .where(ID, req.params.id);
    if (output.length > 0) res.status(200).send(output);
    else next();
  },
  addData: (req, res, next) => {
    try {
      let path = "profile-image";
      let outUploader = StorageHelper.uploader(path, "profile-image").fields({
        name: "file_image",
      });
      console.table(req.body);
      outUploader(req, res, async (err) => {
        if (err) next();
        const { file } = req.file_image;
        const filePath = file ? path + "/" + file[0].filename : null;

        let data = JSON.parse(req.body.data);
        data.url_file = filePath;
        data.nm_file = NAME_FILE;
        data.create_user = data.id_user;

        let output = await SysFile.query().insert(req.body);
        if (output) res.status(201).send(output);
        else {
          fs.unlinkSync(process.env.FILE_STORAGE + filePath);
          next();
        }
      });
    } catch (error) {
      console.error(error);
      next();
    }
  },
  updateData: async (req, res, next) => {
    try {
      let path = "profile-image";
      let uploader = StorageHelper(path, "profile-image").fields({
        name: "file_image",
      });
      uploader(req, res, async (err) => {
        if (err) next();
        const { file } = req.file_image;
        const filePath = file ? path + "/" + file[0].filename : null;

        let data = JSON.parse(req.body.data);
        data.url_file = filePath;
        data.nm_file = NAME_FILE;
        data.create_user = data.id_user;

        let output = await SysFile.query()
          .update(req.body)
          .where(ID, req.params.id);
        if (output)
          res.status(200).send({
            message: "success",
            code: 1,
          });
        else {
          fs.unlinkSync(process.env.FILE_STORAGE + filePath);
          next();
        }
      });
    } catch (error) {
      console.error(error);
      next();
    }
  },
  deleteData: async (req, res, next) => {
    let output = await SysFile.query().where(ID, req.params.id).delete();
    if (output)
      res.status(200).send({
        message: "success",
        code: 1,
      });
    else next();
  },
};
