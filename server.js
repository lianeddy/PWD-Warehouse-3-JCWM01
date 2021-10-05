// const SysUser = require("./database/table/SysUser");

// let main = async () => {
//   let output = await SysUser.query().select("*").where("id_user", 11);
//   console.log(output);
//   process.exit();
// };

// main();

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
