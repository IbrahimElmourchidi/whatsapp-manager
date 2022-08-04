import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebhookService } from 'src/wa/services/webhook.service';
import { RobotService } from '../services/robot.service';

const axios = require('axios').default;
@Controller('')
export class WebhookController {
  flag = true;

  constructor(
    private config: ConfigService,
    private webhookService: WebhookService,
    private robot: RobotService,
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
  ) {
    console.log('req');
    if (mode && token) {
      if (mode === 'subscribe' && token === this.config.get('SECRET')) {
        console.log('webhook verified');
        return challenge;
      }
    }
    console.log('not real');
    return new ForbiddenException();
  }

  @Post('webhook')
  listenToMessage(@Body() body) {
    const message = this.webhookService.handleNewMessage(body);
    // console.log(message);

    message.message && this.robot.initRobotWorkers(message);
  }
}
