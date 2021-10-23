const AppWarehouse = require("./AppWarehouse");
const SysStatus = require("./SysStatus");
const SysUser = require("./SysUser");
const AppMasterProduk = require("./AppMasterProduk");
const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class AppPermintaanProduk extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "app_permintaan_produk";
  }

  static get relationMappings() {
    return {
      data_from_warehouse: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppWarehouse,
        join: {
          from: "app_permintaan_produk.from_warehouse",
          to: "app_warehouse.id_warehouse",
        },
      },
      data_to_warehouse: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppWarehouse,
        join: {
          from: "app_permintaan_produk.to_warehouse",
          to: "app_warehouse.id_warehouse",
        },
      },
      data_status: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: SysStatus,
        join: {
          from: "app_permintaan_produk.id_status",
          to: "sys_status.id_status",
        },
      },
      data_master_produk: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppMasterProduk,
        join: {
          from: "app_permintaan_produk.id_master_produk",
          to: "app_master_produk.id_master_produk",
        },
      },
      data_user: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: SysUser,
        join: {
          from: "app_permintaan_produk.accept_user",
          to: "sys_user.id_user",
        },
      },
    };
  }
}

module.exports = AppPermintaanProduk;
