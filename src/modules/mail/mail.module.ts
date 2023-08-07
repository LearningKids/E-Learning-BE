import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  MailerOptions,
  MailerOptionsFactory,
  MailerModule,
} from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { EmailService } from './mail.service';

class MailerConfig implements MailerOptionsFactory {
  async createMailerOptions(): Promise<MailerOptions> {
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URL = process.env.REDIRECT_URL;
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
    const EmailSender = process.env.MAIL_FROM;
    const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL,
    );
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const accessToken = await oauth2Client.getAccessToken();

    return {
      transport: {
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: EmailSender,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
      },
    };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      useClass: MailerConfig,
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
