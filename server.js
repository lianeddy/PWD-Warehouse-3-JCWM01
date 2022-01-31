const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

const logger = require("./utils/logger");
const { error } = require("./utils/logger");

const httpLogger = require("./utils/httpLogger");
const { logError, returnError } = require("./utils/errorHandler");

const port = 3300;
const app = express();

app.use(httpLogger);
app.use(cors());
app.use(express.json());
app.use(bearerToken());

app.use(express.static("public"));

const {
  userRouters,
  UtilityRouters,
  AppPermintaanProdukRouter,
  AppHistoryPersediaanProdukRouter,
  productRouters,
  uploadProductRouter,
  TransactionsRouters,
  AppPersediaanProdukRouter,
  AppTransaksiProdukRouter,
  cartRouters,
} = require("./routers");

app.use("/users", userRouters);
app.use("/permintaan-produk", AppPermintaanProdukRouter);
app.use("/history-persediaan-produk", AppHistoryPersediaanProdukRouter);
app.use("/products", productRouters);
app.use("/upload", uploadProductRouter);
app.use("/utility", UtilityRouters);
app.use("/transactions", TransactionsRouters);
app.use("/persediaan-produk", AppPersediaanProdukRouter);
app.use("/history-transaksi-produk", AppTransaksiProdukRouter);
app.use("/cart", cartRouters);

// if the Promise is rejected this will catch it
process.on("unhandledRejection", (error) => {
  throw error;
});

process.on("uncaughtException", (error) => {
  logError(error);

  if (!isOperationalError(error)) {
    process.exit(1);
  }
});

app.use(logError);
app.use(returnError);

app.listen(port, () => console.log(`API Running: ${port}`));
