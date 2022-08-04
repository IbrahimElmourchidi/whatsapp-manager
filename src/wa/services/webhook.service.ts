import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhookService {
  constructor() {}

  handleNewMessage(body: any) {
    if (body.entry && body.entry[0].changes && body.entry[0].changes[0]) {
      if (
        body.entry[0].changes[0].value.messages &&
        body.entry[0].changes[0].value.messages[0]
      ) {
        let message = body.entry[0].changes[0].value.messages[0];
        return { message };
      } else if (
        body.entry[0].changes[0].value.statuses &&
        body.entry[0].changes[0].value.statuses[0]
      ) {
        let status = body.entry[0].changes[0].value.statuses[0];
        return { status };
      }
    }
  }

  getMessageInfo(data) {
    let msg_body = '';
    let phone_number = data.metadata.phone_number_id;
    let from = data.messages[0].from;
    let msg_type = data.messages[0].type;
    if (msg_type == 'text') msg_body = data.messages[0].text.body;
    else console.log(msg_type);

    return {
      phone_number,
      from,
      msg_body,
      msg_type,
    };
  }
}
