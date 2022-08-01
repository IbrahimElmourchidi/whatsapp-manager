import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhookService {
  constructor() {}

  handleNewMessage() {}

  generateTextMessage(phone_number: string, content: string) {
    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone_number,
      type: 'text',
      text: {
        preview_url: false,
        body: content,
      },
    };
  }
}
