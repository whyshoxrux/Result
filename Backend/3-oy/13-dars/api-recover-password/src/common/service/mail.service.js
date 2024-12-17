import nodemailer from "nodemailer";
import getConfig from "../config/config.service.js";
import { fileURLToPath } from "url";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import { kalitYasash } from "../../core/user/user.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: getConfig("SENDER_EMAIL"),
    pass: getConfig("NODE_GMAIL_PASSWORD"),
  },
});

export async function sendEmail(toEmail, name, token) {
  const nodemailerHandlebarsOptions = {
    extName: ".handlebars",
    viewPath: path.join(__dirname, "../..", "views"),
    viewEngine: {
      extName: ".handlebars",
      defaultLayout: false,
      partialsDir: path.join(__dirname, "../..", "views"),
    },
  };
  mailer.use("compile", hbs(nodemailerHandlebarsOptions));
  const mailOptions = {
    from: getConfig("SENDER_EMAIL"),
    to: toEmail,
    subject: "Parolni tiklash",
    template: "recover_password",
    context: {
      name,
      resetLink: `http://localhost:4000/user/recover-password/${token}`,
    },
  };
  try {
    const result = await mailer.sendMail(mailOptions);
    console.log("Email jonatildi", result.response);
  } catch (err) {
    console.log("email jonatishda hatolik boldi", err.message);
  }
}
const tokenn = kalitYasash({email: 'tohirovshohruxbek@gmail.com'})
sendEmail("tohirovshohruxbek@gmail.com", "Shoxrux", tokenn)