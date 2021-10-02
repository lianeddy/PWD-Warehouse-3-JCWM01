const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class SysUser extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "sys_user";
  }
}

module.exports = SysUser;
