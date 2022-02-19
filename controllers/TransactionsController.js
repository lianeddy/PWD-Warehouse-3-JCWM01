const {
  db,
  createToken,
  RajaOngkirHelper,
  generateValueUniq,
} = require("../helpers/index");
const { StorageHelper } = require("../helpers");
const fs = require("fs");

const {
  checkoutMdl,
  seeOnGoingTransactionMdl,
  generatedOngkirMdl,
  getShippingMethodMdl,
  getPaymentMethodMdl,
  getMinCostShippingMdl,
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
        let sqlInsert = `Update app_transaksi_master_produk set updated_at=now(), is_bayar=1 , bukti_bayar=${db.escape(
          filePath
        )} where id_transaksi_master_produk=${db.escape(
          req.query.id_transaksi_master_produk
        )} AND id_user=${db.escape(req.query.id_user)};`;
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
    const d = new Date();
    const invoice_code = generateValueUniq(d);

    const dataCheckout = { ...req.query, invoice_code };

    // query to inject
    const updateCartQuery = `UPDATE app_carts_produk SET is_checkout = 1 WHERE id_user = ?`;
    const addCheckoutQuery = "INSERT INTO app_transaksi_master_produk SET ?";
    const addDetailTransactionsQuery = `INSERT INTO app_detail_transaksi_master_produk SET ?`;

    // Pass into model
    checkoutMdl(
      res,
      updateCartQuery,
      addCheckoutQuery,
      addDetailTransactionsQuery,
      dataCheckout,
      req.body,
      req.query.id_user
    );
  },

  seeOnGoingMyTransaction: async (req, res, next) => {
    // Query to inject
    const getTransactions = `SELECT ?? FROM 
    app_transaksi_master_produk
		  JOIN app_metode_pembayaran 
			  ON app_transaksi_master_produk.id_metode_pembayaran = app_metode_pembayaran.id_metode_pembayaran
		  JOIN app_metode_pengiriman
			  ON app_transaksi_master_produk.id_metode_pengiriman = app_metode_pengiriman.id_metode_pengiriman
	  WHERE id_user = ?
    `;

    const getDetailTransactions = `SELECT ?? FROM 
    app_detail_transaksi_master_produk
      JOIN app_master_produk 
        ON app_detail_transaksi_master_produk.id_master_barang = app_master_produk.id_master_produk
      WHERE id_transaksi_master_produk = ?`;

    // Pass into model
    seeOnGoingTransactionMdl(
      res,
      getTransactions,
      getDetailTransactions,
      req.params.id,
      next
    );
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
  getMinCostShipping: (req, res, next) => {
    const getDefaultAdressQuery = `SELECT id_kabkota FROM app_data_alamat_user WHERE id_user = ? AND is_default = 1;`;
    const getIdKabKotaWhQuery = `SELECT nm_warehouse, id_kabkota FROM app_warehouse;`;
    const getIdWarehouseQuery = `SELECT id_warehouse FROM app_warehouse WHERE id_kabkota = ?;`;
    getMinCostShippingMdl(
      res,
      getDefaultAdressQuery,
      getIdKabKotaWhQuery,
      getIdWarehouseQuery,
      req.query.id_user,
      req.query.courier,
      next
    );
  },
};
