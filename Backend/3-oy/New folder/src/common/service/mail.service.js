import nodemailer from 'nodemailer';
import {fileURLToPath} from 'url';
import getConfig from '../config/config.service.js';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: getConfig("MAIL_SSERVICE_EMAIL"),
        pass: getConfig("MAIL_SERVICE_TOKEN")
    },
});

export async function sendEmailConfirmation(toEmail, first_name, token){
    

    const mailerOptions = {
        from: getConfig("MAIL_SERVICE_EMAIL"),
        to: toEmail,
        subject: "Emailni tasdiqlash",
        template: "verify-email",
        context: {
            first_name, token
        }
    };
    try {
        await mailer.sendMail(mailerOptions);
        console.log("Email jo'natildi")
    } catch (error) {
        throw new Error("Email jo'natishda xatolik")
    }
}