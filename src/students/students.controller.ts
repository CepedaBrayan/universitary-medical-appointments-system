import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Post('/login')
  login(@Body() loginStudentDto: LoginStudentDto) {
    return this.studentsService.login(loginStudentDto);
  }

  @Get()
  read(@Body() payload: { auth_token: string }) {
    return this.studentsService.read(payload);
  }

  @Get('/info')
  info(@Body() payload: { auth_token: string }) {
    return this.studentsService.info(payload);
  }

  @Get('/all')
  all(@Body() payload: { auth_token: string }) {
    return this.studentsService.all(payload);
  }
}
