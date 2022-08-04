import { Injectable } from '@nestjs/common';
import { DefaultWorkerService } from './default-worker.service';

export interface RobotOrderInterface {
  type: string;
  body: any;
}

export interface UserSessionInterface {
  index: number;
  worker: string;
  data?: any;
}

@Injectable()
export class RobotService {
  userSession = {};
  constructor(private defaultWorker: DefaultWorkerService) {}

  initRobotWorkers(message: any) {
    let currentSession: UserSessionInterface =
      this.userSession[message.message.from];
    if (!currentSession) {
      currentSession = {
        index: 0,
        worker: 'default',
      };
    }
    let newSession = this.assignRobotWorker(message, currentSession);
    if (newSession) this.userSession[message.message.from] = newSession;
  }

  assignRobotWorker(
    message,
    session: UserSessionInterface,
  ): UserSessionInterface {
    switch (session.worker) {
      case 'default':
        return (this.userSession[message.message.from] =
          this.defaultWorker.defalutWorker(message, session));
    }
  }
}
