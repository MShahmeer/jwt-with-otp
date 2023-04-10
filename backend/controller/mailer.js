import nodemailer from "nodemailer";
import Mailgen from "mailgen";

import ENV from "../config.js";
// https://ethereal.email./create

let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: ENV.EMAIL, // generated ethereal user
    pass: ENV.PASSWORD, // generated ethereal password
  },
};

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "Mailgen",
    link: "https://mailgen.js/",
  },
});

// POST: http://localhost:8080/api/registerMail
// {
//     "userName": "",
//     "email": "",
//     "text": "",
//     "subject": "",
// }
export const registerMail = async (req, res) => {
  const { userName, email, text, subject } = req.body;
  var emailTemplate = {
    body: {
      name: userName,
      intro: text || "Welcome to sysvoy international",
      outro: "Need any help? Reply to this email ",
    },
  };
  var emailBody = MailGenerator.generate(emailTemplate);
  let message = {
    from: ENV.EMAIL,
    to: email,
    subject: subject || "Signup Successful",
    html: emailBody,
  };

  //send mail
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).send({ msg: "You will recieve an email from us" });
    })
    .catch((error) => res.status(500).send({ error }));
};
