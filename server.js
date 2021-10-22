const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

const port = 3300;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bearerToken());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

const {
  userRouters,
  productRouters,
  uploadProductRouter,
  UtilityRouters,
  TransactionsRouters,
} = require("./routers");

app.use("/users", userRouters);
app.use("/products", productRouters);
app.use("/upload", uploadProductRouter);
app.use("/users", userRouters);
app.use("/utility", UtilityRouters);
app.use("/transactions", TransactionsRouters);

app.listen(port, () => console.log(`API Running: ${port}`));
