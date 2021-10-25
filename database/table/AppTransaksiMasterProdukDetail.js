const AppTransaksiMasterProduk = require("./AppTransaksiMasterProduk");
const AppMasterProduk = require("./AppMasterProduk");
const AppPersediaanProduk = require("./AppPersediaanProduk");
const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class AppTransaksiMasterProdukDetail extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "app_detail_transaksi_master_produk";
  }

  static get relationMappings() {
    return {
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
      data_persediaan_produk_single: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppPersediaanProduk,
        join: {
          from: "app_detail_transaksi_master_produk.id_master_barang",
          to: "app_persediaan_produk.id_master_produk",
        },
      },
    };
  }
}

module.exports = AppTransaksiMasterProdukDetail;
