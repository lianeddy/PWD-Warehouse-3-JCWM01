const { Model } = require("objection");
const { MysqlConnector, TimeModule } = require("../../helpers");
const config = require("dotenv").config();
const objectionSoftDelete = require("objection-js-soft-delete");

let MysqlConnectorTmp = MysqlConnector(
  process.env.DB_USER, // "root",
  process.env.DB_PASS, // "sarewes23",
  process.env.DB_DATABASE, // "purwadhika_project_akhir"
  process.env.DB_HOST,
  process.env.DB_PORT
);

const softDelete = objectionSoftDelete.default({
  columnName: "deleted_at",
  deletedValue: new Date(),
  notDeletedValue: null,
});

class ProjectAkhirPurwadhika extends softDelete(Model) {
  async $beforeInsert() {
    this.created_at = TimeModule.timeNowFormatMysql();
    this.updated_at = TimeModule.timeNowFormatMysql();
  }
  async $beforeUpdate() {
    this.updated_at = TimeModule.timeNowFormatMysql();
  }
}

ProjectAkhirPurwadhika.knex(MysqlConnectorTmp);

module.exports = {
  ProjectAkhirPurwadhika,
  MysqlConnectorTmp,
};
