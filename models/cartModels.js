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
    insertProductToCartMdl: async function (response, searchStatement, addStatement, id, data) {
        try {
            // Inject to sql: check if product in database
            const searchData = await db.query(searchStatement, id).catch(err => {
                throw {
                    message: 'Gagal menemukan produk',
                    error: err,
                    status: 500
                }
            })

            // Inject to sql: insert product
            if (searchData.length) {
                const insertData = await db.query(addStatement, [data])
                    .catch(err => {
                        throw {
                            message: 'Gagal menambahkan ke keranjang',
                            error: err,
                            status: 500
                        }
                    })

                // respon success
                responseMessage(response, 201, 'Berhasil menambahkan ke dalam keranjang')
            } else {
                throw {
                    message: "Data tidak ditemukkan",
                    status: 404,
                    succes: false
                }
            }
        } catch (err) {
            responError(response, err.status, err)
        }
    }


}