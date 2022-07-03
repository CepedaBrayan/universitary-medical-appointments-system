import { Injectable } from '@nestjs/common';
import { CreateWorkshopDto } from './dto/create-workshop.dto';
import { UpdateWorkshopDto } from './dto/update-workshop.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class WorkshopsService {
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
}
