import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { SenderService } from 'src/wa/services/sender.service';
import { TemplateSenderService } from 'src/wa/services/template-sender.service';
import { WebhookService } from 'src/wa/services/webhook.service';
const axios = require('axios').default;
@Controller('')
export class WebhookController {
  flag = true;

  constructor(
    private config: ConfigService,
    private webhookService: WebhookService,
    private sender: SenderService,
    private template: TemplateSenderService,
  ) {}

  @Get('')
  sayWelcome() {
    return 'hello from webhook';
  }

  @Get('webhook')
  connectWebHook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response,
  ) {
    if (mode && token) {
      if (mode === 'subscribe' && token === this.config.get('SECRET')) {
        console.log('webhook verified');
        return res.status(200).send(challenge);
      }
    }
    return res.status(403);
  }

  @Post('webhook')
  listenToMessage(@Body() body) {
    this.webhookService.handleNewMessage(body);
    this.flag && this.sender.sendTemplateMessage('201116273717', 'otp');
    this.flag = false;
  }
}
