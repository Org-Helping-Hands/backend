import nodemailer from "nodemailer";
const smtp = require("nodemailer-smtp-transport");
var transporter = nodemailer.createTransport(
  smtp({
    host: "in.mailjet.com",
    port: 2525,
    auth: {
      user: process.env.MAILJET_USER,
      pass: process.env.MAILJET_PASSWORD,
    },
  })
);

export function sendMail(subject: string, text: string, to: string) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: "helpinghands163a@gmail.com",
        to,
        subject,
        text,
      },
      (err, info) => {
        if (!err) {
          resolve(info);
        } else reject(err);
      }
    );
  });
}
