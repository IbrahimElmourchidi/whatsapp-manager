import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { WebhookService } from 'src/wa/services/webhook.service';
const axios = require('axios').default;
@Controller('')
export class WebhookController {
  private secret: string;
  flag = true;

  constructor(
    private config: ConfigService,
    private webhookService: WebhookService,
  ) {
    this.secret = config.get('SECRET');
  }

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
      if (mode === 'subscribe' && token === this.secret) {
        console.log('webhook verified');
        return res.status(200).send(challenge);
      }
    }
    return res.status(403);
  }

  @Post('webhook')
  listenToMessage(@Body() body) {
    console.log(JSON.stringify(body, null, 2));
  }
}
