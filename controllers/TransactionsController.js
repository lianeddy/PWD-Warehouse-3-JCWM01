const { db, createToken, RajaOngkirHelper } = require("../helpers/index");
const { StorageHelper } = require("../helpers");
const fs = require("fs");

const {
  checkoutMdl,
  seeOnGoingTransactionMdl,
  generatedOngkirMdl,
  getShippingMethodMdl,
  getPaymentMethodMdl,
} = require("../models/transactionModels");

const NAME_FILE = "product-image";

module.exports = {
  addPaymentProof: (req, res, next) => {
    try {
      // console.log(typeof req.body.data);
      // console.log(req);
      let path = "/imagesPayment-image";
      let outUploader = StorageHelper.uploader(path, "payment-image").fields([
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

        // Simpan data ke table, untuk update per-id_transaksi_master_produk
        let sqlInsert = `Update app_transaksi_master_produk set updated_at=now() , bukti_bayar=${db.escape(
          filePath
        )} where id_transaksi_master_produk=1;`;
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

  checkout: async (req, res, next) => {
    // Data from client
    const data = {
      ...req.query,
      ...req.body,
    };

    // query to inject
    const addQuery = "INSERT INTO app_transaksi_master_produk SET ?";

    // Pass into model
    checkoutMdl(res, addQuery, data);
  },

  seeOnGoingMyTransaction: async (req, res, next) => {
    // Query to inject
    const getQuery = `SELECT ?? FROM 
    app_transaksi_master_produk
		  JOIN app_metode_pembayaran 
			  ON app_transaksi_master_produk.id_metode_pembayaran = app_metode_pembayaran.id_metode_pembayaran
		  JOIN app_metode_pengiriman
			  ON app_transaksi_master_produk.id_metode_pengiriman = app_metode_pengiriman.id_metode_pengiriman
	  WHERE id_transaksi_master_produk = ?
    `;

    // Pass into model
    seeOnGoingTransactionMdl(res, getQuery, req.params.id);
  },
  generatedOngkir: async (req, res, next) => {
    // Data from client
    const { origin, destination, weight, courier } = req.body;
    console.log(origin, destination, weight, courier);

    // req generated ongkir to RajaOngkir API
    const data = await RajaOngkirHelper.getCost(
      origin,
      destination,
      weight,
      courier
    );

    // Pass into model
    generatedOngkirMdl(res, data);
  },
  getShippingMethod: (req, res, next) => {
    const getQuery = "SELECT * FROM app_metode_pengiriman";

    getShippingMethodMdl(res, getQuery, next);
  },
  getPaymentMethods: (req, res, next) => {
    const getQuery = `SELECT ?? FROM app_metode_pembayaran JOIN app_category_metode_pembayaran ON app_category_metode_pembayaran.id_category_metode_pembayaran = app_metode_pembayaran.id_category_metode_pembayaran;`;

    getPaymentMethodMdl(res, getQuery, next);
  },
};
