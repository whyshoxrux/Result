import { getconfig } from "../config/config.service.js";
import nodemailer from "nodemailer";
const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: getconfig("SENDER_EMAIL"),
    pass: getconfig("NODE_GMAIL_PASSWORD"),
  },
});

const mailOptions = {
  from: getconfig(`SENDER_EMAIL`),
  to: "tohirovshohruxbek@gmail.com",
  subject: "Test habar",
  html: `  
        <html>  
            <body>  
                <p>Hello, please click the link below:</p>  
                <a href="https://www.bing.com/ck/a?!&&p=137c54a67a9be258f3ed4a47fcf4b3d701cfa07a858f2a3a4db2681f0999a1deJmltdHM9MTcyNDcxNjgwMCZpZ3VpZD0yZmVlMzA3OC1hNzE2LTZjMDgtMWY4MC0yNGI1YTY0MTZkYzYmaW5zaWQ9NTQ1MA&ptn=3&ver=2&hsh=4&fclid=2fee3078-a716-6c08-1f80-24b5a6416dc6&u=a1L2ltYWdlcy9zZWFyY2g_cT1naXJscytwaG90byZpZD02ODRFRkI0MDg0ODFBODFBOEIxREYxNTlERkRBMUZCQzU3Rjk4M0NGJkZPUk09SVFGUkJB&ntb=1" 
                target="_blank">Click Here</a>  
            </body>  
        </html>  
    `,
};

export async function emailJonatish() {
  try {
    console.log(getconfig("SENDER_EMAIL"));

    const result = await mailer.sendMail(mailOptions);
    console.log("SMS jonatildi");
  } catch (err) {
    console.log("Error: " + err.message);
  }
}
