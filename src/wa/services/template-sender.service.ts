import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateSenderService {
  constructor(private readonly http: HttpService) {}

  sendOTP(mobileNumber: string, otp: string) {
    console.log('sending otp');
    let data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
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
    console.log(data);
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
}
