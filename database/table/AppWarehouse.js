const AppPersediaanProduk = require("./AppPersediaanProduk");
const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class AppWarehouse extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "app_warehouse";
  }

  static get relationMappings() {
    return {
      data_persediaan_produk_single: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppPersediaanProduk,
        join: {
          from: "app_warehouse.id_warehouse",
          to: "app_persediaan_produk.id_warehouse",
        },
      },
    };
  }
}

module.exports = AppWarehouse;
