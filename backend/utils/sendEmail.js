const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  let testAccount = await nodemailer.createTestAccount();
//   console.log("testAccount", testAccount)
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const mailOptions = {
    from: "ankithakur397@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;