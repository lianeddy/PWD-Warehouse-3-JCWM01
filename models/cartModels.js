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
    insertProductToCartMdl: async function (response, statement, data) {
        try {
            // Inject to sql
            const insertData = await db.query(statement, [data])
                .catch(err => {
                    throw {
                        message: 'Gagal menambahkan ke keranjang',
                        error: err,
                        status: 500
                    }
                })

            // respo
            responseMessage(response, 201, 'Berhasil menambahkan ke dalam keranjang')
        } catch (err) {
            responError(response, err.status, err)
        }







    }
}