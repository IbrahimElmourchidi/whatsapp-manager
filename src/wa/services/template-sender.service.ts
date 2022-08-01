import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateSenderService {
  constructor(private readonly http: HttpService) {}

  sendOTP(mobileNumber: string, otp: string) {
    let data = {
      to: mobileNumber,
      type: 'template',
      template: {
        name: 'otp',
        language: {
          code: 'en_US',
        },
        components: [
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: otp,
              },
            ],
          },
        ],
      },
    };
    this.http.post('messages', data).subscribe(
      (res) => {
        console.log(`otp template sent: `, res.data);
      },
      (err) => {
        console.log(JSON.stringify(err, null, 2));
      },
    );
  }
}
