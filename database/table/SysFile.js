const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class SysFile extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "sys_file";
  }
}

module.exports = SysFile;
