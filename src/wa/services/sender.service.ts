import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SenderService {
  constructor(private readonly http: HttpService) {}
  private sendTemplate() {
    var data = JSON.stringify({
      messaging_product: 'whatsapp',
      to: '201116273717',
      type: 'template',
      template: {
        name: 'hello_world',
        language: {
          code: 'en_US',
        },
      },
    });
    this.http.post('', data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private sendNestMessage() {
    let data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: '201116273717',
      type: 'text',
      text: {
        // the text object
        preview_url: false,
        body: 'MESSAGE_CONTENT',
      },
    };
    this.http.post('', data).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(JSON.stringify(err, null, 2));
      },
    );
  }
}
