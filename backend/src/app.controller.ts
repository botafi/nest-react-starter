import { Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getWorks(): string {
    return 'Works!';
  }
}
