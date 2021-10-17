const AppWarehouse = require("./AppWarehouse");
const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class AppHistoryPersediaanProduk extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "app_history_persediaan_produk";
  }

  static get relationMappings() {
    return {
      // datawarehouse: {
      //   relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
      //   modelClass: AppWarehouse,
      //   join: {
      //     from: "app_history_persediaan_produk.id_warehouse",
      //     to: "app_warehouse.id_warehouse",
      //   },
      // },
    };
  }
}

module.exports = AppHistoryPersediaanProduk;
