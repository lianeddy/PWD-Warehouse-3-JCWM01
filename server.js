const AppPropinsi = require("./database/table/AppPropinsi");

let main = async () => {
  let output = await AppPropinsi.query().insert({
    nm_propinsi: "Mantap Jiwa",
  });
  output = await AppPropinsi.query().select("*");
  console.table(output);
  process.exit();
};

main();
