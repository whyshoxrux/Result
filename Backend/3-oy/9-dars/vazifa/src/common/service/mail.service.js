import nodemailer from 'nodemailer';
import { getConfig } from '../config/config.service.js';

const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: getConfig("SENDER_EMAIL"),
        pass: getConfig("NODE_GMAIL_PASSWORD"),
    },
})

export async function sendMessage(to, subject, htmlContent){
    const mailOptions = {
        from: getConfig("SENDER_EMAIL"),
        to,
        subject,
        html: htmlContent
    };

    try{
        const result = await mailer.sendMail(mailOptions);
        console.log("Email jo'natildi");
        return result;
    } catch(err){
        console.log("Error", err);
        throw err
        
    }
}