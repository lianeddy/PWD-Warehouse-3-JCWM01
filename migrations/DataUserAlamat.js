const {
  SysUser,
  SysAuthorization,
  AppDataAlamatUser,
  AppKabKota,
  AppPropinsi,
} = require("../database/table");
const Crypto = require("crypto");
const { RandomHelper, Faker } = require("../helpers");
const cliProgress = require("cli-progress");

const generatorDataHandler = (tmpPassword, jml_data = 200) => {
  let output = [];
  for (let index = 0; index < jml_data; index++) {
    output.push({
      username: Faker.name.findName(),
      email: Faker.internet.email(),
      password: tmpPassword[RandomHelper.generateValueBy(3)],
      is_valid: 0,
    });
  }
  return output;
};

const main = async () => {
  const bar1 = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );

  console.log(`[1] Migration Data Alamat User`);
  let dataUser = await SysUser.query();
  let valProgress = 0;
  bar1.start(dataUser.length, 0);

  for (const key in dataUser) {
    let nm_propinsi = Faker.address.state();
    let dataPropinsi = await AppPropinsi.query()
      .withGraphFetched("datakabkota")
      .where("nm_propinsi", "LIKE", `%${nm_propinsi}%`);
    if (dataPropinsi.length !== 0) {
      const { id_propinsi, datakabkota } = dataPropinsi[0];
      const idRandom = RandomHelper.generateValueBy(datakabkota.length);
      const id_kabkota =
        datakabkota.length !== 0 ? datakabkota[idRandom].id_kabkota : 0;
      // console.table(datakabkota[0]);

      try {
        const { id_user } = dataUser[key];
        let out = await AppDataAlamatUser.query().insert({
          id_user,
          id_propinsi,
          id_kabkota,
          nm_data_alamat_user: nm_propinsi,
          contact_data_alamat_user: Faker.phone.phoneNumber(),
          address_data_alamat_user: `${nm_propinsi} - ${id_kabkota}`,
        });
      } catch (error) {
        throw error;
      }
      valProgress += 1;
      bar1.update(valProgress);
    }
  }
  bar1.stop();
  process.exit();
};

main();
