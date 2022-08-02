import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SenderController } from './controllers/sender-controller';
import { UploadFileController } from './controllers/upload-file.controller';
import { WebhookController } from './controllers/webhook.controller';
import { MessageGeneratorService } from './services/message-generator.service';
import { SenderService } from './services/sender.service';
import { TemplateGeneratorService } from './services/template-generator.service';
import { TemplateSenderService } from './services/template-sender.service';
import { WebhookService } from './services/webhook.service';

@Module({
  controllers: [WebhookController, SenderController, UploadFileController],
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.get('FB_TOKEN')}`,
        },
        baseURL: 'https://graph.facebook.com/v13.0/100230876128607/',
      }),
    }),
  ],
  providers: [
    WebhookService,
    SenderService,
    MessageGeneratorService,
    TemplateSenderService,
    TemplateGeneratorService,
  ],
})
export class WaModule {}
