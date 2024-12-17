import nodemailer from "nodemailer";
import getConfig from "../config/config.service.js";
import { fileURLToPath } from "url";
import path from "path";
import hbs from "nodemailer-express-handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: getConfig("MAIL_SERVICE_EMAIL"),
    pass: getConfig("MAIL_SERVICE_TOKEN"),
  },
});

export async function sendEmailConfirmation(toEmail, first_name, token) {
  const handlebarsExpressOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.join(__dirname, "../..", "views"), // Shablonlar qayerda
      defaultLayout: false,
    },
    viewPath: path.join(__dirname, "../..", "views"), // Qaysi papkadan shablon olish
    extName: ".handlebars",
  };
  mailer.use("compile", hbs(handlebarsExpressOptions));

  const mailerOptions = {
    from: getConfig("MAIL_SERVICE_EMAIL"),
    to: toEmail,
    subject: "Emailni tasdiqlash",
    template: "verify-email",
    context: {
      first_name,
      token,
    },
  };
  try {
    await mailer.sendMail(mailerOptions);
    console.log("Email jonatildi");
  } catch (err) {
    throw new Error("Email jonatishda hatolik boldi");
  }
}
