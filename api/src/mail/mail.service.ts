import {Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class MailService {
    private resend : Resend;
    constructor(private configService: ConfigService) {
        // 使用 resend 的 SMTP 的传输器
        this.resend = new Resend(this.configService.get('RESEND_API_KEY'));
    }

    async sendContact(name: string, email: string, message: string) {
        await this.resend.emails.send({
            from: 'Contact Form <onboarding@jerryguo.me>',  // Resend 提供的默认发件地址
      to: 'jerryguo1020@outlook.com',
      replyTo: email,
      subject: `【留言】来自 ${name}`,
      text: `姓名：${name}\n邮箱：${email}\n内容：${message}`,
      html: `
        <h3>收到新留言</h3>
        <p><strong>姓名：</strong>${name}</p>
        <p><strong>邮箱：</strong>${email}</p>
        <p><strong>内容：</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });
  }
}
    

   