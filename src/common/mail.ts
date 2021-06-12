import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAILID,
    pass: process.env.EMAILPASS,
  },
});

export function sendMail(subject: string, text: string, to: string) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.EMAILID,
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
