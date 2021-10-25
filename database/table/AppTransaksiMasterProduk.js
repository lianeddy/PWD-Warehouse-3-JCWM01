const AppMetodePengiriman = require("./AppMetodePengiriman");
const AppMetodePembayaran = require("./AppMetodePembayaran");
const AppTransaksiMasterProdukDetail = require("./AppTransaksiMasterProdukDetail");
const AppWarehouse = require("./AppWarehouse");
const AppDataAlamatUser = require("./AppDataAlamatUser");
const AppPermintaanProduk = require("./AppPermintaanProduk");
const SysUser = require("./SysUser");
const { ProjectAkhirPurwadhika } = require("../mysql/ProjectAkhirPurwadhika");

class AppTransaksiMasterProduk extends ProjectAkhirPurwadhika {
  static get tableName() {
    return "app_transaksi_master_produk";
  }

  static get relationMappings() {
    return {
      data_metode_pembayaran: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppMetodePembayaran,
        join: {
          from: "app_transaksi_master_produk.id_metode_pembayaran",
          to: "app_metode_pembayaran.id_metode_pembayaran",
        },
      },
      data_metode_pengiriman: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppMetodePengiriman,
        join: {
          from: "app_transaksi_master_produk.id_metode_pengiriman",
          to: "app_metode_pengiriman.id_metode_pengiriman",
        },
      },
      data_user: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: SysUser,
        join: {
          from: "app_transaksi_master_produk.id_user",
          to: "sys_user.id_user",
        },
      },
      data_detail_transaksi_master_produk: {
        relation: ProjectAkhirPurwadhika.HasManyRelation,
        modelClass: AppTransaksiMasterProdukDetail,
        join: {
          from: "app_transaksi_master_produk.id_transaksi_master_produk",
          to: "app_detail_transaksi_master_produk.id_transaksi_master_produk",
        },
      },
      data_warehouse: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppWarehouse,
        join: {
          from: "app_transaksi_master_produk.id_warehouse",
          to: "app_warehouse.id_warehouse",
        },
      },
      data_alamat_user_single: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppDataAlamatUser,
        join: {
          from: "app_transaksi_master_produk.id_user",
          to: "app_data_alamat_user.id_user",
        },
      },
      data_permintaan_produk_single: {
        relation: ProjectAkhirPurwadhika.BelongsToOneRelation,
        modelClass: AppPermintaanProduk,
        join: {
          from: "app_transaksi_master_produk.id_transaksi_master_produk",
          to: "app_permintaan_produk.id_transaksi_master_produk",
        },
      },
    };
  }
}

module.exports = AppTransaksiMasterProduk;
