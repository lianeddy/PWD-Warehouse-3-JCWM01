'use strict'

const {
    db
} = require("../helpers");

const {
    responseData,
    responError,
    responseMessage
} = require('../utils/response-handler')

module.exports = {
    checkoutMdl : async function (response, addStatement, data) {
        try {
            // insert to database
            const insertCheckotToDatabase = await db.query(addStatement, [data])
                .catch(err => {throw {message: 'Gagal melakukan checkout', status: 500, error: err}})

            
            responseMessage(response, 201, 'Berhasil melakukan checkout')
        } catch (err) {
            responError(response, err.status, err)
        }
    },
    seeOnGoingTransactionMdl : async function (response, getStatement, id) {
        try {
            const column = [
                "invoice_code", 
                "keterangan", 
                "alamat", 
                "total_harga", 
                "is_tolak", 
                "is_bayar", 
                "is_verify", 
                "ongkos_kirim",
                "app_metode_pengiriman.nm_metode_pengiriman", 
                "app_metode_pembayaran.nm_metode_pembayaran"
            ]
            // inject to database
            const getData = await db.query(getStatement, [column, id]).catch(err => {
                throw {
                    message: 'Gagal memuat status transaksi Anda',
                    status: 500,
                    error: err
                }
            })

            if(getData.length) {
                responseData(response, 200, getData)
            } else {
                throw {
                    message: 'Transaksi Anda tidak ditemukan',
                    status: 404
                }
            }
        } catch (err) {
            responError(response, err.status, err)
        }
    }
}