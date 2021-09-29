const { Model } = require("objection");
const { MysqlConnector, TimeModule } = require("../../helpers");

let MysqlConnectorTmp = MysqlConnector(
  "root",
  "sarewes23",
  "purwadhika_project_akhir"
);

class ProjectAkhirPurwadhika extends Model {
  // constructor(baseTable = "") {
  //   this.baseTable = baseTable;
  // }
  async $beforeInsert() {
    this.created_at = TimeModule.timeNowFormatMysql();
    this.updated_at = TimeModule.timeNowFormatMysql();
  }
  async $beforeUpdate() {
    this.updated_at = TimeModule.timeNowFormatMysql();
  }

  deleteDataById() {}
}

ProjectAkhirPurwadhika.knex(MysqlConnectorTmp);

module.exports = {
  ProjectAkhirPurwadhika,
  MysqlConnectorTmp,
};
