import { Injectable } from '@nestjs/common';
import { UserSessionInterface } from './robot.service';
import { SenderService } from './sender.service';
import { TemplateSenderService } from './template-sender.service';

@Injectable()
export class DefaultWorkerService {
  constructor(
    private sender: SenderService,
    private templateSender: TemplateSenderService,
  ) {}

  defalutWorker(
    message: any,
    userSession: UserSessionInterface,
  ): UserSessionInterface {
    console.log('incomming session', userSession);
    let newSession: UserSessionInterface;
    switch (userSession.index) {
      case 0:
        return this.caseZeroAction(message);
      case 1:
        this.caseOneAction(message);
        newSession = { index: 2, worker: 'default' };
        return newSession;
      default:
        return userSession;
    }
  }

  caseZeroAction(message: any) {
    this.templateSender.sendBotWelcomeTemplate(message.message.from, 'en');
    return { index: 1, worker: 'default' };
  }

  caseOneAction(message: any) {
    console.log(message);
  }
}
