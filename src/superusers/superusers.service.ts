import { Injectable } from '@nestjs/common';
import { CreateSuperuserDto } from './dto/create-superuser.dto';
import { LoginSuperuserDto } from './dto/login-superuser.dto';
import { UpdateSuperuserDto } from './dto/update-superuser.dto';
import { PrismaClient, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

@Injectable()
export class SuperusersService {
  constructor(private jwtService: JwtService) {}

  async create(createSuperuserDto: CreateSuperuserDto) {
    try {
      if (createSuperuserDto.auth_code !== process.env.AUTH_CODE.toString())
        return { message: 'Auth code incorrect' };
      const superuserNickname = await prisma.superuser.findMany({
        where: {
          nickname: createSuperuserDto.nickname,
        },
      });
      if (superuserNickname.length > 0)
        return { message: 'Superuser nickname already exists' };
      const newSuperuser = await prisma.superuser.create({
        data: {
          nickname: createSuperuserDto.nickname,
          password: await bcrypt.hash(
            createSuperuserDto.password,
            parseInt(process.env.SALT_ROUNDS),
          ),
        },
      });
      return { message: 'Superuser created' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async login(loginSuperuserDto: LoginSuperuserDto) {
    try {
      const superuser = await prisma.superuser.findUnique({
        where: {
          nickname: loginSuperuserDto.nickname,
        },
      });
      if (
        superuser &&
        !(await bcrypt.compare(loginSuperuserDto.password, superuser.password))
      )
        return { message: 'Password incorrect' };
      if (
        superuser &&
        (await bcrypt.compare(loginSuperuserDto.password, superuser.password))
      ) {
        const payload = {
          id: superuser.id,
          nickname: superuser.nickname,
        };
        return { access_token: this.jwtService.sign(payload) };
      } else return { message: 'Superuser not found, verify credentials' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }
}
