import { Injectable } from '@nestjs/common';
import { CreatePsychologistDto } from './dto/create-psychologist.dto';
import { UpdatePsychologistDto } from './dto/update-psychologist.dto';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

@Injectable()
export class PsychologistsService {
  async create(createPsychologistDto: CreatePsychologistDto) {
    try {
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
      if (psychoCode.length > 0 || psychoNickname.length > 0)
        return { message: 'Psychologist already exists' };
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
            reiting_average: createPsychologistDto.reiting_average,
            appointment_number: createPsychologistDto.appointment_number,
          },
        });
      }
      return { message: 'Psychologist created' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  findAll() {
    return `This action returns all psychologists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} psychologist`;
  }

  update(id: number, updatePsychologistDto: UpdatePsychologistDto) {
    return `This action updates a #${id} psychologist`;
  }

  remove(id: number) {
    return `This action removes a #${id} psychologist`;
  }
}
