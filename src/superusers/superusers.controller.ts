import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SuperusersService } from './superusers.service';
import { CreateSuperuserDto } from './dto/create-superuser.dto';
import { LoginSuperuserDto } from './dto/login-superuser.dto';
import { UpdateSuperuserDto } from './dto/update-superuser.dto';

@Controller('superusers')
export class SuperusersController {
  constructor(private readonly superusersService: SuperusersService) {}

  @Post()
  create(@Body() createSuperuserDto: CreateSuperuserDto) {
    return this.superusersService.create(createSuperuserDto);
  }

  @Post('/login')
  login(@Body() loginSuperuserDto: LoginSuperuserDto) {
    return this.superusersService.login(loginSuperuserDto);
  }
}
