const { SysUser, SysAuthorization } = require("../database/table");
const Crypto = require("crypto");
const { RandomHelper, Faker } = require("../helpers");

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
  let tmpPassword = ["Mantap Jiwa", "Sayang Ibu", "Doa Ibu"];
  tmpPassword = tmpPassword.map((el) =>
    Crypto.createHmac("sha256", "hash123").update(el).digest("hex")
  );
  let generateData = generatorDataHandler(tmpPassword);

  // console.table(generateData);
  console.log(`[1] Migration Data User`);
  for (const key in generateData) {
    try {
      let output = await SysUser.query().insert(generateData[key]);
    } catch (error) {
      throw error;
    }
  }

  console.log(`[2] Migration Data Authorization`);
  let dataUser = await SysUser.query();
  for (const key in dataUser) {
    try {
      const { id_user } = dataUser[key];
      await SysAuthorization.query().insert({
        id_user,
        id_role: RandomHelper.generateValueBy(3) + 1,
        create_user: 9999, // ID SYSTEM
      });
    } catch (error) {
      throw error;
    }
  }
  process.exit();
};

main();
