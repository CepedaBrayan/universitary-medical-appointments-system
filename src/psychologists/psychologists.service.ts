import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePsychologistDto } from './dto/create-psychologist.dto';
import { LoginPsychologistDto } from './dto/login-psychologist.dto';
import { UpdatePsychologistDto } from './dto/update-psychologist.dto';
import { PrismaClient, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { DisablePsychologistDto } from './dto/disable-psychologist.dto';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { CancelAppointmentDto } from 'src/appointments/dto/cancel-appointment.dto';

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

@Injectable()
export class PsychologistsService {
  constructor(
    private jwtService: JwtService,
    private readonly appointmentService: AppointmentsService,
  ) {}

  async all(payload: { auth_token: string }) {
    try {
      if (
        !(await this.authPsycho(payload.auth_token)) &&
        !(await this.authStudent(payload.auth_token))
      )
        throw new UnauthorizedException();
      const psychos = await prisma.psychology.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          city: true,
          code_psychology: true,
          office: true,
          active: true,
          rating_average: true,
          appointments_number: true,
        },
      });
      if (!psychos[0]) return { message: 'No psychologists found' };
      return psychos;
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

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
            office: createPsychologistDto.office,
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

  async read(payload: { auth_token: string }) {
    try {
      if (!(await this.authPsycho(payload.auth_token)))
        throw new UnauthorizedException();
      var decodedJwtAccessToken: any = this.jwtService.decode(
        payload.auth_token,
      );
      var id: number = decodedJwtAccessToken.id;
      const psycho = await prisma.psychology.findUnique({
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
          code_psychology: true,
          office: true,
          active: true,
          rating_average: true,
          appointments_number: true,
          password: false,
          created_at: false,
          updated_at: false,
        },
      });
      return psycho;
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
      const psychos = await prisma.psychology.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          office: true,
          active: true,
        },
      });
      if (!psychos[0]) return { message: 'No psychologists found' };
      return psychos;
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async disable(disablePsychologistDto: DisablePsychologistDto) {
    try {
      if (!(await this.authSuperuser(disablePsychologistDto.auth_token)))
        throw new UnauthorizedException();
      const verify = await prisma.psychology.findUnique({
        where: {
          id: disablePsychologistDto.id,
        },
      });
      if (!verify) return { message: 'Psychologist not found' };
      if (!verify.active) return { message: 'Psychologist already disabled' };
      const allAppointments = await prisma.medical_appointment.findMany({
        where: {
          psycho_id: disablePsychologistDto.id,
        },
      });
      if (allAppointments.length > 0) {
        allAppointments.forEach(async (appointment) => {
          if (appointment.status_appointment === 'active') {
            let obj = new CancelAppointmentDto();
            obj.appointment_id = appointment.id;
            obj.auth_token = disablePsychologistDto.auth_token;
            const result = await this.appointmentService.cancelAppointment(obj);
          }
        });
      }

      const psycho = await prisma.psychology.update({
        where: {
          id: disablePsychologistDto.id,
        },
        data: {
          active: false,
        },
      });
      return { message: 'Psychologist disabled' };
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

  async authSuperuser(auth_token: string): Promise<boolean> {
    try {
      const decodedJwtAccessToken: any = this.jwtService.decode(auth_token);
      const now: any = new Date().getTime() / 1000;
      const search = await prisma.superuser.findMany({
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
