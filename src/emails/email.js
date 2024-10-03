const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
const sendEmail = async (options) => {
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  // });
  const transporter = nodemailer.createTransport({
    service: "Brevo",
    auth: {
      user: process.env.BREVO_USERNAME,
      pass: process.env.BREVO_PASSWORD,
    },
  });

  //2 Define the email options
  //const html = pug.renderFile(`${__dirname}/welcome.pug`, {
  //firstName: options.name,
  // url: options.url,
  //});
  const mailOptions = {
    from: "Rami sultana <rami.sultana@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html,
    //text: `${options.message}\n\n${htmlToText.fromString(html)}`,
  };
  await transporter.sendMail(mailOptions);
};
const sendWelcomeEmail = (email, name, url) => {
  sendEmail({
    email,
    subject: "thanks for joining ",
    message: ` welcome to the app, ${name} please click on ${url} to activate your account then you can log in `,
    url,
    name,
  });
  // sendEmail({
  //   email,
  //   subject: "thanks for joining ",
  //   message: ` welcome to the app, ${name} please click on ${url} to activate your account then you can log in `,
  // });
};
//options obj is email,subject,message, so if i add url,name the options obj become options{emil,subject,message,name,url}
//the second sendEmail is what determined the look of the object
module.exports = sendWelcomeEmail;
