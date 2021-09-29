const mysql = require("mysql2");
const knex = require("knex");

const MysqlConnector = (
  user,
  password,
  database,
  host = "127.0.0.1",
  port = 3306
) => {
  return knex({
    client: "mysql2",
    connection: {
      host,
      port,
      user,
      password,
      database,
    },
  });
};

module.exports = MysqlConnector;
