const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class AppKabKota extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "app_kabkota";
  }
}

module.exports = AppKabKota;
