const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

async function otpUtils(to, subject, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "ad3sh.advik@gmail.com",
      pass: process.env.MAIL_PASS,
    },
  });
  
  const info = await transporter.sendMail({
    from: '"Adesh" <ad3sh.advik@gmail.com>',
    to: to,
    subject: subject,
    html: `<span>Your OTP for <b>Party</b> App: <b>${otp}</b> </span>`,
  });

  return info.messageId;
}

module.exports = otpUtils; 
