const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class AppDataAlamatUser extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "app_data_alamat_user";
  }
}

module.exports = AppDataAlamatUser;
