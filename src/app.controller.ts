import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiCreatedResponse,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Hello World!' })
  getHello(): string {
    return this.appService.getHello();
  }
}
