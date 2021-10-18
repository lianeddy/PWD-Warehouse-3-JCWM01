const mysql = require("mysql");
const config = require("dotenv").config();

const db = mysql.createConnection({
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // database: process.env.DB_DATABASE,
  // port: process.env.DB_PORT,
  // multipleStatements: true,
  host: "localhost",
  user: "root",
  password: "password",
  database: "purwadhika_project_akhir",
  port: 3306,
  multipleStatements: true,
  // host: "localhost",
  // user: "root",
  // password: "Kusuma112*",
  // database: "purwadhika_project_akhir",
  // port: 3306,
  // multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    return console.error(`error: ${err.message}`);
  }
  console.log(`Connected to MySQL Server`);
});

module.exports = { db };
