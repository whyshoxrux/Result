import express from 'express';
import { sendMessage } from './common/service/mail.service.js';
import jwt from 'jsonwebtoken';
import getConfig from './common/config/config.service.js';
import logger from './common/service/logger.service.js';
import fs from 'fs/promises';

const app = express();
const port = 3000;

app.use(express.json());

process.on("unhandledRejection", (err) => {
    console.log("unhandledRejection error: ", err.message);
    logger.error(err.stack)
    sendErrorNotification(err);
})

process.on("uncaughtException", (err) => {
    console.log("uncaughtException error: ", err.message);
    logger.error(err.stack)
    sendErrorNotification(err);
})

async function sendErrorNotification(err) {
    try {
        await sendMessage(
            getConfig("SENDER_EMAIL"),
            "Error Notification",
            `<h2>${err.stack}</h2>`
        );
        console.log("Error notification sent to admin.");
    } catch (emailError) {
        console.log("Failed to send error notification email:", emailError.message);
    }
}

app.post('/send-email', async (req, res) => {
    const { to, subject, htmlContent } = req.body;
    const a = 1
    a = 2
    try {
        const accessToken = generateAccessToken({ email: to });

        const confirmationLink = `http://localhost:3000/email-acceptance?token=${accessToken}`;
        const emailContent = `
            <h2>${htmlContent}</h2>
            <a href="${confirmationLink}">Emailni tasdiqlash</a>
        `;

        const result = await sendMessage(to, subject, emailContent);
        res.status(200).json({ message: "Email successfully sent", accessToken, result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to send email", error: error.message });
    }
});

app.get('/email-acceptance', async (req, res) => {
    // const { token } = req.query;

    try {
        // const decoded = jwt.verify(token, getConfig("JWT_ACCESS_SECRET"));
        // const email = decoded.email;

        // const result = await sendMessage(email, "Email Accepted", "<h2>Your email has been accepted!</h2>");

        res.status(200).send("<h2>Your email has been accepted!</h2>");
    } catch (error) {
        console.log(error);
        res.status(500).send("<h2>Failed to confirm your email.</h2>");
    }
});

app.get('/errors', async (req, res) => {
    try {
        const errors = await fs.readFile('error.logs', 'utf-8');
        res.status(200).send(errors);
    } catch (err) {
        console.log("Error while reading error logs: ", err);
        res.status(500).send("<h2>Error while getting errors</h2>");
    }
});

function generateAccessToken(data) {
  return jwt.sign(data, getConfig("JWT_ACCESS_SECRET"), { expiresIn: "3m" });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
