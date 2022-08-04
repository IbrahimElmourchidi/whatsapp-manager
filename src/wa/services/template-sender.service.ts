import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { TemplateGeneratorService } from './template-generator.service';

@Injectable()
export class TemplateSenderService {
  constructor(
    private readonly http: HttpService,
    private templateGenerator: TemplateGeneratorService,
  ) {}

  sendOTP(mobileNumber: string, otp: string) {
    let data = this.templateGenerator.generateOtpTemplate(mobileNumber, otp);
    this.sendTemplate(data);
  }

  sendMarketingTemplate(
    mobileNumber: string,
    productName: string,
    imageUrl: string,
  ) {
    let data = this.templateGenerator.generateMarketingTemplate(
      mobileNumber,
      productName,
      imageUrl,
    );

    this.sendTemplate(data);
  }

  sendDemoTemplate(mobileNumber) {
    let data = this.templateGenerator.generateDemoTemplate(mobileNumber);
    this.sendTemplate(data);
  }

  sendBotWelcomeTemplate(mobileNumber: string, language: string) {
    let data = this.templateGenerator.generateBotWelcomTemplate(
      mobileNumber,
      language,
    );
    this.sendTemplate(data);
  }

  sendTemplate(data: any) {
    this.http.post('messages', data).subscribe(
      (res) => {},
      (err) => {
        console.log(JSON.stringify(err, null, 2));
        // console.log('err');
      },
    );
  }
}
