import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PsychologistsService } from './psychologists.service';
import { CreatePsychologistDto } from './dto/create-psychologist.dto';
import { LoginPsychologistDto } from './dto/login-psychologist.dto';
import { UpdatePsychologistDto } from './dto/update-psychologist.dto';
import { DisablePsychologistDto } from './dto/disable-psychologist.dto';

@Controller('psychologists')
export class PsychologistsController {
  constructor(private readonly psychologistsService: PsychologistsService) {}

  @Post('/all')
  all(@Body() payload: { auth_token: string }) {
    return this.psychologistsService.all(payload);
  }

  @Post()
  create(@Body() createPsychologistDto: CreatePsychologistDto) {
    return this.psychologistsService.create(createPsychologistDto);
  }

  @Post('/login')
  login(@Body() loginPsychologistDto: LoginPsychologistDto) {
    return this.psychologistsService.login(loginPsychologistDto);
  }

  @Post('/read')
  read(@Body() payload: { auth_token: string }) {
    return this.psychologistsService.read(payload);
  }

  @Post('/info')
  info(@Body() payload: { auth_token: string }) {
    return this.psychologistsService.info(payload);
  }

  @Post('/disable')
  disable(@Body() disablePsychologistDto: DisablePsychologistDto) {
    return this.psychologistsService.disable(disablePsychologistDto);
  }
}
