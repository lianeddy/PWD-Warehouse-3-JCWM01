const axios = require("axios");
const config = require("dotenv").config();

let AxiosConfig = {
  method: "get",
  headers: {
    key: process.env.RAJA_ONGKIR_TOKEN,
  },
};

module.exports = {
  /**
   * name: getPropinsi
   * desc:
   * Mengambil data Propinsi dari Raja Ongkir API
   * @param  {int} id_propinsi=null
   */
  getPropinsi: (id_propinsi = null) => {
    let url = "https://api.rajaongkir.com/starter/province";
    if (id_propinsi != null) url += `?id=${id_propinsi}`;

    AxiosConfig = {
      ...AxiosConfig,
      url,
    };

    return axios(AxiosConfig).catch((error) => {
      throw error;
    });
  },

  /**
   * name: getKabkota
   * desc:
   * Mengambil data kabupaten dan kota dari Raja Ongkir API
   * @param  {int} id_propinsi=null
   * @param  {int} id_kabkota=null
   */
  getKabkota: (id_propinsi = null, id_kabkota = null) => {
    let url = "https://api.rajaongkir.com/starter/city";
    if (id_kabkota != null) url += `?id=${id_kabkota}`;
    if (id_propinsi != null) url += `&province=${id_propinsi}`;

    AxiosConfig = {
      ...AxiosConfig,
      url,
    };

    return axios(AxiosConfig).catch((error) => {
      throw error;
    });
  },

  /**
   * name: getCost
   * desc:
   * Mengambil data biyaya pengiriman dari Raja Ongkir API
   * @param  {int} origin
   * @param  {int} destination
   * @param  {int} weight
   * @param  {string} courier
   */
  getCost: (origin, destination, weight, courier) => {
    let url = "https://api.rajaongkir.com/starter/cost?";
    url += `origin=${origin}`;
    url += `destination=${destination}`;
    url += `weight=${weight}`;
    url += `courier=${courier}`;

    AxiosConfig = {
      ...AxiosConfig,
      url,
    };

    return axios(AxiosConfig).catch((error) => {
      throw error;
    });
  },
};
