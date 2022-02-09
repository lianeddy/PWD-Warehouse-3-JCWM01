const axios = require("axios");
const request = require("request");
const config = require("dotenv").config();

let AxiosConfig = {
  method: "get",
  headers: {
    key: process.env.RAJA_ONGKIR_TOKEN,
  },
};

// Config default axios RajaOngkir
axios.defaults.baseURL = "https://api.rajaongkir.com/starter";
axios.defaults.headers.common["key"] = process.env.RAJA_ONGKIR_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

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
  // getCost: (origin, destination, weight, courier) => {
  //   let url = "https://api.rajaongkir.com/starter/cost?";
  //   url += `origin=${origin}`;
  //   url += `?destination=${destination}`;
  //   url += `?weight=${weight}`;
  //   url += `?courier=${courier}`;

  //   AxiosConfig = {
  //     ...AxiosConfig,
  //     url,
  //   };

  //   console.log(AxiosConfig);
  //   return axios(AxiosConfig).catch((error) => {
  //     throw error;
  //   });
  // },

  getCost: async (origin, destination, weight, courier) => {
    try {
      // request to Raja Ongkir API
      const res = await axios.post("/cost", {
        origin,
        destination,
        weight,
        courier,
      });

      if (res.data.rajaongkir.status.code === 400) {
        throw new Error("Data not found");
      }

      return res.data.rajaongkir;
    } catch (err) {
      console.error(err.message);
    }
  },
};
