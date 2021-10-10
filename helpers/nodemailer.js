const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "armerray@gmail.com",
    pass: "bwmxlvxduyupgoms",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
