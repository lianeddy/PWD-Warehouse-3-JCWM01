const AppHistoryPersediaanProduk = require("./AppHistoryPersediaanProduk");
const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class AppMasterProduk extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "app_master_produk";
  }

  static get relationMappings() {
    return {
      data_history_produk: {
        relation: ProjectAkhirPurwadhika.HasManyRelation,
        modelClass: AppHistoryPersediaanProduk,
        join: {
          from: "app_master_produk.id_master_produk",
          to: "app_history_persediaan_produk.id_master_produk",
        },
      },
    };
  }
}

module.exports = AppMasterProduk;
