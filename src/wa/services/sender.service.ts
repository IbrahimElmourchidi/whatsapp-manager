import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { MessageGeneratorService } from './message-generator.service';

@Injectable()
export class SenderService {
  constructor(
    private readonly http: HttpService,
    private readonly mg: MessageGeneratorService,
  ) {}

  sendTextMessage(mobileNumber: string, content: string) {
    let data = this.mg.generateTextMessage(mobileNumber, content);
    this.http.post('messages', data).subscribe(
      (res) => {
        console.log('message sent: ', res.data);
      },
      (err) => {
        console.log(JSON.stringify(err, null, 2));
      },
    );
  }

  sendImage(mobileNumber: string, fileName: string) {
    let data = this.mg.generateImageMessage(mobileNumber, fileName).subscribe({
      next: (data) => {
        this.http.post('messages', data).subscribe(
          (res) => {
            console.log('media sent: ', res.data);
          },
          (err) => {
            console.log(JSON.stringify(err, null, 2));
          },
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sendVideo(mobileNumber: string, fileName: string, caption: string) {
    let data = this.mg
      .generateVideoMessage(mobileNumber, fileName, caption)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.http.post('messages', data).subscribe(
            (res) => {
              console.log('media sent: ', res.data);
            },
            (err) => {
              console.log(JSON.stringify(err, null, 2));
            },
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  sendAudio(mobileNumber: string, fileName: string) {
    let data = this.mg.generateAudioMessage(mobileNumber, fileName).subscribe({
      next: (data) => {
        this.http.post('messages', data).subscribe(
          (res) => {
            console.log('media sent: ', res.data);
          },
          (err) => {
            console.log(JSON.stringify(err, null, 2));
          },
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  sendTemplateMessage(mobileNumber: string, templateName: string) {
    var data = JSON.stringify({
      messaging_product: 'whatsapp',
      to: mobileNumber,
      type: 'template',
      template: {
        name: templateName,
        language: {
          code: 'en_US',
        },
      },
    });
    this.http.post('messages', data).subscribe(
      (res) => {
        console.log(`${templateName} template sent: `, res.data);
      },
      (err) => {
        console.log(JSON.stringify(err, null, 2));
      },
    );
  }
}
