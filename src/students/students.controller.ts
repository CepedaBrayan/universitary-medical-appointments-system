import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiResponse,
  ApiOkResponse,
  ApiBody,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiProperty({ description: 'Student Register endpoint' })
  @ApiTags('Student')
  @ApiBody({ type: CreateStudentDto })
  @ApiCreatedResponse({
    description:
      'message: Student created, Student already exists, Student code already exists, Student email already exists, Student nickname already exists',
  })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Post('/login')
  @ApiTags('Student')
  login(@Body() loginStudentDto: LoginStudentDto) {
    return this.studentsService.login(loginStudentDto);
  }

  @Post('/read')
  @ApiTags('Student')
  read(@Body() payload: { auth_token: string }) {
    return this.studentsService.read(payload);
  }

  @Post('/info')
  @ApiTags('Student')
  info(@Body() payload: { auth_token: string }) {
    return this.studentsService.info(payload);
  }

  @Post('/all')
  @ApiTags('Student')
  all(@Body() payload: { auth_token: string }) {
    return this.studentsService.all(payload);
  }

  @Patch()
  @ApiTags('Student')
  update(@Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(updateStudentDto);
  }
}
