import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaClient, Prisma } from '@prisma/client';
import { env } from 'process';

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class StudentsService {
  async create(createStudentDto: CreateStudentDto) {
    try {
      const studentCode = await prisma.student.findMany({
        where: {
          code_student: createStudentDto.code_student,
        },
      });
      const studentNickname = await prisma.student.findMany({
        where: {
          nickname: createStudentDto.nickname,
        },
      });
      const studentEmail = await prisma.student.findMany({
        where: {
          email: createStudentDto.email,
        },
      });
      if (studentCode.length > 0) return { message: 'Student code already exists' };
      else if (studentEmail.length > 0) return { message: 'Student email already exists' };
      else if (studentNickname.length > 0) return { message: 'Student nickname already exists' };
      else {
        const newStudent = await prisma.student.create({
          data: {
            nickname: createStudentDto.nickname,
            name: createStudentDto.name,
            password: await bcrypt.hash(
              createStudentDto.password,
              parseInt(process.env.SALT_ROUNDS),
            ),
            email: createStudentDto.email,
            phone: createStudentDto.phone,
            city: createStudentDto.city,
            code_student: createStudentDto.code_student,
            academic_program: createStudentDto.academic_program,
            semester: createStudentDto.semester,
          },
        });
      }
      return { message: 'Student created' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
