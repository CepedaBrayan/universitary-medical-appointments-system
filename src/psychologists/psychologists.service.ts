import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePsychologistDto } from './dto/create-psychologist.dto';
import { LoginPsychologistDto } from './dto/login-psychologist.dto';
import { UpdatePsychologistDto } from './dto/update-psychologist.dto';
import { PrismaClient, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

@Injectable()
export class PsychologistsService {
  constructor(private jwtService: JwtService) {}

  async create(createPsychologistDto: CreatePsychologistDto) {
    try {
      if (!(await this.authSuperuser(createPsychologistDto.auth_token)))
        throw new UnauthorizedException();
      const psychoCode = await prisma.psychology.findMany({
        where: {
          code_psychology: createPsychologistDto.code_psychology,
        },
      });
      const psychoNickname = await prisma.psychology.findMany({
        where: {
          nickname: createPsychologistDto.nickname,
        },
      });
      const psychoEmail = await prisma.psychology.findMany({
        where: {
          email: createPsychologistDto.email,
        },
      });
      if (psychoCode.length > 0)
        return { message: 'Psychologist code already exists' };
      else if (psychoEmail.length > 0)
        return { message: 'Psychologist email already exists' };
      else if (psychoNickname.length > 0)
        return { message: 'Psychologist nickname already exists' };
      else {
        const newPsycho = await prisma.psychology.create({
          data: {
            nickname: createPsychologistDto.nickname,
            name: createPsychologistDto.name,
            password: await bcrypt.hash(
              createPsychologistDto.password,
              parseInt(process.env.SALT_ROUNDS),
            ),
            email: createPsychologistDto.email,
            phone: createPsychologistDto.phone,
            city: createPsychologistDto.city,
            code_psychology: createPsychologistDto.code_psychology,
            active: createPsychologistDto.active,
            rating_average: createPsychologistDto.rating_average,
            appointments_number: createPsychologistDto.appointments_number,
          },
        });
      }
      return { message: 'Psychologist created' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async login(loginPsychologistDto: LoginPsychologistDto) {
    try {
      const psycho = await prisma.psychology.findUnique({
        where: {
          nickname: loginPsychologistDto.nickname,
        },
      });
      if (
        psycho &&
        !(await bcrypt.compare(loginPsychologistDto.password, psycho.password))
      )
        return { message: 'Password incorrect' };
      if (
        psycho &&
        (await bcrypt.compare(loginPsychologistDto.password, psycho.password))
      ) {
        const payload = {
          id: psycho.id,
          nickname: psycho.nickname,
        };
        return { access_token: this.jwtService.sign(payload) };
      } else return { message: 'Psychologist not found, verify credentials' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async authSuperuser(auth_token: string): Promise<boolean> {
    const decodedJwtAccessToken: any = this.jwtService.decode(auth_token);
    const now: any = new Date().getTime() / 1000;
    if (
      !decodedJwtAccessToken ||
      !(await prisma.superuser.findUnique({
        where: { id: decodedJwtAccessToken.id },
      })) ||
      now > decodedJwtAccessToken.exp
    )
      return false;
    return true;
  }
}
