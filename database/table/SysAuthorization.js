const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class SysAuthorization extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "sys_authorization";
  }
}

module.exports = SysAuthorization;
