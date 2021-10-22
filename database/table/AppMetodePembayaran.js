// const AppHistoryPersediaanProduk = require("./AppHistoryPersediaanProduk");
const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class AppMetodePembayaran extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "app_metode_pembayaran";
  }

  static get relationMappings() {
    return {
      // data_category_metode_pembayaran: {
      //   relation: ProjectAkhirPurwadhika.HasManyRelation,
      //   modelClass: AppHistoryPersediaanProduk,
      //   join: {
      //     from: "app_master_produk.id_master_produk",
      //     to: "app_history_persediaan_produk.id_master_produk",
      //   },
      // },
    };
  }
}

module.exports = AppMetodePembayaran;
