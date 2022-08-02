import { Body, Controller, Post } from '@nestjs/common';
import { AudioMessageDto } from '../model/dtos/audio-message.dto';
import { ImageMessageDto } from '../model/dtos/image-message.dto';
import { MarketingTemplateDto } from '../model/dtos/template/marketing-message.dto';
import { OtpTemplateDto } from '../model/dtos/template/otp-messge.dto';
import { TextMessageDto } from '../model/dtos/text-message.dot';
import { SenderService } from '../services/sender.service';
import { TemplateSenderService } from '../services/template-sender.service';

@Controller('sender')
export class SenderController {
  constructor(
    private sender: SenderService,
    private template: TemplateSenderService,
  ) {}

  @Post('text')
  sendTextMessage(@Body() body: TextMessageDto) {
    return this.sender.sendTextMessage(body.mobileNumber, body.content);
  }

  @Post('image')
  sendImageMessage(@Body() body: ImageMessageDto) {
    return this.sender.sendImage(body.mobileNumber, body.fileName);
  }

  @Post('audio')
  sendAudioMessage(@Body() body: AudioMessageDto) {
    return this.sender.sendAudio(body.mobileNumber, body.fileName);
  }

  @Post('template/otp')
  sendOtpMessage(@Body() body: OtpTemplateDto) {
    return this.template.sendOTP(body.mobileNumber, body.otp);
  }

  @Post('template/marketing')
  sendMarketingMessage(@Body() body: MarketingTemplateDto) {
    return this.template.sendMarketingTemplate(
      body.mobileNumber,
      body.productName,
      body.imageUrl,
    );
  }
}
