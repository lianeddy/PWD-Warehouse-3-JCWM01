const AppKabKota = require("./AppKabkota");
const AppPropinsi = require("./AppPropinsi");
const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class AppDataAlamatUser extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "app_data_alamat_user";
  }
  static get relationMappings() {
    return {
      datakabkota: {
        relation: ProjectAkhirPurwadhika.HasOneRelation,
        modelClass: AppKabKota,
        join: {
          from: "app_data_alamat_user.id_kabkota",
          to: "app_kabkota.id_kabkota",
        },
      },
      datapropinsi: {
        relation: ProjectAkhirPurwadhika.HasOneRelation,
        modelClass: AppPropinsi,
        join: {
          from: "app_data_alamat_user.id_propinsi",
          to: "app_propinsi.id_propinsi",
        },
      },
    };
  }
}

module.exports = AppDataAlamatUser;
