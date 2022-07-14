import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';
import { DeleteWorkshopDto } from './dto/delete-workshop.dto';
import { PrismaClient, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();

@Injectable()
export class WorkshopsService {
  constructor(private jwtService: JwtService) {}

  async findAll() {
    try {
      const allWorkshops = await prisma.workshop.findMany();
      if (allWorkshops) {
        return allWorkshops;
      } else return { message: 'No workshops found' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async findOne(id: number) {
    try {
      const foundWorkshop = await prisma.workshop.findUnique({
        where: {
          id: id,
        },
      });
      if (foundWorkshop) {
        return foundWorkshop;
      } else return { message: 'Workshop not found' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async create(createWorkshopDto: CreateWorkshopDto) {
    try {
      if (!(await this.authPsycho(createWorkshopDto.auth_token)))
        throw new UnauthorizedException();
      const workshops = await prisma.workshop.findMany({
        where: {
          title: createWorkshopDto.title,
        },
      });
      if (workshops[0]) return { message: 'Workshop already exists' };
      const createdWorkshop = await prisma.workshop.create({
        data: {
          title: createWorkshopDto.title,
          image: createWorkshopDto.image,
          body: createWorkshopDto.body,
          url: createWorkshopDto.url,
        },
      });
      return { message: 'Workshop created' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async delete(deleteWorkshopDto: DeleteWorkshopDto) {
    try {
      if (!(await this.authPsycho(deleteWorkshopDto.auth_token)))
        throw new UnauthorizedException();
      if (
        !(await prisma.workshop.findUnique({
          where: { id: deleteWorkshopDto.workshop_id },
        }))
      )
        return { message: 'Workshop not found' };
      const deletedWorkshop = await prisma.workshop.delete({
        where: {
          id: deleteWorkshopDto.workshop_id,
        },
      });
      return { message: 'Workshop deleted' };
    } catch (error) {
      return { message: 'Failed ' + error };
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
