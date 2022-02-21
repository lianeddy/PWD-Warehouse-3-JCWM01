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

const forgotPasswordEmail = (email, name, token) => {
  transporter.sendMail(
    {
      from: `Admin <4dminPWDHshop@gmail.com>`,
      to: `${email}`,
      subject: `Reset Password`,
      html: `<p>Hai ${username}, you have been requested to reset your password, click link below to continue</p>
          <p><a href='http://localhost:3000/forgot-password-update/${token}'>Click here to reset password</a></p>
          <p>If it's not you, ignore this email</p>
          <p>Thanks!</p>`,
    },
    (err, info) => {
      throw new Api500Error("req forgot password failed", err);
    }
  );
};

module.exports = { transporter, verificationEmail, forgotPasswordEmail };
