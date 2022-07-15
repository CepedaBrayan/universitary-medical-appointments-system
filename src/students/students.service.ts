import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaClient, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const saltRounds = 10;

@Injectable()
export class StudentsService {
  constructor(private jwtService: JwtService) {}

  async all(payload: { auth_token: string }) {
    try {
      if (
        !(await this.authPsycho(payload.auth_token)) &&
        !(await this.authStudent(payload.auth_token))
      )
        throw new UnauthorizedException();
      const students = await prisma.student.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          city: true,
          code_student: true,
          academic_program: true,
          semester: true,
        },
      });
      if (!students[0]) return { message: 'No students found' };
      return students;
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

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
      if (studentCode.length > 0)
        return { message: 'Student code already exists' };
      else if (studentEmail.length > 0)
        return { message: 'Student email already exists' };
      else if (studentNickname.length > 0)
        return { message: 'Student nickname already exists' };
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

  async login(loginStudentDto: LoginStudentDto) {
    try {
      const student = await prisma.student.findUnique({
        where: {
          nickname: loginStudentDto.nickname,
        },
      });
      if (
        student &&
        !(await bcrypt.compare(loginStudentDto.password, student.password))
      )
        return { message: 'Password incorrect' };
      if (
        student &&
        (await bcrypt.compare(loginStudentDto.password, student.password))
      ) {
        const payload = {
          id: student.id,
          nickname: student.nickname,
        };
        return { access_token: this.jwtService.sign(payload) };
      } else return { message: 'Student not found, verify credentials' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async read(payload: { auth_token: string }) {
    try {
      if (!(await this.authStudent(payload.auth_token)))
        throw new UnauthorizedException();
      var decodedJwtAccessToken: any = this.jwtService.decode(
        payload.auth_token,
      );
      var id: number = decodedJwtAccessToken.id;
      const student = await prisma.student.findUnique({
        where: {
          id: id,
        },
        select: {
          id: false,
          nickname: true,
          name: true,
          email: true,
          phone: true,
          city: true,
          code_student: true,
          academic_program: true,
          semester: true,
          password: false,
          created_at: false,
          updated_at: false,
        },
      });
      return student;
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async info(payload: { auth_token: string }) {
    try {
      if (
        !(await this.authStudent(payload.auth_token)) &&
        !(await this.authPsycho(payload.auth_token))
      )
        throw new UnauthorizedException();
      const students = await prisma.student.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      if (!students[0]) return { message: 'No students found' };
      return students;
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async update(updateStudentDto: UpdateStudentDto) {
    try {
      if (!(await this.authStudent(updateStudentDto.auth_token)))
        throw new UnauthorizedException();
      var decodedJwtAccessToken: any = this.jwtService.decode(
        updateStudentDto.auth_token,
      );
      var id: number = decodedJwtAccessToken.id;
      const student = await prisma.student.findUnique({
        where: {
          id: id,
        },
      });
      if (!student) return { message: 'Student not found' };
      const updatedStudent = await prisma.student.update({
        where: {
          id: id,
        },
        data: {
          phone: updateStudentDto.phone,
          city: updateStudentDto.city,
          academic_program: updateStudentDto.academic_program,
          semester: updateStudentDto.semester,
        },
      });
      return { message: 'Student updated' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async authStudent(auth_token: string): Promise<boolean> {
    try {
      const decodedJwtAccessToken: any = this.jwtService.decode(auth_token);
      const now: any = new Date().getTime() / 1000;
      const search = await prisma.student.findMany({
        where: {
          id: decodedJwtAccessToken.id,
          nickname: decodedJwtAccessToken.nickname,
        },
      });
      if (
        !decodedJwtAccessToken ||
        !search[0] ||
        now > decodedJwtAccessToken.exp
      )
        return false;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async authPsycho(auth_token: string): Promise<boolean> {
    try {
      const decodedJwtAccessToken: any = this.jwtService.decode(auth_token);
      const now: any = new Date().getTime() / 1000;
      const search = await prisma.psychology.findMany({
        where: {
          id: decodedJwtAccessToken.id,
          nickname: decodedJwtAccessToken.nickname,
        },
      });
      if (
        !decodedJwtAccessToken ||
        !search[0] ||
        now > decodedJwtAccessToken.exp
      )
        return false;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
