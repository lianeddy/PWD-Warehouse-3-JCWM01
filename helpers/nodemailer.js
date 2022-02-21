const nodemailer = require("nodemailer");
const { Api500Error } = require("../utils/Error/index");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "4dminPWDHshop@gmail.com",
    pass: "aqpqatjcthopefwp",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const verificationEmail = (email, name, token) => {
  transporter.sendMail(
    {
      from: `Admin <4dminPWDHshop@gmail.com>`,
      to: `${email}`,
      subject: `Account Verification`,
      html: `<a href='http://localhost:3000/verification/${token}'>Click here for access your account</a>`,
    },
    (err, info) => {
      throw new Api500Error("Registration failed!", err);
    }
  );
};

module.exports = { transporter, verificationEmail };
