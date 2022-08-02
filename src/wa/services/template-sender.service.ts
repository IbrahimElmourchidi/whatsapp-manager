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
    this.http.post('messages', data).subscribe(
      (res) => {
        console.log(`otp template sent: `, res.data);
      },
      (err) => {
        // console.log(JSON.stringify(err, null, 2));
        console.log(JSON.stringify(err, null, 2));
      },
    );
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

    this.http.post('messages', data).subscribe(
      (res) => {
        console.log(`marketing template sent: `, res.data);
      },
      (err) => {
        // console.log(JSON.stringify(err, null, 2));
        console.log(JSON.stringify(err, null, 2));
      },
    );
  }

  sendDemoTemplate(mobileNumber) {
    let data = this.templateGenerator.generateDemoTemplate(mobileNumber);
    this.http.post('messages', data).subscribe(
      (res) => {
        console.log(`marketing template sent: `, res.data);
      },
      (err) => {
        // console.log(JSON.stringify(err, null, 2));
        console.log(JSON.stringify(err, null, 2));
      },
    );
  }
}
