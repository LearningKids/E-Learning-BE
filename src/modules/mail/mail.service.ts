import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(toUser: string, subjectMail: string, content: string) {
    try {
      await this.mailerService.sendMail({
        to: toUser,
        subject: subjectMail,
        text: content,
      });
    } catch (error) {
      throw new HttpException('Email fail', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
