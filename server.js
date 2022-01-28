const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

const port = 3300;
const app = express();

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

app.listen(port, () => console.log(`API Running: ${port}`));
