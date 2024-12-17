import nodemailer from "nodemailer";
import { getconfig } from "../config/config.service.js";

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: getconfig("SENDER_EMAIL"),
    pass: getconfig("NODE_GMAIL_PASSWORD"),
  },
});

export async function sendMessage(to, subject, htmlContent) {
  const mailOptions = {
    from: getconfig("SENDER_EMAIL"),
    to,
    subject,
    html: htmlContent,
  };

  try {
    const result = await mailer.sendMail(mailOptions);
    console.log("Email jo'natildi");
    return result;
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
}
