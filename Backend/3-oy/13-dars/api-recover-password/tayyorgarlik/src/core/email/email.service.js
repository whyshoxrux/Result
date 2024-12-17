import nodemailer from 'nodemailer'
import {fileURLToPath} from 'url'
import getConfig from '../../common/config/config.service.js';
import { log } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: getConfig("SENDER_EMAIL"),
        pass: getConfig("NODE_GMAIL_PASSWORD"),
    },
})

export async function sendEmail(req, res){
    const toEmail = req.body.email;
    const nodemailerHandlebarsOptions = {
        extName: ".handlebars",
        viewPath: path.join(__dirname, "../..", "views"),
        viewEngine: {
            extName: ".handlebars",
            defaultLayout: false,
            partialsDir: path.join(__dirname, "../..", views),

        },
    };
    mailer.use("compile", hbs(nodemailerHandlebarsOptions));
    console.log(toEmail);

    const token = jwt.sign({email: toEmail}, getConfig("JWT_ACCCES_SECRET"), {
        expiresIn: "10m",
    })
    
    const mailOptions = {
        from: getConfig("SENDER_EMAIL"),
        to: toEmail,
        subject: "Parolni tiklash",
        template: "recover_password",
        context: {
            toEmail,
            resetLink: `http://localhost:4000/user/recover-password/${token}`,
        },
    };

    try{
        const result = await mailer.sendMail(mailOptions);
        console.log("Email jonatildi", result.response);
        res.send("emailga xabar jonatildi");
    } catch(err){
        console.log("email jonatishda xatolik: ", err.message);
        
    }
}