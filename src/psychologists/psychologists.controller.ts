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

@Controller('psychologists')
export class PsychologistsController {
  constructor(private readonly psychologistsService: PsychologistsService) {}

  @Post()
  create(@Body() createPsychologistDto: CreatePsychologistDto) {
    return this.psychologistsService.create(createPsychologistDto);
  }
}
