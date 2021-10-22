const AppKabKota = require("./AppKabKota");
const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class AppWarehouse extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "app_warehouse";
  }

  static get relationMappings() {
    return {
      // datakabkota: {
      //   relation: ProjectAkhirPurwadhika.HasManyRelation,
      //   modelClass: AppKabKota,
      //   join: {
      //     from: "app_propinsi.id_propinsi",
      //     to: "app_kabkota.id_propinsi",
      //   },
      // },
    };
  }
}

module.exports = AppWarehouse;
