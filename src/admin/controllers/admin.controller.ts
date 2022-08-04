import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  constructor() {}

  @Get('home')
  @Render('home')
  mainPage() {
    return {
      title: 'home page',
      contacts: [
        {
          name: 'Ibrahim Mohamed Ali',
          mobileNumber: '201116273717',
          company: 'AxaptaIT',
        },
        {
          name: 'Hema Elmourchidi',
          mobileNumber: '201501154777',
          company: 'AxaptaIT',
        },
      ],
    };
  }

  @Get('about')
  @Render('about')
  aboutPage() {
    return { title: 'about page' };
  }

  @Get('profile')
  @Render('profile')
  profilePage() {
    return { title: 'profile page' };
  }
}
