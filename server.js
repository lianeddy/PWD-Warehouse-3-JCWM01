const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");

const port = 3300;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bearerToken());

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

const { userRouters } = require("./routers");

app.use("/users", userRouters);

app.listen(port, () => console.log(`API Running: ${port}`));
