import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
var fs = require('fs');
var FormData = require('form-data');
var path = require('path');
@Injectable()
export class MessageGeneratorService {
  constructor(private readonly http: HttpService) {}

  generateTextMessage(mobileNumber: string, content: string) {
    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: mobileNumber,
      type: 'text',
      text: {
        // the text object
        preview_url: true,
        body: content,
      },
    };
  }

  generateImageMessage(
    mobileNumber: string,
    fileName: string,
  ): Observable<any> {
    return this.uploadMedia(fileName).pipe(
      map((data) => {
        let imageId = data;
        return {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: mobileNumber,
          type: 'image',
          image: {
            id: imageId,
          },
        };
      }),
    );
  }

  generateAudioMessage(
    mobileNumber: string,
    fileName: string,
  ): Observable<any> {
    return this.uploadMedia(fileName).pipe(
      map((data) => {
        let audioId = data;
        return {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: mobileNumber,
          type: 'audio',
          audio: {
            id: audioId,
          },
        };
      }),
    );
  }

  generateVideoMessage(
    mobileNumber: string,
    fileName: string,
    caption: string,
  ): Observable<any> {
    return this.uploadMedia(fileName).pipe(
      map((data) => {
        let videoId = data;
        return {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: mobileNumber,
          type: 'video',
          video: {
            caption: caption,
            id: videoId,
          },
        };
      }),
    );
  }

  uploadMedia(fileName: string): Observable<any> {
    console.log('uploadMedia');
    return this.getMediaObject(fileName).pipe(
      map((res) => {
        return res.data.id;
      }),
    );
  }

  getMediaObject(fileName: string): Observable<any> {
    console.log('getMediaObject');
    let data = new FormData();
    data.append('messaging_product', 'whatsapp');
    data.append(
      'file',
      fs.createReadStream(path.join(process.cwd(), `/media/${fileName}`)),
    );
    return this.http.post('media', data);
  }
}
