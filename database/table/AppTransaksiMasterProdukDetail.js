const AppTransaksiMasterProduk = require("./AppTransaksiMasterProduk");
const AppWarehouse = require("./AppWarehouse");
const AppMasterProduk = require("./AppMasterProduk");
const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class AppTransaksiMasterProdukDetail extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "app_detail_transaksi_master_produk";
  }

  static get relationMappings() {
    return {
      data_warehouse: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppWarehouse,
        join: {
          from: "app_detail_transaksi_master_produk.id_warehouse",
          to: "app_warehouse.id_warehouse",
        },
      },
      data_master_produk: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppMasterProduk,
        join: {
          from: "app_detail_transaksi_master_produk.id_master_barang",
          to: "app_master_produk.id_master_produk",
        },
      },
      data_transaksi_master_produk: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppTransaksiMasterProduk,
        join: {
          from: "app_detail_transaksi_master_produk.id_transaksi_master_produk",
          to: "app_master_produk.id_transaksi_master_produk",
        },
      },
    };
  }
}

module.exports = AppTransaksiMasterProdukDetail;
