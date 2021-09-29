const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class AppPropinsi extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "app_propinsi";
  }
}

module.exports = AppPropinsi;
