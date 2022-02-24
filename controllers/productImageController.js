const { db, createToken } = require("../helpers/index");
const { StorageHelper } = require("../helpers");
const fs = require("fs");

const NAME_FILE = "product-image";

module.exports = {
  addData: (req, res, next) => {
    try {
      // console.log(typeof req.body.data);
      // console.log(req);
      let path = "/imagesproduct-image";
      let outUploader = StorageHelper.uploader(path, "product-image").fields([
        {
          name: "file",
        },
      ]);
      outUploader(req, res, async (err) => {
        // console.log("RUN outUploade");
        // console.log(req);
        if (err) {
          console.error(err);
          // next();
        }

        // Parsing url file
        const { file } = req.files;
        const filePath = file
          ? "/images" + path + "/" + file[0].filename
          : null;

        // Parsing data
        let data = JSON.parse(req.body.data);
        data.url_file = filePath;
        console.log(filePath);

        // Simpan data ke table, untuk update per-id-product
        let sqlInsert = `Update app_master_produk set URL=${db.escape(
          filePath
        )} where id_master_produk=8;`;
        db.query(sqlInsert, (err, results) => {
          if (err) {
            console.log(err);
            fs.unlinkSync("./public" + filePath);
            res.status(500).send({ message: "error", err });
          }
          res.status(201).send({ message: "success", code: 1 });
        });
      });
    } catch (error) {
      console.error(error);
      // next();
    }
  },
  addImgLanding: async (req, res, next) => {
    let path = "/imagescover-image";
    let outUploader = StorageHelper.uploader(path, "cover-landing").fields([
      {
        name: "file",
      },
    ]);

    outUploader(req, res, async (err) => {
      if (err) {
        console.error(err);
        // next();
      }

      // Parsing url file
      console.log(req.files);
      const { file } = req.files;
      const filePath = file ? "/images" + path + "/" + file[0].filename : null;

      // Simpan data ke table, untuk update per-id-product
      const sqlInsert = `INSERT INTO sys_file (url_file, id_user, nm_file) VALUES ("${filePath}", 1, "cover-images")`;

      db.query(sqlInsert, (err, results) => {
        if (err) {
          console.log(err);
          fs.unlinkSync("./public" + filePath);
          res.status(500).send({ message: "error", err });
        }
        res.status(201).send({ filePath, message: "success", code: 1 });
      });
    });
  },
};
