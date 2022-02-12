// Generator nilai random dari angka 0 sampai `batasAkhir`
const generateValueBy = (batasAkhir) => Math.floor(Math.random() * batasAkhir);
const generateValueUniq = (d) => `KK-${d.valueOf() + generateValueBy(9)}`;
module.exports = {
  generateValueBy,
  generateValueUniq,
};
