const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class SysStatus extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "sys_status";
  }
}

module.exports = SysStatus;
