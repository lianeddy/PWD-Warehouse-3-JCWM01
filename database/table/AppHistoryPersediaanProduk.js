const AppWarehouse = require("./AppWarehouse");
const AppMasterProduk = require("./AppMasterProduk");
const SysUser = require("./SysUser");
const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class AppHistoryPersediaanProduk extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "app_history_persediaan_produk";
  }

  static get relationMappings() {
    return {
      data_warehouse: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppWarehouse,
        join: {
          from: "app_history_persediaan_produk.id_warehouse",
          to: "app_warehouse.id_warehouse",
        },
      },
      data_master_produk: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppMasterProduk,
        join: {
          from: "app_history_persediaan_produk.id_master_produk",
          to: "app_master_produk.id_master_produk",
        },
      },
      data_user: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: SysUser,
        join: {
          from: "app_history_persediaan_produk.id_user",
          to: "sys_user.id_user",
        },
      },
    };
  }
}

module.exports = AppHistoryPersediaanProduk;
