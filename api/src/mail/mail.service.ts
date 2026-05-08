import {Injectable} from '@nestjs/common';
import { repl } from '@nestjs/core';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter;
    constructor() {
        // 使用 resend 的 SMTP 的传输器
        this.transporter = nodemailer.createTransport({
            host: 'smtp.resend.com',
            port: 587,
            secure: false, // 使用 STARTTLS
            auth: {
                user: process.env.RESEND_SMTP_USER, // 从环境变量获取 SMTP 用户名
                pass: process.env.RESEND_SMTP_PASSWORD, // 从环境变量获取 SMTP 密码
            },
        });
    }

    async sendContact(name: string, email: string, message: string) {
    await this.transporter.sendMail({
      from: 'Contact Form <noreply@jerryguo.me>',
      to: 'jerryguo1020@outlook.com',    // 你的收件箱
      replyTo: email,                // 用户邮箱，方便你直接回复
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