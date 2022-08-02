import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateGeneratorService {
  constructor() {}

  generateOtpTemplate(mobileNumber: string, otp: string) {
    return {
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
  }

  generateMarketingTemplate(
    mobileNumber: string,
    productName: string,
    imageUrl: string,
  ) {
    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: mobileNumber,
      type: 'template',
      template: {
        name: 'marketing',
        language: {
          code: 'en_US',
        },
        components: [
          {
            type: 'header',
            parameters: [
              {
                type: 'image',
                image: {
                  link: imageUrl,
                },
              },
            ],
          },
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: productName,
              },
            ],
          },
        ],
      },
    };
  }

  generateDemoTemplate(mobileNumber: string) {
    return {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: mobileNumber,
      type: 'template',
      template: {
        name: 'demo',
        language: {
          code: 'ar',
        },
      },
    };
  }
}
