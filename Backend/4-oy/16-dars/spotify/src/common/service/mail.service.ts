import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '../config/config.service';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('MAIL_SERVICE_EMAIL'),
        pass: this.configService.get('MAIL_SERVICE_TOKEN'),
      },
    });
  }

  async sendEmailConfirmation(
    toEmail: string,
    username: string,
    token: string,
  ) {
    const mailOptions = {
      from: this.configService.get('MAIL_SERVICE_EMAIL'),
      to: toEmail,
      subject: 'Emailni tasdiqlash',
      html: `
        <p>Salom, ${username}!</p>
        <p>Emailingizni tasdiqlash uchun quyidagi tugmani bosing:</p>
        <a href="http://localhost:3000/user/is_active/${token}" 
           style="display:inline-block;padding:10px 20px;background-color:#28a745;color:white;text-decoration:none;border-radius:5px;">
          Emailni Tasdiqlash
        </a>
        <p>Agar siz bu so'rovni yubormagan bo'lsangiz, bu xabarni e'tiborsiz qoldiring.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (err) {
      console.error('Error sending email', err);
      return 'Email sending failed';
    }
  }
}
