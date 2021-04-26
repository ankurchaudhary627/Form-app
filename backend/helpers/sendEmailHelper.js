const nodemailer = require('nodemailer');
const { USER_NAME, SERVICE, SUBJECT_TEMPLATE } = require('../utils/Constants');

const sendEmail = (name, toEmail) => {
  const transporter = nodemailer.createTransport({
    service: SERVICE,
    auth: {
      type: "OAuth2",
      user: USER_NAME,
      clientId: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      refreshToken: `${process.env.REFRESH_TOKEN}`
    }
  });

  var mailOptions = {
    from: USER_NAME,
    to: toEmail,
    subject: `${SUBJECT_TEMPLATE} - ${name}`,
    text: `Hi ${name}, your responses are saved!`
  };

  transporter.sendMail(mailOptions)
    .then((info) => {
      console.log(`Email sent ${info.response}`);
    })
    .catch((err) => console.log(`Error in sending email ${err}`));
};

module.exports = sendEmail;