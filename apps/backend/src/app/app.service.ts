import { Injectable } from '@nestjs/common';

@Injectable()
class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to backend!' };
  }
}

export default AppService;
