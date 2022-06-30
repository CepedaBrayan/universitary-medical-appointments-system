import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { FindPsychoAppointmentDto } from './dto/find-psycho-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaClient, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { generate } from 'rxjs';

const prisma = new PrismaClient();

@Injectable()
export class AppointmentsService {
  constructor(private jwtService: JwtService) {}

  async findPsychoAppointments(
    findPsychoAppointmentDto: FindPsychoAppointmentDto,
  ) {
    try {
      if (
        !(await this.authStudent(findPsychoAppointmentDto.auth_token)) &&
        !(await this.authPsycho(findPsychoAppointmentDto.auth_token))
      )
        throw new UnauthorizedException();
      const appointments = await prisma.medical_appointment.findMany({
        where: {
          psycho_id: findPsychoAppointmentDto.psychologist_id,
        },
        select: {
          date_appointment: true,
          status_appointment: true,
        },
      });
      if (!appointments[0])
        return { message: 'No appointments found for this psychologist' };
      return appointments;
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    try {
      if (!(await this.authStudent(createAppointmentDto.auth_token)))
        throw new UnauthorizedException();
      if (
        !(await prisma.psychology.findUnique({
          where: { id: createAppointmentDto.psychologist_id },
        }))
      )
        return { message: 'Psychologist not found' };
      if (new Date(createAppointmentDto.date_appointment) < new Date())
        return { message: 'Invalid date' };
      // date must be in the future
      const verifAppointment = await prisma.medical_appointment.findMany({
        where: {
          psycho_id: createAppointmentDto.psychologist_id,
          date_appointment: new Date(createAppointmentDto.date_appointment),
        },
      });
      if (verifAppointment[0])
        return {
          message: 'This hour is not available for create an appointment',
        };
      var decodedJwtAccessToken: any = this.jwtService.decode(
        createAppointmentDto.auth_token,
      );
      var student_id: number = decodedJwtAccessToken.id;
      var a: any = new Date(createAppointmentDto.date_appointment);
      const appointment = await prisma.medical_appointment.create({
        data: {
          student_id: student_id,
          psycho_id: createAppointmentDto.psychologist_id,
          date_request: new Date(),
          date_appointment: new Date(createAppointmentDto.date_appointment),
          status_appointment: 'active',
        },
      });
      return { message: 'Appointment created' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async myAppointmentsStudent(payload: { auth_token: string }) {
    try {
      if (!(await this.authStudent(payload.auth_token)))
        throw new UnauthorizedException();
      var decodedJwtAccessToken: any = this.jwtService.decode(
        payload.auth_token,
      );
      var student_id: number = decodedJwtAccessToken.id;
      const appointments = await prisma.medical_appointment.findMany({
        where: {
          student_id: student_id,
        },
        select: {
          psychology: {
            select: {
              name: true,
            },
          },
          date_request: true,
          date_appointment: true,
          status_appointment: true,
          psycho_diagnosis: true,
          student_rating: true,
          psycho_treatment: true,
        },
      });
      if (!appointments[0])
        return { message: 'No appointments found for this student' };
      return appointments;
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async myAppointmentsPsycho(payload: { auth_token: string }) {
    try {
      if (!(await this.authPsycho(payload.auth_token)))
        throw new UnauthorizedException();
      var decodedJwtAccessToken: any = this.jwtService.decode(
        payload.auth_token,
      );
      var psycho_id: number = decodedJwtAccessToken.id;
      const appointments = await prisma.medical_appointment.findMany({
        where: {
          psycho_id: psycho_id,
        },
        select: {
          student: {
            select: {
              name: true,
            },
          },
          date_request: true,
          date_appointment: true,
          status_appointment: true,
          psycho_diagnosis: true,
          student_rating: true,
          psycho_treatment: true,
        },
      });
      if (!appointments[0])
        return { message: 'No appointments found for this Psychologist' };
      return appointments;
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
