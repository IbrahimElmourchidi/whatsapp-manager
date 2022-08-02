import { Controller, Post } from '@nestjs/common';
import { SenderService } from '../services/sender.service';
import { TemplateSenderService } from '../services/template-sender.service';

@Controller('sender')
export class SenderController {
  constructor(
    private sender: SenderService,
    private template: TemplateSenderService,
  ) {}

  @Post('text')
  sendTextMessage() {}
}
