import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('contact')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post()
    async sendContact(@Body() body: {name: string, email: string, message: string} ) {
        await this.mailService.sendContact(body.name, body.email, body.message);
        return { success: true, message: '发送成功' };       
    }
}